import { useState } from 'react';
import * as R from 'ramda';
import numeral from 'numeral';
import {
  useLatestBlockHeightListenerSubscription,
  useAverageBlockTimeQuery,
  AverageBlockTimeQuery,
  useTokenPriceListenerSubscription,
  TokenPriceListenerSubscription,
  useActiveValidatorCountQuery,
  ActiveValidatorCountQuery,
  useTxsCountQuery,
} from '@graphql/types/general_types';
import { chainConfig } from '@configs';

export const useDataBlocks = () => {
  const [state, setState] = useState<{
    blockHeight: number;
    blockTime: number;
    price: number | null;
    counters: {
      didCreated: number;
      bankTxCreated: number;
    };
    validators: {
      active: number;
      total: number;
    };
  }>({
    blockHeight: 0,
    blockTime: 0,
    price: null,
    counters: {
      didCreated: 0,
      bankTxCreated: 0,
    },
    validators: {
      active: 0,
      total: 0,
    },
  });

  useTxsCountQuery({
    onCompleted: (data) => {
      setState((prevState) => ({
        ...prevState,
        counters: {
          didCreated: data.didCreated.aggregate.count,
          bankTxCreated: data.bankTx.aggregate.count,
        },
      }));
    },
  });

  // ====================================
  // block height
  // ====================================

  useLatestBlockHeightListenerSubscription({
    onSubscriptionData: (data) => {
      setState((prevState) => ({
        ...prevState,
        blockHeight: R.pathOr(0, ['height', 0, 'height'], data.subscriptionData.data),
      }));
    },
  });

  // ====================================
  // block time
  // ====================================
  useAverageBlockTimeQuery({
    onCompleted: (data) => {
      setState((prevState) => ({
        ...prevState,
        blockTime: formatAverageBlockTime(data),
      }));
    },
  });

  const formatAverageBlockTime = (data: AverageBlockTimeQuery) => {
    return data.averageBlockTime[0]?.averageTime ?? state.blockTime;
  };

  // ====================================
  // token price
  // ====================================
  useTokenPriceListenerSubscription({
    variables: {
      denom: chainConfig?.tokenUnits[chainConfig.primaryTokenUnit]?.display,
    },
    onSubscriptionData: (data) => {
      setState((prevState) => ({
        ...prevState,
        price: formatTokenPrice(data.subscriptionData.data),
      }));
    },
  });

  const formatTokenPrice = (data: TokenPriceListenerSubscription) => {
    if (data?.tokenPrice[0]?.price) {
      return numeral(numeral(data?.tokenPrice[0]?.price).format('0.[00]', Math.floor)).value();
    }
    return state.price;
  };

  // ====================================
  // validators
  // ====================================
  useActiveValidatorCountQuery({
    onCompleted: (data) => {
      setState((prevState) => ({
        ...prevState,
        validators: formatActiveValidatorsCount(data),
      }));
    },
  });

  const formatActiveValidatorsCount = (data: ActiveValidatorCountQuery) => {
    return {
      active: data.activeTotal.aggregate.count,
      total: data.total.aggregate.count,
    };
  };

  return {
    state,
  };
};

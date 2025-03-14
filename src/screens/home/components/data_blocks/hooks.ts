import { useState } from 'react';
import * as R from 'ramda';
import numeral from 'numeral';
import {
  ActiveValidatorCountQuery,
  AverageBlockTimeQuery,
  TokenPriceListenerSubscription,
  useActiveValidatorCountQuery,
  useAverageBlockTimeQuery,
  useLatestBlockHeightListenerSubscription,
  useTokenPriceListenerSubscription,
} from '@graphql/types/general_types';
import { chainConfig } from '@configs';
import { GraphQLClient } from './graphQLClient';

export const useDataBlocks = () => {
  const [state, setState] = useState<{
    blockHeight: number;
    blockTime: number;
    price: number | null;
    counters: {
      allTx: number;
      didCreated: number;
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
      allTx: 0,
      didCreated: 0,
    },
    validators: {
      active: 0,
      total: 0,
    },
  });

  const handleCountersData = async (res: {
    data: {
      did_document_aggregate: { aggregate: { count: number } },
      transaction_aggregate: { aggregate: { count: number } }
    }
  }) => {
    const counters = {
      allTx: res.data.transaction_aggregate.aggregate.count,
      didCreated:  res.data.did_document_aggregate.aggregate.count,
    };

    setState((prevState) => ({
      ...prevState,
      counters,
    }));
  };

  // ====================================
  // block height
  // ====================================

  useLatestBlockHeightListenerSubscription({
    onSubscriptionData: async (data) => {
      setState((prevState) => ({
        ...prevState,
        blockHeight: R.pathOr(0, ['height', 0, 'height'], data.subscriptionData.data),
      }));

      const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL);

      const QUERY = `query GetTopAccountsCount {
  did_document_aggregate {
    aggregate {
      count
    }
  },
  transaction_aggregate {
    aggregate {
      count
    }
  }
} `;

      const res = await client.query<{
        data: {
          did_document_aggregate: { aggregate: { count: number } },
          transaction_aggregate: { aggregate: { count: number } }
        }
      }>(QUERY);

      console.log(res);

      await handleCountersData(res);
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

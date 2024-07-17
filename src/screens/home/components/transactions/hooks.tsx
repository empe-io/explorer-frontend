import { useState } from 'react';
import {
  useTransactionsListenerSubscription,
  TransactionsListenerSubscription,
} from '@graphql/types/general_types';
import { TransactionsState } from './types';

export const useTransactions = () => {
  const [state, setState] = useState<TransactionsState>({
    items: [],
  });

  // ================================
  // txs subscription
  // ================================
  useTransactionsListenerSubscription({
    onSubscriptionData: (data) => {
      setState({
        items: formatTransactions(data.subscriptionData.data),
      });
    },
  });

  const formatTransactions = (data: TransactionsListenerSubscription) => {
    return data.transactions.map((x) => {
      const msgType =
        x.messages?.map((eachMsg: unknown) => {
          const eachMsgType = eachMsg["@type"];
          return eachMsgType ?? '';
        }) ?? [];
      const convertedMsgType = convertMsgType(msgType);
      return ({
        type: convertedMsgType,
        height: x.height,
        hash: x.hash,
        success: x.success,
        timestamp: x.block.timestamp,
        messages: x.messages.length,
      });
    });
  };

  return {
    state,
  };
};

export const convertMsgType = (type: string[]) => {
  const typeTitle = type?.map((eachType) => {
    const wordIndex = eachType.indexOf('Msg');
    const msgStringLength = 'Msg'.length;
    const msgTitle = eachType.substring(wordIndex + msgStringLength);
    const msgTitleSeperatedByUpperCase = msgTitle.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ');
    return msgTitleSeperatedByUpperCase ?? '';
  });

  return typeTitle;
};

export type TransactionType = {
  height: number;
  hash: string;
  success: boolean;
  timestamp: string;
  messages: number;
  type: string;
}

export type TransactionsState = {
  items: TransactionType[]
}

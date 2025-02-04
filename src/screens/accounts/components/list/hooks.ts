/* eslint-disable camelcase, object-curly-newline */
import { useTopAccountsQuery } from '@graphql/types/general_types';
import { useEffect, useMemo, useState } from 'react';
import { UseAccountsState } from './types';

/**
 * `useAccounts` is a custom hook that will be used to fetch the top accounts.
 * @returns An object with the following properties:
 * - data: The data returned from the query.
 * - error: The error returned from the query.
 * - loading: A boolean indicating whether the query is loading.
 * - page: The current page.
 * - handlePageChange: A function to change the current page.
 * - rowsPerPage: The number of rows per page.
 * - handleRowsPerPageChange: A function to change the number of rows per page.
 */
export const useAccounts = (): UseAccountsState => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const offset = page * rowsPerPage;

  // Fetch the top accounts.
  const { data, error, loading, refetch } = useTopAccountsQuery({
    variables: {
      offset,
      limit: rowsPerPage,
    },
  });

  /* If there is an error, refetch the data. */
  useEffect(() => {
    if (error) refetch();
  }, [error, refetch]);

  // Format the data returned from the query.
  const items = useMemo(() => data?.top_accounts.map((row, i) => ({
    rank: 1 + offset + i,
    address: row.address,
    balance: row.sum ?? 0,
  })), [data]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const exists = useMemo(() => loading || !!items.length, [loading, items]);

  return { items, loading, exists, page, setPage, rowsPerPage, setRowsPerPage };
};

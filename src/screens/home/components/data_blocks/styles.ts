import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return {
        root: {
          display: 'grid',
          gridGap: theme.spacing(1),
          gridTemplateRows: 'auto',
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          [theme.breakpoints.up('lg')]: {
            gridGap: theme.spacing(2),
            gridTemplateColumns: 'repeat(4, 1fr)',
          },
        },
        blockHeight: {
          background:
            'linear-gradient(130deg, rgba(0,176,255,1) 0%, rgba(0,114,255,1) 100%)',
        },
        blockTime: {
          background:
            'linear-gradient(130deg, rgba(0,114,255,1) 0%, rgba(140,54,185,1) 100%)',
        },
        didCreated: {
          background: '#0072ff',
        },
        transactionsCreated: {
          background:
            'linear-gradient(130deg, rgba(0,114,255,1) 0%, rgba(140,54,185,1) 100%)',
        },
        validators: {
          background:
            'linear-gradient(130deg, rgba(140,54,185,1) 29%, rgba(209,36,235,1) 100%)',
        },
      };
    },
    { index: 1 },
  )();

  return styles;
};

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

const useStyles = makeStyles({
  h1: {
    marginTop: 100
  },
  h2: {
    marginTop: 50
  }
});

function Index(): JSX.Element {
  const classes = useStyles();

  return (
    <div className="container">
      <Head>
        <title>Fictional Vaccine Statistics</title>
      </Head>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        className={classes.h1}
      >
        Fictional Vaccine Statistics
      </Typography>
      <Typography
        component="h2"
        variant="h3"
        align="center"
        className={classes.h2}
      >
        Select a statistic
      </Typography>
    </div>
  );
}

export default Index;

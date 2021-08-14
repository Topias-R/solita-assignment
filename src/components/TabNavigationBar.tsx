import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import { useMediaQuery } from '@material-ui/core';

function a11yProps(index: number) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`
  };
}

interface LinkTabProps {
  href: string;
  label?: string;
  scroll?: boolean;
  className?: string;
}

function LinkTab({ href, label, scroll, ...other }: LinkTabProps) {
  return (
    <Link href={href} passHref scroll={scroll}>
      <Tab component="a" label={label} {...other} />
    </Link>
  );
}

type tabs = [string, string][];

function determineActiveTab(
  tabs: tabs,
  current: string | string[] | undefined
) {
  if (current === undefined) return false;
  const index = tabs.findIndex((tab) => tab[1] === current);
  return index >= 0 ? index : false;
}

const useStyles = makeStyles(() => ({
  tab: {
    fontWeight: 'bold'
  }
}));

interface TabNavigationBarProps {
  tabs: [string, string][];
  pathname: string;
}

export function TabNavigationBar({
  tabs,
  pathname
}: TabNavigationBarProps): JSX.Element {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width: 1200px)');

  return (
    <AppBar position="static">
      <Paper square>
        <Tabs
          centered={!matches}
          variant={matches ? 'scrollable' : 'fullWidth'}
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          value={determineActiveTab(tabs, pathname)}
          aria-label="navigation tab"
        >
          {tabs.map((tab, idx) => (
            <LinkTab
              className={classes.tab}
              key={tab[1]}
              label={tab[0]}
              href={tab[1]}
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </Paper>
    </AppBar>
  );
}

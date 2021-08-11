import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import prettifyCamelCase from '../utils/prettifyCamelCase';

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

type tabs = string[];

function determineActiveTab(
  tabs: tabs,
  current: string | string[] | undefined
) {
  if (current === undefined) return false;
  const index = tabs.findIndex((tab) => tab === current);
  return index >= 0 ? index : false;
}

const useStyles = makeStyles(() => ({
  tab: {
    fontWeight: 'bold'
  }
}));

interface TabNavigationBarProps {
  tabs: tabs;
}

export function TabNavigationBar({ tabs }: TabNavigationBarProps): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  return (
    <AppBar position="static">
      <Paper square>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          value={determineActiveTab(tabs, router.query.category)}
          aria-label="navigation tab"
        >
          {tabs.map((tab, idx) => (
            <LinkTab
              className={classes.tab}
              key={tab}
              label={prettifyCamelCase(tab)}
              href={`/statistics/${tab}`}
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </Paper>
    </AppBar>
  );
}

export default TabNavigationBar;

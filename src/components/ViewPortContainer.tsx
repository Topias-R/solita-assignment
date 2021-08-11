import { ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  useViewPortDimensions,
  ViewPortDimensions
} from '../hooks/useViewPortDimensions';

const useStyles = makeStyles<Theme, ViewPortDimensions>({
  root: {
    height: ({ height }) => height ?? '100vh',
    width: ({ width }) => width ?? '100vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }
});

interface ViewPortContainerProps {
  children?: ReactNode;
}

export function ViewPortContainer({
  children
}: ViewPortContainerProps): JSX.Element {
  const dimensions = useViewPortDimensions();
  const classes = useStyles(dimensions);
  return <div className={classes.root}>{children}</div>;
}

export default ViewPortContainer;

import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { wrapTypes } from '../utils/types/wrapTypes';
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

const Providers: React.FC = ({ children }) => {
  return children as ReactElement;
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
};

const customRender = wrapTypes((ui: ReactElement, options = {}) =>
  render(ui, { wrapper: Providers, ...options })
);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
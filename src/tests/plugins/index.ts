import injectDevServer = require('@cypress/react/plugins/next');

export default (on: unknown, config: unknown): unknown => {
  injectDevServer(on, config);

  return config;
};

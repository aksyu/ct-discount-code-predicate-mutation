import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createRequestBuilder } from '@commercetools/api-request-builder';

const config = {
  dev: {
    commerceToolsProjectKey: '',
    commerceToolsClientId: '',
    commerceToolsClientSecret: '',
    commerceToolsAuthUrl: '',
    commerceToolsApiUrl: '',
  },
  stage: {
    commerceToolsProjectKey: '',
    commerceToolsClientId: '',
    commerceToolsClientSecret: '',
    commerceToolsAuthUrl: '',
    commerceToolsApiUrl: '',
  },
  prod: {
    commerceToolsProjectKey: '',
    commerceToolsClientId: '',
    commerceToolsClientSecret: '',
    commerceToolsAuthUrl: '',
    commerceToolsApiUrl: '',
  },
};

const env = config.dev;

export const getClient = () => {
  const auth = createAuthMiddlewareForClientCredentialsFlow({
    host: env.commerceToolsAuthUrl,
    projectKey: env.commerceToolsProjectKey,
    credentials: {
      clientId: env.commerceToolsClientId,
      clientSecret: env.commerceToolsClientSecret,
    },
    scopes: [`manage_project:${env.commerceToolsProjectKey}`],
    fetch: require('node-fetch'),
  });

  const http = createHttpMiddleware({
    host: env.commerceToolsApiUrl,
    fetch: require('node-fetch'),
  });

  return createClient({ middlewares: [auth, http] });
};

export const getUri = (type: string): string => {
  const requestBuilder = createRequestBuilder({
    projectKey: env.commerceToolsProjectKey,
  });

  const builder = requestBuilder[type];
  return builder.build();
};

import {
  getFunctionsBaseUrl,
  getLogicFunctionHttpUrl,
} from '@/logic-functions/utils/getLogicFunctionHttpUrl';

describe('getFunctionsBaseUrl', () => {
  it('builds the isolated base from subdomain + public domain', () => {
    expect(
      getFunctionsBaseUrl({
        serverBaseUrl: 'https://www.ownward.agency',
        publicFunctionDomain: 'withownward.agency',
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://acme.withownward.agency');
  });

  it('falls back to the /s server route when the public domain is missing', () => {
    expect(
      getFunctionsBaseUrl({
        serverBaseUrl: 'https://www.ownward.agency',
        publicFunctionDomain: null,
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://www.ownward.agency/s');
  });

  it('falls back to the /s server route when the subdomain is missing', () => {
    expect(
      getFunctionsBaseUrl({
        serverBaseUrl: 'https://www.ownward.agency',
        publicFunctionDomain: 'withownward.agency',
        workspaceSubdomain: undefined,
      }),
    ).toBe('https://www.ownward.agency/s');
  });
});

describe('getLogicFunctionHttpUrl', () => {
  it('builds the isolated public-domain URL when configured', () => {
    expect(
      getLogicFunctionHttpUrl({
        path: '/webhook/stripe',
        serverBaseUrl: 'https://www.ownward.agency',
        publicFunctionDomain: 'withownward.agency',
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://acme.withownward.agency/webhook/stripe');
  });

  it('normalizes a path that does not start with a slash', () => {
    expect(
      getLogicFunctionHttpUrl({
        path: 'webhook',
        serverBaseUrl: 'https://www.ownward.agency',
        publicFunctionDomain: 'withownward.agency',
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://acme.withownward.agency/webhook');
  });

  it('falls back to the legacy /s/ route when no public domain is configured', () => {
    expect(
      getLogicFunctionHttpUrl({
        path: '/webhook/stripe',
        serverBaseUrl: 'https://www.ownward.agency',
        publicFunctionDomain: null,
        workspaceSubdomain: 'acme',
      }),
    ).toBe('https://www.ownward.agency/s/webhook/stripe');
  });

  it('falls back to the legacy /s/ route when the workspace has no subdomain', () => {
    expect(
      getLogicFunctionHttpUrl({
        path: '/webhook',
        serverBaseUrl: 'https://www.ownward.agency',
        publicFunctionDomain: 'withownward.agency',
        workspaceSubdomain: undefined,
      }),
    ).toBe('https://www.ownward.agency/s/webhook');
  });
});

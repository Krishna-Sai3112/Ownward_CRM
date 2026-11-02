import { AuthException } from 'src/engine/core-modules/auth/auth.exception';
import { assertIssuerIsPublishedOrThrow } from 'src/engine/core-modules/auth/utils/assert-issuer-is-published.util';

describe('assertIssuerIsPublishedOrThrow', () => {
  const requestBaseUrl = 'https://app.ownward.agency';
  const serverUrl = 'https://api.ownward.agency';

  it('accepts the origin the request arrived on', () => {
    expect(() =>
      assertIssuerIsPublishedOrThrow({
        issuer: 'https://app.ownward.agency',
        requestBaseUrl,
        serverUrl,
      }),
    ).not.toThrow();
  });

  it('accepts the api host, which delegates /authorize to this origin', () => {
    expect(() =>
      assertIssuerIsPublishedOrThrow({
        issuer: 'https://api.ownward.agency',
        requestBaseUrl,
        serverUrl,
      }),
    ).not.toThrow();
  });

  it('tolerates a trailing slash on SERVER_URL', () => {
    expect(() =>
      assertIssuerIsPublishedOrThrow({
        issuer: 'https://api.ownward.agency',
        requestBaseUrl,
        serverUrl: 'https://api.ownward.agency/',
      }),
    ).not.toThrow();
  });

  it('throws on an issuer this instance never published', () => {
    expect(() =>
      assertIssuerIsPublishedOrThrow({
        issuer: 'https://attacker.example.com',
        requestBaseUrl,
        serverUrl,
      }),
    ).toThrow(AuthException);
  });

  it('throws when SERVER_URL is unset and the issuer is not the request origin', () => {
    expect(() =>
      assertIssuerIsPublishedOrThrow({
        issuer: 'https://api.ownward.agency',
        requestBaseUrl,
      }),
    ).toThrow(AuthException);
  });
});

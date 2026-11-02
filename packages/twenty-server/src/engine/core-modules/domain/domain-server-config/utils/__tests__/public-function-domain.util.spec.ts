import {
  getHostnameFromUrlOrUndefined,
  isHostUnderPublicFunctionDomain,
} from 'src/engine/core-modules/domain/domain-server-config/utils/public-function-domain.util';

describe('getHostnameFromUrlOrUndefined', () => {
  it('returns the lowercased hostname of a valid url', () => {
    expect(getHostnameFromUrlOrUndefined('https://Withownward.agency')).toBe(
      'withownward.agency',
    );
  });

  it('ignores the path and port', () => {
    expect(
      getHostnameFromUrlOrUndefined('https://withownward.agency:8080/ignored'),
    ).toBe('withownward.agency');
  });

  it('returns undefined for empty/nullish input', () => {
    expect(getHostnameFromUrlOrUndefined(undefined)).toBeUndefined();
    expect(getHostnameFromUrlOrUndefined(null)).toBeUndefined();
    expect(getHostnameFromUrlOrUndefined('')).toBeUndefined();
  });

  it('returns undefined for a non-url string', () => {
    expect(getHostnameFromUrlOrUndefined('not a url')).toBeUndefined();
  });
});

describe('isHostUnderPublicFunctionDomain', () => {
  const publicDomainBaseHostname = 'withownward.agency';

  it('matches a strict subdomain of the base', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'acme.withownward.agency',
        publicDomainBaseHostname,
      }),
    ).toBe(true);
  });

  it('matches deeper subdomains', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'app.acme.withownward.agency',
        publicDomainBaseHostname,
      }),
    ).toBe(true);
  });

  it('is case-insensitive and strips the port', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'ACME.Withownward.agency:443',
        publicDomainBaseHostname,
      }),
    ).toBe(true);
  });

  it('does not match the apex base itself', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'withownward.agency',
        publicDomainBaseHostname,
      }),
    ).toBe(false);
  });

  it('does not match the main app domain', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'acme.ownward.agency',
        publicDomainBaseHostname,
      }),
    ).toBe(false);
  });

  it('does not match a lookalike suffix', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'evilwithownward.agency',
        publicDomainBaseHostname,
      }),
    ).toBe(false);
  });

  it('returns false when no base is configured', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: 'acme.withownward.agency',
        publicDomainBaseHostname: undefined,
      }),
    ).toBe(false);
  });

  it('returns false when host is missing', () => {
    expect(
      isHostUnderPublicFunctionDomain({
        host: undefined,
        publicDomainBaseHostname,
      }),
    ).toBe(false);
  });
});

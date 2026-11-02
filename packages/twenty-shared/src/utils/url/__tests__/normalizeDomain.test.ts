import { normalizeDomain } from '@/utils/url/normalizeDomain';

describe('normalizeDomain', () => {
  it.each([
    'ownward.agency',
    'ownward.agency',
    'www.ownward.agency',
    'https://www.ownward.agency',
    'https://www.ownward.agency/',
    'http://www.Ownward Labs/careers?utm=1#team',
    '  https://www.ownward.agency  ',
    'ownward.agency.',
    'ownward.agency:8080',
    'https://user:secret@www.ownward.agency',
    'ftp://ownward.agency',
  ])('should reduce %s to the bare domain', (rawDomain) => {
    expect(normalizeDomain(rawDomain)).toBe('ownward.agency');
  });

  it('should keep subdomains other than www', () => {
    expect(normalizeDomain('https://blog.ownward.agency')).toBe('blog.ownward.agency');
  });

  it('should fold an internationalized domain onto its punycode spelling', () => {
    expect(normalizeDomain('münchen.de')).toBe('xn--mnchen-3ya.de');
    expect(normalizeDomain('https://München.de')).toBe('xn--mnchen-3ya.de');
    expect(normalizeDomain('xn--mnchen-3ya.de')).toBe('xn--mnchen-3ya.de');
  });

  it('should read a backslash as a path separator, like a browser does', () => {
    expect(normalizeDomain('ownward.agency\\@evil.com')).toBe('ownward.agency');
    expect(normalizeDomain('https://www.ownward.agency\\evil.com/x')).toBe(
      'ownward.agency',
    );
  });

  it('should drop every user info segment', () => {
    expect(normalizeDomain('https://a@b@ownward.agency')).toBe('ownward.agency');
  });

  it('should strip every repeated www label and trailing dot in one pass', () => {
    expect(normalizeDomain('www.www.ownward.agency')).toBe('ownward.agency');
    expect(normalizeDomain('ownward.agency..')).toBe('ownward.agency');
  });

  it.each([
    'ownward.agency',
    'https://www.ownward.agency/careers?x=1',
    'www.www.ownward.agency',
    'ownward.agency..',
    'münchen.de',
    'not a domain',
    '',
  ])('should already be normalized after one pass for %s', (rawDomain) => {
    const normalized = normalizeDomain(rawDomain);

    expect(normalizeDomain(normalized)).toBe(normalized);
  });

  it('should return an empty string for an empty value', () => {
    expect(normalizeDomain('')).toBe('');
  });

  it('should hand back something unparseable rather than throwing', () => {
    expect(normalizeDomain('not a domain')).toBe('not a domain');
  });
});

import { msg } from '@lingui/core/macro';

import { type WebsiteRoute, type WebsiteRouteId } from './website-route';

const RETIRED_ROUTE_ID_AND_PATH: readonly {
  id: WebsiteRouteId;
  path: string;
}[] = [
  { id: 'apps', path: '/apps' },
  { id: 'comparePricingDynamics', path: '/compare-pricing/microsoft-dynamics' },
  { id: 'comparePricingHubspot', path: '/compare-pricing/hubspot' },
  { id: 'comparePricingPipedrive', path: '/compare-pricing/pipedrive' },
  { id: 'comparePricingSalesforce', path: '/compare-pricing/salesforce' },
  { id: 'comparePricingSap', path: '/compare-pricing/sap-sales-cloud' },
  { id: 'customers', path: '/customers' },
  { id: 'enterpriseActivate', path: '/organization/activate' },
  { id: 'halftone', path: '/halftone' },
  { id: 'partners', path: '/partners' },
  { id: 'partnersApply', path: '/partners/apply' },
  { id: 'partnersBecome', path: '/partners/become' },
  { id: 'partnersBrief', path: '/partners/brief' },
  { id: 'pricing', path: '/pricing' },
  { id: 'privacyPolicy', path: '/privacy-policy' },
  { id: 'product', path: '/product' },
  { id: 'releases', path: '/releases' },
  { id: 'support', path: '/support' },
  { id: 'terms', path: '/terms' },
  { id: 'whyTwenty', path: '/why-twenty' },
  { id: 'affiliatePartners', path: '/affiliate-partners' },
];

export const STATIC_WEBSITE_ROUTES: readonly WebsiteRoute[] = [
  {
    changeFrequency: 'monthly',
    description: msg`A customizable customer relationship management workspace from Ownward Labs. Shape your data model, organize records, and connect your tools.`,
    id: 'home',
    indexed: true,
    path: '/',
    priority: 1,
    title: msg`Ownward Labs | Customizable CRM`,
  },
  ...RETIRED_ROUTE_ID_AND_PATH.map(({ id, path }) => ({
    changeFrequency: 'yearly' as const,
    description: msg`This Ownward Labs page has moved.`,
    id,
    indexed: false,
    path,
    priority: 0,
    title: msg`Ownward Labs`,
  })),
];

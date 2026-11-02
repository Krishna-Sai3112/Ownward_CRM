import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import withLinaria, { type LinariaConfig } from 'next-with-linaria';
import path from 'path';

import { WEBSITE_LOCALE_LIST } from './src/platform/i18n/website-locale-list';
import { buildLocaleRewrites } from './src/platform/routing/locale-rewrite-patterns';

const SECURITY_HEADERS: { key: string; value: string }[] = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
];

// Skew protection: CI sets DEPLOYMENT_ID at build time so it's baked into
// prerendered HTML + the RSC payloads. The Worker reads the same value at
// runtime (via the worker env var) and routes mismatched requests to the
// matching older Worker version via its preview URL. Required whenever
// open-next.config.ts has cloudflare.skewProtection.enabled.
const deploymentId = process.env.DEPLOYMENT_ID;

const nextConfig: LinariaConfig = {
  deploymentId,
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
        protocol: 'https',
      },
      {
        hostname: 'twenty-icons.com',
        pathname: '/**',
        protocol: 'https',
      },
    ],
  },
  linaria: {
    configFile: path.resolve(__dirname, 'wyw-in-js.config.cjs'),
  },
  experimental: {
    swcPlugins: [
      [
        '@lingui/swc-plugin',
        {
          runtimeModules: {
            i18n: ['@lingui/core', 'i18n'],
            trans: ['@lingui/react', 'Trans'],
          },
          useLinguiV5IdGeneration: true,
        },
      ],
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
      {
        source: '/(images|illustrations|lottie)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Clean public URLs: the source locale is unprefixed, other locales get a
  // short segment. Rewrites map unprefixed paths onto the internal /[locale]
  // tree; redirects canonicalize away explicit source-locale prefixes.
  async rewrites() {
    return {
      beforeFiles: buildLocaleRewrites(WEBSITE_LOCALE_LIST),
    };
  },
  async redirects() {
    const retiredRoutes = [
      "/product",
      "/pricing",
      "/compare-pricing/:path*",
      "/customers",
      "/customers/:path*",
      "/partners",
      "/partners/:path*",
      "/partners/apply",
      "/partners/brief",
      "/apps",
      "/apps/:path*",
      "/apps-marketplace/:path*",
      "/releases",
      "/privacy-policy",
      "/terms",
      "/support",
      "/affiliate-partners",
      "/why-twenty",
      "/organization/activate",
      "/enterprise/activate",
      "/user-guide",
      "/user-guide/:path*",
      "/developers",
      "/developers/:path*",
      "/twenty-ui",
      "/twenty-ui/:path*",
      "/case-studies/:path*",
      "/legal/:path*",
      "/implementation-services",
      "/onboarding-packages",
      "/story",
      "/halftone",
    ];

    const retiredRouteRedirects = retiredRoutes.flatMap((route) => [
      { source: route, destination: "/", permanent: false },
      {
        source: "/:locale(" + WEBSITE_LOCALE_LIST.join("|") + ")" + route,
        destination: "/:locale",
        permanent: false,
      },
    ]);

    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      ...retiredRouteRedirects,
    ];
  },
};

export default withLinaria(nextConfig);

// Binds the Cloudflare dev context (R2 incremental cache, env vars) into
// `next dev` so local runs mirror the deployed OpenNext worker.
initOpenNextCloudflareForDev();

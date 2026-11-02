import { defineApplication } from 'twenty-sdk/define';

import {
  APP_DESCRIPTION,
  APP_DISPLAY_NAME,
  APPLICATION_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: APP_DISPLAY_NAME,
  description: APP_DESCRIPTION,
  logo: 'public/logo.svg',
  author: 'Ownward Labs',
  category: 'Productivity',
  websiteUrl: 'https://www.fathom.ai',
  galleryImages: [
    'public/gallery/fathom-cover-image-1.png',
    'public/gallery/fathom-cover-image-2.png',
  ],
  serverVariables: {
    FATHOM_CLIENT_ID: {
      description: 'OAuth client ID from the Ownward Labs Fathom application.',
      isSecret: false,
      isRequired: true,
    },
    FATHOM_CLIENT_SECRET: {
      description: 'OAuth client secret from the Ownward Labs Fathom application.',
      isSecret: true,
      isRequired: true,
    },
  },
});

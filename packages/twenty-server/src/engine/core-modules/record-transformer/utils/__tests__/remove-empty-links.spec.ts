import {
  RecordTransformerException,
  RecordTransformerExceptionCode,
} from 'src/engine/core-modules/record-transformer/record-transformer.exception';
import { removeEmptyLinks } from 'src/engine/core-modules/record-transformer/utils/remove-empty-links';

describe('removeEmptyLinks', () => {
  it('should return null values when all inputs are empty', () => {
    expect(
      removeEmptyLinks({
        primaryLinkUrl: null,
        primaryLinkLabel: null,
        secondaryLinks: [],
      }),
    ).toEqual({
      primaryLinkUrl: null,
      primaryLinkLabel: null,
      secondaryLinks: [],
    });

    expect(
      removeEmptyLinks({
        primaryLinkUrl: null,
        primaryLinkLabel: null,
        secondaryLinks: null,
      }),
    ).toEqual({
      primaryLinkUrl: null,
      primaryLinkLabel: null,
      secondaryLinks: [],
    });
  });

  it('should keep valid primary link and remove empty secondary links', () => {
    expect(
      removeEmptyLinks({
        primaryLinkUrl: 'https://www.ownward.agency',
        primaryLinkLabel: 'Ownward Labs Website',
        secondaryLinks: [],
      }),
    ).toEqual({
      primaryLinkUrl: 'https://www.ownward.agency',
      primaryLinkLabel: 'Ownward Labs Website',
      secondaryLinks: [],
    });
  });

  it('should promote first valid secondary link to primary when primary is empty', () => {
    expect(
      removeEmptyLinks({
        primaryLinkUrl: null,
        primaryLinkLabel: null,
        secondaryLinks: [
          {
            url: 'https://docs.ownward.agency',
            label: 'Documentation',
          },
          {
            url: 'https://github.com/Krishna-Sai3112/Ownward_CRM',
            label: 'GitHub',
          },
        ],
      }),
    ).toEqual({
      primaryLinkUrl: 'https://docs.ownward.agency',
      primaryLinkLabel: 'Documentation',
      secondaryLinks: [
        {
          url: 'https://github.com/Krishna-Sai3112/Ownward_CRM',
          label: 'GitHub',
        },
      ],
    });
  });

  it('should throw RecordTransformerException when primary link URL is invalid', () => {
    expect(() =>
      removeEmptyLinks({
        primaryLinkUrl: 'lydia,com',
        primaryLinkLabel: 'Invalid URL',
        secondaryLinks: [],
      }),
    ).toThrow(
      expect.objectContaining({
        constructor: RecordTransformerException,
        code: RecordTransformerExceptionCode.INVALID_URL,
        message: 'The URL of the link is not valid',
      }),
    );
  });

  it('should throw RecordTransformerException when any secondary link URL is invalid', () => {
    expect(() =>
      removeEmptyLinks({
        primaryLinkUrl: 'https://www.ownward.agency',
        primaryLinkLabel: 'Ownward Labs Website',
        secondaryLinks: [
          {
            url: 'wikipedia',
            label: 'Invalid URL',
          },
        ],
      }),
    ).toThrow(
      expect.objectContaining({
        constructor: RecordTransformerException,
        code: RecordTransformerExceptionCode.INVALID_URL,
        message: 'The URL of the link is not valid',
      }),
    );
  });

  it('should throw RecordTransformerException when both primary and secondary URLs are invalid', () => {
    expect(() =>
      removeEmptyLinks({
        primaryLinkUrl: 'lydia,com',
        primaryLinkLabel: 'Invalid URL',
        secondaryLinks: [
          {
            url: 'wikipedia',
            label: 'Invalid URL',
          },
        ],
      }),
    ).toThrow(
      expect.objectContaining({
        constructor: RecordTransformerException,
        code: RecordTransformerExceptionCode.INVALID_URL,
        message: 'The URL of the link is not valid',
      }),
    );
  });

  it('should handle empty or null secondary links', () => {
    expect(
      removeEmptyLinks({
        primaryLinkUrl: 'https://www.ownward.agency',
        primaryLinkLabel: 'Ownward Labs Website',
        secondaryLinks: [
          {
            url: '',
            label: 'Empty URL',
          },
          {
            url: null,
            label: 'Null URL',
          },
        ],
      }),
    ).toEqual({
      primaryLinkUrl: 'https://www.ownward.agency',
      primaryLinkLabel: 'Ownward Labs Website',
      secondaryLinks: [],
    });
  });

  it('should return empty state when there are no valid URLs', () => {
    expect(
      removeEmptyLinks({
        primaryLinkUrl: '',
        primaryLinkLabel: 'Empty URL',
        secondaryLinks: [
          {
            url: null,
            label: 'Null URL',
          },
          {
            url: '',
            label: 'Empty URL',
          },
        ],
      }),
    ).toEqual({
      primaryLinkUrl: null,
      primaryLinkLabel: null,
      secondaryLinks: [],
    });
  });

  it('should keep valid URLs with null labels', () => {
    expect(
      removeEmptyLinks({
        primaryLinkUrl: 'https://www.ownward.agency',
        primaryLinkLabel: null,
        secondaryLinks: [
          {
            url: 'https://docs.ownward.agency',
            label: null,
          },
        ],
      }),
    ).toEqual({
      primaryLinkUrl: 'https://www.ownward.agency',
      primaryLinkLabel: null,
      secondaryLinks: [
        {
          url: 'https://docs.ownward.agency',
          label: null,
        },
      ],
    });
  });
});

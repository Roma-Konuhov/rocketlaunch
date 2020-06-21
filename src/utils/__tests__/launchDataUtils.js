import {
  getImageUrl,
  getInfoUrl,
  getStatus,
  getLaunchDate,
  getCountryFlagUrl,
} from '../launchDataUtils';

describe('launchDataUtils', () => {
  describe('getInfoUrl()', () => {
    test('should return infoURL if it is specified', () => {
      const item = {
        'id': 2036,
        'infoURLs': ['infoURLs_0', 'infoURLs_1', 'infoURLs_2'],
        'infoURL': 'infoURL',
        'missions': [
          {
            'id': 21,
            'wikiURL': 'missionWikiURL',
          }
        ],
        'rocket': {
          'id': 731,
          'wikiURL': 'rocketWikiURL',
        }
      };
      expect(getInfoUrl(item)).toBe('infoURL');
    });

    test('should return first value from infoURLs if it is specified and infoURL is not', () => {
      const item = {
        'id': 2036,
        'infoURLs': ['infoURLs_0', 'infoURLs_1', 'infoURLs_2'],
        'infoURL': '',
        'missions': [
          {
            'id': 21,
            'wikiURL': 'missionWikiURL',
          }
        ],
        'rocket': {
          'id': 731,
          'wikiURL': 'rocketWikiURL',
        }
      };
      expect(getInfoUrl(item)).toBe('infoURLs_0');
    });

    test('should return missions wikiURL if infoURLs and infoURL are not specified', () => {
      const item = {
        'id': 2036,
        'infoURLs': [],
        'infoURL': '',
        'missions': [
          {
            'id': 21,
            'wikiURL': 'missionWikiURL',
          }
        ],
        'rocket': {
          'id': 731,
          'wikiURL': 'rocketWikiURL',
        }
      };
      expect(getInfoUrl(item)).toBe('missionWikiURL');
    });

    test('should return rocket wikiURL if missionsURL, infoURLs and infoURL are not specified', () => {
      const item = {
        'id': 2036,
        'infoURLs': [],
        'infoURL': '',
        'missions': [
          {
            'id': 21,
            'wikiURL': '',
          }
        ],
        'rocket': {
          'id': 731,
          'wikiURL': 'rocketWikiURL',
        }
      };
      expect(getInfoUrl(item)).toBe('rocketWikiURL');
    });

    test('should return empty string if rocketWikiURL, missionsURL, infoURLs and infoURL are not specified', () => {
      const item = {
        'id': 2036,
        'infoURLs': [],
        'infoURL': '',
        'missions': [
          {
            'id': 21,
            'wikiURL': '',
          }
        ],
        'rocket': {
          'id': 731,
          'wikiURL': '',
        }
      };
      expect(getInfoUrl(item)).toBe('');
    });
  });

  describe('getImageUrl()', () => {
    test('should return link to a local placeholder image if imageURL is empty', () => {
      const item = {
        'id': 2036,
        'rocket': {
          'id': 731,
          'imageSizes': [320, 480, 1920],
          'imageURL': ''
        }
      };
      expect(getImageUrl(item)).toEqual({ testUri: "../../../src/assets/rocketPlaceholder.png" });
    });

    test('should return link to a smallest image if imageSizes is not empty', () => {
      const item = {
        'id': 2036,
        'rocket': {
          'id': 731,
          'imageSizes': [320, 480, 1920],
          'imageURL': 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/Falcon9Block5.jpg_1920.jpg'
        }
      };
      expect(getImageUrl(item)).toEqual({ uri: "https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/Falcon9Block5.jpg_320.jpg" });
    });

    test('should return specified imageURL if imageSizes is empty', () => {
      const item = {
        'id': 2036,
        'rocket': {
          'id': 731,
          'imageSizes': [],
          'imageURL': 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/Falcon9Block5.jpg_1920.jpg'
        }
      };
      expect(getImageUrl(item)).toEqual({ uri: "https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/Falcon9Block5.jpg_1920.jpg" });
    });

    test('should return link to a local placeholder image if imageURL is not valid', () => {
      const item = {
        'id': 2036,
        'rocket': {
          'id': 731,
          'imageSizes': [],
          'imageURL': 'notvalidurl'
        }
      };
      expect(getImageUrl(item)).toEqual({ testUri: "../../../src/assets/rocketPlaceholder.png" });
    });
  });

  describe('getStatus()', () => {
    const statusData = [
      { id: 1, description: 'status_1' },
      { id: 2, description: 'status_2' },
      { id: 3, description: 'status_3' },
    ];

    test('should return empty string if requested status ID is not found', () => {
      const item = {
        'id': 2036,
        'status': 5,
      };
      expect(getStatus(item, statusData)).toBe('');
    });

    test('should return proper status description by its ID', () => {
      const item = {
        'id': 2036,
        'status': 3,
      };
      expect(getStatus(item, statusData)).toBe('status_3');
    });
  });

  describe('getLaunchDate()', () => {
    test('should return `No date` if item does not contain `net` date', () => {
      expect(getLaunchDate({})).toBe('No date');
    });

    test('should return date in format MMM D, YYYY if item contains valid `net` date', () => {
      expect(getLaunchDate({ net: 'June 11, 2020 04:43:00 UTC' })).toBe('Jun 11, 2020');
    });

    test('should return `Invalid date` if item contains invalid `net` date', () => {
      expect(getLaunchDate({ net: 'garbage' })).toBe('Invalid date');
    });
  });

  describe('getCountryFlagUrl()', () => {
    test('should return proper link to a flag image if item contains valid country code', () => {
      const item = { lsp: { countryCode: 'USA' } };
      const expectedUrl = { uri: `https://www.countryflags.io/US/flat/24.png` };
      expect(getCountryFlagUrl(item)).toEqual(expectedUrl);
    });

    test('should return empty string if item contains invalid country code', () => {
      const item = { lsp: { countryCode: '' } };
      expect(getCountryFlagUrl(item)).toEqual({ testUri: "../../../src/assets/flagPlaceholder.png" });
    });
  });
});


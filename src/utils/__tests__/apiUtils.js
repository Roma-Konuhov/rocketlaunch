import { getQueryString } from '../apiUtils';
import { DEFAULT_ITEMS_PER_PAGE } from '../../constants/apiConstants';

describe('apiUtils', () => {
  describe('getQueryString()', () => {
    const defaultQueryString = `limit=${DEFAULT_ITEMS_PER_PAGE}&offset=0`;

    test('should return query string which contains only pagination params if no params are passed', () => {
      expect(getQueryString()).toBe(defaultQueryString);
    });

    test('should return `mode` in query string if it is passed', () => {
      expect(getQueryString({ mode: 'verbose' })).toBe(`${defaultQueryString}&mode=verbose`);
    });

    test('should return `sort` in query string if it is passed', () => {
      expect(getQueryString({ sort: 'asc' })).toBe(`${defaultQueryString}&sort=asc`);
    });

    test('should return `enddate` in query string if it is passed', () => {
      expect(getQueryString({ enddate: '2020-05-01' })).toBe(`${defaultQueryString}&enddate=2020-05-01`);
    });

    test('should return `searchTerm` as `name` in query string if it is passed', () => {
      expect(getQueryString({ searchTerm: 'con' })).toBe(`${defaultQueryString}&name=con`);
    });

    test('should return all passed params in query string', () => {
      const expectedQS = `${defaultQueryString}&mode=verbose&sort=desc&name=con`;
      expect(getQueryString({ mode: 'verbose', sort: 'desc', searchTerm: 'con' })).toBe(expectedQS);
    });
  });
});
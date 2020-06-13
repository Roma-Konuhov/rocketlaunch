import { filterList } from '../commonUtils';

describe('commonUtils', () => {
  describe('filterList()', () => {
    test('should return empty list if no params are passed', () => {
      expect(filterList()).toEqual([]);
    });

    test('should return the same list if searchTerm is not passed', () => {
      const list = [{ name: 'n1' }, { name: 'n2' }, { name: 'n3' }];
      expect(filterList(list)).toEqual(list);
    });

    test('should return the same list ref if searchTerm is not passed', () => {
      const list = [{ name: 'n1' }, { name: 'n2' }, { name: 'n3' }];
      expect(filterList(list)).toBe(list);
    });

    test('should return filtered list if searchTerm is passed', () => {
      const list = [{ name: 'n1' }, { name: 'n1' }, { name: 'n3' }];
      const expectedList = [{ name: 'n1' }, { name: 'n1' }];
      expect(filterList(list, 'n1')).toEqual(expectedList);
    });

    test('should return empty list if searchTerm is passed, but not found', () => {
      const list = [{ name: 'n1' }, { name: 'n1' }, { name: 'n3' }];
      expect(filterList(list, 'x')).toEqual([]);
    });

    test('should have possibility to search by part of the word', () => {
      const list = [{ name: 'Falcon 7' }, { name: 'Sojuz 2.1a' }, { name: 'Long march 5B' }];
      const expectedList = [{ name: 'Falcon 7' }, { name: 'Long march 5B' }]
      expect(filterList(list, 'on')).toEqual(expectedList);
    });

    test('should have possibility to search by another field(e.g. id)', () => {
      const list = [{ id: 'n1' }, { id: 'n1' }, { id: 'n3' }];
      const expectedList = [{ id: 'n3' }];
      expect(filterList(list, 'n3', 'id')).toEqual(expectedList);
    });
  });
});

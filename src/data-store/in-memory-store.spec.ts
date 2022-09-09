import InMemoryStore from './in-memory-store.js';
import Persistable from './persistable.js';

describe('In Memory Store', () => {
  class DummyRecord implements Persistable {
    id: string;
    constructor(id: string) {
      this.id = id;
    }
  }

  let store: InMemoryStore;
  beforeEach(() => {
    store = new InMemoryStore();
  });

  describe('add', () => {
    it('add item to store', () => {
      const item: DummyRecord = new DummyRecord('a1');
      expect(store.count).toEqual(0);

      expect(store.add(item)).toBeTruthy();

      expect(store.count).toEqual(1);
    });

    it('does not add if item id is not set', () => {
      const item: DummyRecord = new DummyRecord('');
      expect(store.count).toEqual(0);

      expect(store.add(item)).toBeFalsy();

      expect(store.count).toEqual(0);
    });
  });

  describe('remove', () => {
    it('removes item from store', () => {
      const item: DummyRecord = new DummyRecord('a1');
      store.add(item);
      expect(store.count).toEqual(1);

      const result = store.remove(item.id);
      expect(result).toBeTruthy();
      expect(store.count).toEqual(0);
    });

    it('on removal returns false if item does not exist', () => {
      const item: DummyRecord = new DummyRecord('a1');
      store.add(item);
      expect(store.count).toEqual(1);

      expect(store.remove('id-does-not-exist')).toBeFalsy();
      expect(store.count).toEqual(1);
    });

    it('on removal returns false if id is empty', () => {
      expect(store.remove('')).toBeFalsy();
    });
  });
});

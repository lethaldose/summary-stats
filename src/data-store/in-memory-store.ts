import Persistable from './persistable.js';

export default class InMemoryStore {
  items: Persistable[];

  constructor() {
    this.items = [];
  }

  add(item: Persistable): boolean {
    if (!item.id) {
      return false;
    }
    this.items.push(item);
    return true;
  }

  remove(id: string): boolean {
    if (!id) {
      return false;
    }

    const index = this.items.findIndex((item) => {
      return item.id === id;
    });

    if (index >= 0) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  get count() {
    return this.items.length;
  }
}

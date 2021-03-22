import { random } from "./utils";

export default class RandomList<T> {
  defaultItems: Array<T>;
  items: Array<RandomItem<T>>;

  constructor(items: Array<T>) {
    this.defaultItems = items;
    this.reset();
  }

  get(): T {
    if (this.anyRemaining()) this.reset();
    const availableItems = this.items.filter((item) => !item.used);

    const index = random(1, availableItems.length) - 1;
    const item = availableItems[index];

    item.used = true;
    return item.value;
  }

  reset() {
    this.items = this.defaultItems.map((value) => new RandomItem<T>(value));
  }

  private anyRemaining() {
    return !this.items.some((item) => !item.used);
  }
}

class RandomItem<TItem> {
  value: TItem;
  used: boolean;

  constructor(value: TItem) {
    this.value = value;
    this.used = false;
  }
}

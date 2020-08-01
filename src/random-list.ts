import { random } from './utils';

export default class RandomList<TItem> {
    defaultItems: Array<TItem>;
    items: Array<RandomItem<TItem>>;

    constructor(items: Array<TItem>) {
        this.defaultItems = items;
        this.resetList();
    }

    getRandomItem(): TItem {
        if (this.allUsed()) this.resetList();
        const availableItems = this.items.filter(item => !item.used);

        const index: number = random(1, availableItems.length) - 1;
        const item: RandomItem<TItem> = availableItems[index];

        item.used = true;
        return item.value;
    }

    resetList() { 
        this.items = this.defaultItems.map(value => new RandomItem<TItem>(value))
    }

    private allUsed() {
        return !this.items.some(item => !item.used)
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
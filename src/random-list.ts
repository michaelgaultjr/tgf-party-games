import { random } from './utils';

export default class RandomList {
    defaultItems: Array<any>;
    items: Array<RandomItem>;

    constructor(items: Array<any>) {
        this.defaultItems = items;
        this.resetList();
    }

    getRandomItem() {
        if (this.allUsed()) this.resetList();
        const availableItems = this.items.filter(item => !item.used);

        const index: number = random(1, availableItems.length) - 1;
        const item: RandomItem = availableItems[index];

        item.used = true;
        return item.value;
    }

    resetList = () => this.items = this.defaultItems.map(value => new RandomItem(value))
    allUsed = () => !this.items.some(item => !item.used)
}

class RandomItem {
    value: any;
    used: boolean;

    constructor(value: any) {
        this.value = value;
        this.used = false;
    }
}
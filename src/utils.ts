import twemoji from 'twemoji';
import { Writable, writable } from 'svelte/store';

// https://gist.github.com/nikolas/b0cce2261f1382159b507dd492e1ceef
export const lerpHexColor = (a: number, b: number, amount: number): string => {
    const ar = a >> 16,
        ag = a >> 8 & 0xff,
        ab = a & 0xff,

        br = b >> 16,
        bg = b >> 8 & 0xff,
        bb = b & 0xff,

        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return ((rr << 16) + (rg << 8) + (rb | 0)).toString(16).padStart(6, '0');
};

export const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

export const random = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const emoji = (node) => {
    twemoji.parse(node, {
        folder: 'svg',
        ext: '.svg'
    });
}

// Based off of https://stackoverflow.com/questions/15069587/is-there-a-way-to-join-the-elements-in-an-js-array-but-let-the-last-separator-b
export function oxfordJoin(items: Array<string>, conjunction: string = 'and'): string {
    let l = items.length;
    if (!l) return '';
    if (l<2) return items[0];
    if (l<3) return items.join(` ${conjunction} `);
    items = items.slice();
    items[l-1] = `${conjunction} ${items[l-1]}`;
    return items.join(", ");
}

export class Stopwatch {
    active: boolean;
    totalTicks: number;
    ticks: number;

    interval: number;
    onTick?: (ticks: number) => any;

    constructor(ticks: number, onTick?: (ticks: number) => any) {
        this.totalTicks = ticks;
        this.onTick = onTick;
    }

    start(): void {
        this.ticks = this.totalTicks;
        this.interval = setInterval(() => this.tick(this), 10);
        
        this.active = true;
    }

    stop() {
        clearInterval(this.interval);
        this.active = false;
    }

    private tick(timer: Stopwatch) {
        if (timer.ticks <= 0)
        {
            timer.stop();
            return;
        }
        timer.ticks--;

        timer.onTick(this.ticks);
    }
    
    async toggle() {
        this.active ? this.start() : this.stop();
    }
}
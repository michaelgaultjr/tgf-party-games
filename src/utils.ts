import { page } from "@roxi/routify"
import { get } from "svelte/store";
import twemoji from "twemoji";

// https://gist.github.com/nikolas/b0cce2261f1382159b507dd492e1ceef
export function lerpHexColor(a: number, b: number, amount: number): string {
  const ar = a >> 16,
    ag = (a >> 8) & 0xff,
    ab = a & 0xff,
    br = b >> 16,
    bg = (b >> 8) & 0xff,
    bb = b & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return ((rr << 16) + (rg << 8) + (rb | 0)).toString(16).padStart(6, "0");
};

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function random (min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function track(state: string | number) {
  const pageMeta = get(page).meta
  console.log(pageMeta.title, state);
  window.plausible('Games Played', {
    props: {
      [pageMeta.title]: state
    }
  }) 
}

export function emoji (node: HTMLElement) {
  twemoji.parse(node, {
    folder: "svg",
    ext: ".svg",
  });
};

// Based off of https://stackoverflow.com/questions/15069587/is-there-a-way-to-join-the-elements-in-an-js-array-but-let-the-last-separator-b
export function oxfordJoin(
  items: Array<string>,
  conjunction: string = "and"
): string {
  let l = items.length;
  if (!l) return "";
  if (l < 2) return items[0];
  if (l < 3) return items.join(` ${conjunction} `);
  items = items.slice();
  items[l - 1] = `${conjunction} ${items[l - 1]}`;
  return items.join(", ");
}

export class Stopwatch {
  active: boolean;
  totalTicks: number;
  ticks: number;

  interval: number;
  onTick?: (t: number) => any;
  onStop?: () => any;

  constructor(ticks: number, onTick?: (t: number) => any, onStop?: () => any) {
    this.totalTicks = ticks;
    this.onTick = onTick;
    this.onStop = onStop;
  }

  start(): void {
    this.ticks = this.totalTicks;
    this.interval = setInterval(() => this.tick(this), 10);

    this.active = true;
  }

  stop() {
    clearInterval(this.interval);
    if (this.onStop) this.onStop();
    this.active = false;
  }

  private tick(timer: Stopwatch) {
    if (timer.ticks <= 0) {
      timer.stop();
      return;
    }
    timer.ticks--;

    if (timer.onTick) timer.onTick(timer.ticks);
  }

  async toggle() {
    this.active ? this.start() : this.stop();
  }
}

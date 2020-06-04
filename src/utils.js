// https://gist.github.com/nikolas/b0cce2261f1382159b507dd492e1ceef
export const lerpHexColor = (a, b, amount) => {
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

export const wait = ms => new Promise(res => setTimeout(res, ms));

export const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
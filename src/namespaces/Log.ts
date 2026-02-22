//Pinescript formatted logs example:

import { Series } from '../Series';
import { Context } from '..';

function formatWithTimezone(date = new Date()) {
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, '0');

    const tz = sign + pad(offset / 60) + ':' + pad(offset % 60);

    return `[${date.toISOString().slice(0, -1)}${tz}]`;
}

export class Log {
    constructor(private context: Context) {}

    private logFormat(message: string, ...args: any[]) {
        return message.replace(/{(\d+)}/g, (match, index) => args[index]);
    }

    param(source: any, index: number = 0, name?: string) {
        return Series.from(source).get(index);
    }
    warning(message: string, ...args: any[]) {
        const _timestamp = this.context.data['openTime'].data[this.context.idx];
        const _time = formatWithTimezone(new Date(_timestamp));

        console.warn(`${_time} ${this.logFormat(message, ...args)}`);
    }
    error(message: string, ...args: any[]) {
        const _timestamp = this.context.data['openTime'].data[this.context.idx];
        const _time = formatWithTimezone(new Date(_timestamp));

        console.error(`${_time} ${this.logFormat(message, ...args)}`);
    }
    info(message: string, ...args: any[]) {
        const _timestamp = this.context.data['openTime'].data[this.context.idx];
        const _time = formatWithTimezone(new Date(_timestamp));

        console.log(`${_time} ${this.logFormat(message, ...args)}`);
    }
}

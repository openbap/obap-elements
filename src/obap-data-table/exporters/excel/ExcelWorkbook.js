/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ExcelWorksheet } from './ExcelWorksheet.js';

export class ExcelWorkbook {
    constructor() {
        this._worksheets = [];
    }

    get worksheets() {
        return this._worksheets;
    }

    set worksheets(value) {
        throw 'Cannot set worksheets property';
    }

    addWorksheet(name) {
        const ws = new ExcelWorksheet(name);
        this.worksheets.push(ws);
        return ws;
    }
}
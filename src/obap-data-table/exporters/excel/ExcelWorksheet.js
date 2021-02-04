/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ExcelRow } from "./ExcelRow.js";

export class ExcelWorksheet {
    constructor(name) {
        this._name = name;
        this._rows = [];
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get rows() {
        return this._rows;
    }

    set rows(value) {
        throw 'Cannot set rows property';
    }

    addRow() {
        const row = new ExcelRow();
        this.rows.push(row);
        return row;
    }
}
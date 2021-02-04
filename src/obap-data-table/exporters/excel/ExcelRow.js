/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ExcelCell } from "./ExcelCell.js";

export class ExcelRow {
    constructor() {
        this._cells = [];
    }

    get cells() {
        return this._cells;
    }

    set cells(value) {
        throw 'Cannot set cells property';
    }

    addCell(value, type) {
        const cell = new ExcelCell(value, type);
        this.cells.push(cell);
        return cell;
    }

    addTextCell(value) {
        this.addCell(value, 'text');
    }

    addNumberCell(value) {
        this.addCell(value, 'number');
    }

    addBooleanCell(value) {
        this.addCell(value, 'boolean');
    }

    addDateTimeCell(value) {
        this.addCell(value, 'datetime');
    }

    addCurrencyCell(value) {
        this.addCell(value, 'currency');
    }
}
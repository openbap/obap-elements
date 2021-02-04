/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
export class ExcelCell {
    // type = text (default), number, datetime, currency, boolean
    constructor(value, type = 'text') {
        this._value = value;
        this._type = type;
        this._lookupIndex = -1;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get lookupIndex() {
        return this._lookupIndex;
    }

    set lookupIndex(value) {
        this._lookupIndex = value;
    }

    getDateTimeValue() {
        if (this.type === 'datetime') {
            let val = 25569.0 + ((this.value.getTime() - (this.value.getTimezoneOffset() * 60000)) / (86400000));
            return val.toString().substr(0,20);
        }
        
        return null;
    }
}
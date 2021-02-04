/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { saveAs } from './file/file.js';

export class CsvExporter {
    export(fileName, columns, rows, delimiter, currencyFormat = '$#,##0.00', dateTimeFormat = 'yyyy/mm/dd\ hh:mm:ss') {
        const data = [];

        data.push(columns.map((column) => column.label).join(delimiter));

        rows.forEach((row) => {
            data.push(row.join(delimiter));
        });      

        const fileData = data.join('\n');
        const blob = new Blob([fileData], {type: "text/plain;charset=utf-8"});

        saveAs(blob, fileName);
    }
}
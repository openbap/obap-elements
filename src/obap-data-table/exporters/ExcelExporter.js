/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { saveAs } from './file/file.js';
import { ExcelDocument } from './excel/Excel.js';

export class ExcelExporter {
    export(fileName, columns, rows, currencyFormat, dateTimeFormat) {
        // Create a new Document.
        const doc = new ExcelDocument(fileName ? fileName : 'file.xlsx', currencyFormat ? currencyFormat : undefined, dateTimeFormat ? dateTimeFormat : undefined);

        // Add worksheets to the workbook.
        const ws = doc.workbook.addWorksheet('data');
        const headerRow = ws.addRow();

        columns.forEach((column) => {
            headerRow.addTextCell(column.label);
        });

        rows.forEach((row) => {
            const eRow = ws.addRow();

            row.forEach((val, index) => {
                eRow.addCell(val, columns[index].type);
            });
        });

        saveAs(doc.build(), doc.name);
    }
}
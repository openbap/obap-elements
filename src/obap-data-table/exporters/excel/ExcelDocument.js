/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { encode } from '../file/zip.js';
import { ExcelWorkbook } from './ExcelWorkbook.js';

export class ExcelDocument {
    constructor(name, currencyFormat = '$#,##0.00', dateTimeFormat = 'yyyy/mm/dd\ hh:mm:ss') {
        this._name = name;
        this._workbook = new ExcelWorkbook();
        this._uniqueStrings = [];
        this._xmlHeader = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';

        this._currencyFormat = currencyFormat;
        this._dateTimeFormat = dateTimeFormat;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get workbook() {
        return this._workbook;
    }

    set workbook(value) {
        this._workbook = value;
    }

    get currencyFormat() {
        return this._currencyFormat;
    }

    set currencyFormat(value) {
        this._currencyFormat = value;
    }

    get dateTimeFormat() {
        return this._dateTimeFormat;
    }

    set dateTimeFormat(value) {
        this._dateTimeFormat = value;
    }

    build() {
        const files = {};
        const utf8Encoder = new TextEncoder();
        const FOLDER = utf8Encoder.encode('');
        //const TODO = utf8Encoder.encode('');

        // Content Types
        files['[Content_Types].xml'] = utf8Encoder.encode(this._buildContentTypes());

        // Root Relationships
        files['_rels/'] = FOLDER;
        files['_rels/.rels'] = utf8Encoder.encode(this._buildRootRelationships());

        // Document Properties
        files['docProps/'] = FOLDER;
        files['docProps/app.xml'] = utf8Encoder.encode(this._buildAppProperties());
        files['docProps/core.xml'] = utf8Encoder.encode(this._buildCoreProperties());

        // Document
        files['xl/'] = FOLDER;
        files['xl/sharedStrings.xml'] = utf8Encoder.encode(this._buildSharedStrings());
        files['xl/styles.xml'] = utf8Encoder.encode(this._buildStyles());
        files['xl/workbook.xml'] = utf8Encoder.encode(this._buildWorkbook());

        // Document Relationships
        files['xl/_rels/'] = FOLDER;
        files['xl/_rels/workbook.xml.rels'] = utf8Encoder.encode(this._buildDocumentRelationships());

        // Worksheets
        files['xl/worksheets/'] = FOLDER;

        this.workbook.worksheets.forEach((ws, index) => {
            files[`xl/worksheets/sheet${index + 1}.xml`] = utf8Encoder.encode(this._buildWorksheet(ws));
        });

        // Encode the files.
        const zipUint8Array = encode(files);
        const blob = new Blob([zipUint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        return blob;
    }

    _buildContentTypes() {
        const wbs = [];

        for (let i = 1; i <= this.workbook.worksheets.length; i++) {
            wbs.push(`<Override PartName="/xl/worksheets/sheet${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`);
        }

        const xml = [
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
            '<Default Extension="xml" ContentType="application/xml"/>',
            '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
            ...wbs,
            '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
            '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>',
            '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>',
            '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>',
            '</Types>'
        ];

        return this._xmlHeader + xml.join('');
    }

    _buildRootRelationships() {
        const xml = [
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
            '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>',
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>',
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>',
            '</Relationships>'
        ];

        return this._xmlHeader + xml.join('');
    }

    _buildAppProperties() {
        const wsc = this.workbook.worksheets.length;
        const wbs = [];

        this.workbook.worksheets.forEach((ws) => {
            wbs.push(`<vt:lpstr>${ws.name}</vt:lpstr>`);
        });

        const xml = [
            '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">',
            '<Application>Microsoft Excel</Application>',
            '<DocSecurity>0</DocSecurity>',
            '<ScaleCrop>false</ScaleCrop>',
            '<HeadingPairs>',
            '<vt:vector size="2" baseType="variant">',
            '<vt:variant>',
            '<vt:lpstr>Worksheets</vt:lpstr>',
            '</vt:variant>',
            '<vt:variant>',
            `<vt:i4>${wsc}</vt:i4>`,
            '</vt:variant>',
            '</vt:vector>',
            '</HeadingPairs>',
            '<TitlesOfParts>',
            `<vt:vector size="${wsc}" baseType="lpstr">`,
            ...wbs,
            '</vt:vector>',
            '</TitlesOfParts>',
            '<Company></Company>',
            '<LinksUpToDate>false</LinksUpToDate>',
            '<SharedDoc>false</SharedDoc>',
            '<HyperlinksChanged>false</HyperlinksChanged>',
            '<AppVersion>15.0300</AppVersion>',
            '</Properties>'
        ];

        return this._xmlHeader + xml.join('');
    }

    _buildCoreProperties() {
        const creator = '';
        const title = '';
        const dt = new Date().toISOString();

        const xml = [
            '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"',
            ' xmlns:dc="http://purl.org/dc/elements/1.1/"',
            ' xmlns:dcterms="http://purl.org/dc/terms/"',
            ' xmlns:dcmitype="http://purl.org/dc/dcmitype/"',
            ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
            `<dc:title>${title}</dc:title>`,
            `<dc:creator>${creator}</dc:creator>`,
            `<cp:lastModifiedBy>${creator}</cp:lastModifiedBy>`,
            `<dcterms:created xsi:type="dcterms:W3CDTF">${dt}</dcterms:created>`,
            `<dcterms:modified xsi:type="dcterms:W3CDTF">${dt}</dcterms:modified>`,
            '</cp:coreProperties>',
        ];

        return this._xmlHeader + xml.join('');
    }

    _buildWorkbook() {
        const wbs = [];

        this.workbook.worksheets.forEach((ws, index) => {
            const num = index + 1;
            wbs.push(`<sheet name="${ws.name}" sheetId="${num}" r:id="rId${num}"/>`);
        });

        const xml = [
            '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"',
            ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"',
            ' xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x15"',
            ' xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main">',
            '<fileVersion appName="xl" lastEdited="6" lowestEdited="6" rupBuild="14420"/>',
            '<workbookPr defaultThemeVersion="153222"/>',
            '<mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">',
            '<mc:Choice Requires="x15">',
            '<x15ac:absPath url="" xmlns:x15ac="http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac"/>',
            '</mc:Choice>',
            '</mc:AlternateContent>',
            '<bookViews>',
            '<workbookView xWindow="0" yWindow="0" windowWidth="28800" windowHeight="14235"/>',
            '</bookViews>',
            '<sheets>',
            ...wbs,
            '</sheets>',
            '<calcPr calcId="152511"/>',
            '<extLst>',
            '<ext uri="{140A7094-0E35-4892-8432-C4D2E57EDEB5}" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main">',
            '<x15:workbookPr chartTrackingRefBase="1"/>',
            '</ext>',
            '</extLst>',
            ' </workbook>',
        ];

        return this._xmlHeader + xml.join('');
    }

    _buildDocumentRelationships() {
        const wsc = this.workbook.worksheets.length;
        const wbs = [];

        for (let i = 1; i <= wsc; i++) {
            wbs.push(`<Relationship Id="rId${i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i}.xml"/>`);
        }

        const xml = [
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
            ...wbs,
            `<Relationship Id="rId${wsc + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>`,
            `<Relationship Id="rId${wsc + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>`,
            '</Relationships>'
        ];

        return this._xmlHeader + xml.join('');
    }

    _buildWorksheet(ws) {
        const rowCellCounts = ws.rows.map((row) => row.cells.length);
        const maxRowCellCount = Math.max(...rowCellCounts);
        const rowsXml = ws.rows.filter((row) => row.cells.length > 0).map((row, index) => this._buildWorksheetRow(row, index + 1, maxRowCellCount));

        const xml = [
            '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"',
            ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"',
            ' xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac"',
            ' xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">',
            '<dimension ref="A1"/>',
            '<sheetViews>',
            '<sheetView tabSelected="1" workbookViewId="0"/>',
            '</sheetViews>',
            '<sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25"/>',
            maxRowCellCount > 0 ? '<sheetData>' : null,
            ...rowsXml,
            maxRowCellCount > 0 ? '</sheetData>' : null,
            maxRowCellCount === 0 ? '<sheetData/>' : null,
            '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>',
            '</worksheet>'
        ];

        return this._xmlHeader + xml.filter((s) => s !== null).join('');
    }

    _buildWorksheetRow(row, index, max) {
        const cellsXml = row.cells.map((cell, cellIndex) => this._buildWorksheetCell(cell, index, cellIndex + 1));

        const xml = [
            `<row r="${index}" spans="1:${max}" x14ac:dyDescent="0.25">`,
            ...cellsXml,
            '</row>'
        ];

        return xml.join('');
    }

    _buildWorksheetCell(cell, rowIndex, cellIndex) {
        const xml = [
            `<c r="${this._cellFromIndex(cellIndex) + rowIndex}"${this._getCellType(cell)}>`,
            `<v>${this._getCellValue(cell)}</v>`,
            '</c>',
        ];

        return xml.join('');
    }

    _getCellType(cell) {
        switch (cell.type) {
            case 'text': {
                return ' t="s"';
            }

            case 'number': {
                return '';
            }

            case 'boolean': {
                return ' t="b"';
            }

            case 'datetime': {
                return ' s="3"';
            }

            case 'currency': {
                return ' s="2"';
            }

            default: {
                return '';
            }
        }
    }

    _getCellValue(cell) {
        switch (cell.type) {
            case 'text': {
                return cell.lookupIndex;
            }

            case 'number': {
                return Number(cell.value);
            }

            case 'currency': {
                return Number(cell.value);
            }

            case 'boolean': {
                return cell.value ? 1 : 0;
            }

            case 'datetime': {
                return cell.getDateTimeValue();
            }

            default: {
                return cell.value;
            }
        }
    }

    _cellFromIndex(index) {
        for (var cellName = '', a = 1, b = 26; (index -= a) >= 0; a = b, b *= 26) {
            cellName = String.fromCharCode(parseInt((index % b) / a) + 65) + cellName;
        }

        return cellName;
    }

    _buildSharedStrings() {
        // Get all the text cell values.
        const strings = [];

        this.workbook.worksheets.forEach((ws) => {
            ws.rows.forEach((row) => {
                strings.push(...row.cells.filter((cell) => cell.type === 'text').map((cell) => cell.value.toString()));
            });
        });

        const stringCount = strings.length;

        // Get the unique strings.
        this._uniqueStrings = [...new Set(strings)];
        const uniqueStringCount = this._uniqueStrings.length;

        // Add string mappings.
        this.workbook.worksheets.forEach((ws) => {
            ws.rows.forEach((row) => {
                row.cells.forEach((cell) => {
                    if (cell.type === 'text') {
                        cell.lookupIndex = this._uniqueStrings.indexOf(cell.value.toString());
                    }
                });
            });
        });

        // Create the xml.
        const stringXml = [];

        this._uniqueStrings.forEach((s) => {
            const x = [
                '<si>',
                `<t>${s}</t>`,
                '</si>',
            ];

            stringXml.push(x.join('\n'));
        });
        
        const xml = [
            `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${stringCount}" uniqueCount="${uniqueStringCount}">`,
            ...stringXml,
            '</sst>'
        ];

        return this._xmlHeader + xml.join('');
    }

    _buildStyles() {
        const xml = [
            '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"',
            ' xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac"',
            ' xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">',
            '<numFmts count="1">',
            `<numFmt numFmtId="164" formatCode="${this.currencyFormat}"/>`,
            `<numFmt numFmtId="165" formatCode="${this.dateTimeFormat}"/>`,
            '</numFmts>',
            '<fonts count="1" x14ac:knownFonts="1">',
            '<font>',
            '<sz val="11"/>',
            '<color theme="1"/>',
            '<name val="Calibri"/>',
            '<family val="2"/>',
            '<scheme val="minor"/>',
            '</font>',
            '</fonts>',
            '<fills count="2">',
            '<fill>',
            '<patternFill patternType="none"/>',
            '</fill>',
            '<fill>',
            '<patternFill patternType="gray125"/>',
            ' </fill>',
            '</fills>',
            '<borders count="1">',
            '<border>',
            '<left/>',
            '<right/>',
            '<top/>',
            '<bottom/>',
            '<diagonal/>',
            ' </border>',
            '</borders>',
            '<cellStyleXfs count="1">',
            '<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>',
            '</cellStyleXfs>',
            '<cellXfs count="3">',
            '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>',
            '<xf numFmtId="14" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>',
            '<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>',
            '<xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>',
            '</cellXfs>',
            '<cellStyles count="1">',
            '<cellStyle name="Normal" xfId="0" builtinId="0"/>',
            '</cellStyles>',
            '</styleSheet>',
        ];

        return this._xmlHeader + xml.join('');
    }
}
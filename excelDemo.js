



const ExcelJS = require('exceljs');

    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile('D:/Playwright_Excel_File/ExcelDownloadTest.xlsx').then(async () => {
        const worksheet = workbook.getWorksheet('Sheet1');
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                console.log(`Row ${rowNumber} Col ${colNumber}: ${cell.value}`);
                //or
                console.log(cell.value);

                if (cell.value === 'Apple') {
                    console.log(`Found Apple at Row ${rowNumber} Col ${colNumber}`);
                }
            })
        });

        const cell = worksheet.getCell(3,2);
        cell.value = 'Apple';
        await workbook.xlsx.writeFile('D:/Playwright_Excel_File/ExcelDownloadTest.xlsx');
        console.log('Excel file updated successfully!');
        
    });












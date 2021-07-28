import { Injectable } from '@angular/core';
import * as XLSX from "xlsx";

@Injectable({
  providedIn: 'root'
})
export class TableUtilsService {

  constructor() { }

   
   exportArrayToExcel(arr: any[], name?: string, sheetName?: string,) {
   // let { sheetName, fileName } = getFileName(name);
  
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${name}.xlsx`);
  }
}

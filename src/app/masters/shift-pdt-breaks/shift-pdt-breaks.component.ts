import { ManualEntryService } from './../manual-entry.service';

import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

interface ShiftPDTBreak {
  _id:string,
  pdt_name:string,
  pdt_start_time:string,
 // line_id:string,
  pdt_code:number,
  pdt_end_time:string
}

@Component({
  selector: 'app-shift-pdt-breaks',
  templateUrl: './shift-pdt-breaks.component.html',
  styleUrls: ['./shift-pdt-breaks.component.scss']
})
export class ShiftPdtBreaksComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar,public dialog: MatDialog,private dataentryservice:ManualEntryService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  //public Companies: Company[] = [];
  @Input() lineid: string;
  public ShiftPDTBreaks: ShiftPDTBreak[] = [];
  displayedColumns: string[];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  //dataSource = [];
  dataSource: MatTableDataSource<ShiftPDTBreak>;
  displayedColumnsAs = {
      _id:{ 'DN':'PDT ID', 'visible': true },
      pdt_name:{ 'DN':'PDT Name', 'visible': false },
      pdt_start_time:{ 'DN':'PDT Start Time', 'visible': false },
      //line_id:{ 'DN':'Line ID', 'visible': false },
      pdt_code:{ 'DN':'PDT Code', 'visible': false },
      pdt_end_time:{ 'DN':'PDT End Time', 'visible': false },
  }
 
  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }



;

 


  GetShiftPDTBreaks() {
    this.ShiftPDTBreaks = [];
        this.dataentryservice.GetShiftPDTBreaks().subscribe(
            (data: any[]) => {
              for (let i = 0; i < data.length; i++) {
                const c = data[i];
                const PDT_data =
                {
                  _id:c._id,
                  pdt_name:c.pdt_name,
                  pdt_start_time:c.pdt_start_time,
                  shift:c.shift,
                  pdt_code:c.pdt_code,
                  pdt_end_time:c.pdt_end_time,
                  
                }
                this.ShiftPDTBreaks.push(PDT_data);
              }
              console.log(this.ShiftPDTBreaks);
              this.vdisplayedColumns = [];
              if (Object.keys(data).length > 0) {
                for (let i = 0; i < Object.keys(this.ShiftPDTBreaks[0]).length; i++) {
                  this.vdisplayedColumns.push(Object.keys(this.ShiftPDTBreaks[0])[i]);
                }
                this.vdisplayedColumns.push('star');
                this.gotData = true;
                this.dataSource = new MatTableDataSource(this.ShiftPDTBreaks);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.displayedColumns = this.vdisplayedColumns;
              }
              else
              {
                console.log('else part called');
                this.gotData = true;
                this.dataSource = null;
                this.displayedColumns = this.vdisplayedColumns;
              }
            })
       // }
      //});
  }

  ngOnInit() {
    this.GetShiftPDTBreaks();
  }



  applyFilter(filterValue: string) {
    console.log(filterValue,"filterValue");
    console.log(filterValue.trim().toLowerCase(),"trim value");
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

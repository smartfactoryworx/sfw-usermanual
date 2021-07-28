import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManualEntryService } from 'src/app/manual-entry.service';

interface releaseNote{
date?:string;
itemRelease?:string;
}
@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private manualentryservice: ManualEntryService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  public ReleaseData: releaseNote[] = [];
  dataSource: MatTableDataSource<releaseNote>;
  errorText = "";
  noData;
  machineName;

  displayedColumnsAs = {
    date: { 'DN': 'Date', 'visible': false },
    itemRelease: { 'DN': 'Item Released', 'visible': false },
  }
  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }




  GetReleaseData() {
  
    this.errorText = "";
    this.ReleaseData = [];
    this.gotData = false;
      this.manualentryservice.GetReleaseNotesData().subscribe((releasedata: any) => {
        console.log("releasedata", releasedata);
        var c = releasedata;
        for (let i = 0; i < c.length; i++) {
          const data = c[i]

          const allData = {
            date:data.date,
            itemRelease:data.itemRelease,
            
          }
          this.ReleaseData.push(allData);
        }
        console.log("ReleaseData", this.ReleaseData);
        this.vdisplayedColumns = [];
        //console.log(this.fgextype[0]);
        if (Object.keys(releasedata).length > 0) {
          if (this.ReleaseData.length > 0) {
            for (let i = 0; i < Object.keys(this.ReleaseData[0]).length; i++) {
              this.vdisplayedColumns.push(Object.keys(this.ReleaseData[0])[i]);
              //console.log("function");
            }
            this.gotData = true;
            this.dataSource = new MatTableDataSource(this.ReleaseData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.displayedColumns = this.vdisplayedColumns;
            this.noData = this.dataSource.filteredData.length;
          }
          else {
            console.log('hide data');
            this.dataSource = new MatTableDataSource(this.ReleaseData);
            this.noData = this.dataSource.filteredData.length;
            this.errorText = "No Records Found";
          }
        }
        else {
          this.gotData = true;
          this.dataSource = null;
          this.displayedColumns = this.vdisplayedColumns;
          this.noData = this.dataSource.filteredData.length;
        }
      });

  }

  ngOnInit(): void {
    this.GetReleaseData();
  }




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

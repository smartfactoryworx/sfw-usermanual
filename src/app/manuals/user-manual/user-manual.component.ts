import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManualEntryService } from 'src/app/manual-entry.service';


interface manualDetail{
title?:string;
description?:string;
fileDownloadLink?:string;
fileName?:string;
}

@Component({
  selector: 'app-user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.scss']
})
export class UserManualComponent implements OnInit {
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
  public ManualDetails: manualDetail[] = [];
  dataSource: MatTableDataSource<manualDetail>;
  errorText = "";
  noData;
  machineName;

  displayedColumnsAs = {
    title: { 'DN': 'Title', 'visible': false },
    description: { 'DN': 'Description', 'visible': false },
    fileDownloadLink: { 'DN': 'Download File', 'visible': true },
    fileName: { 'DN': 'File Name', 'visible': true },
  }
  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }




  GetManualData() {
  
    this.errorText = "";
    this.ManualDetails = [];
    this.gotData = false;
      this.manualentryservice.GetUserManualData().subscribe((manualdata: any) => {
        console.log("manualdata", manualdata);
        var c = manualdata;
        for (let i = 0; i < c.length; i++) {
          const data = c[i]

          const allData = {
            title:data.title,
            description:data.description,
            fileDownloadLink:data.fileDownloadLink,
            fileName:data.fileName
          }
          this.ManualDetails.push(allData);
        }
        console.log("ManualDetails", this.ManualDetails);
        this.vdisplayedColumns = [];
        //console.log(this.fgextype[0]);
        if (Object.keys(manualdata).length > 0) {
          if (this.ManualDetails.length > 0) {
            for (let i = 0; i < Object.keys(this.ManualDetails[0]).length; i++) {
              this.vdisplayedColumns.push(Object.keys(this.ManualDetails[0])[i]);
              //console.log("function");
            }
            this.vdisplayedColumns.push('star');
            this.gotData = true;
            this.dataSource = new MatTableDataSource(this.ManualDetails);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.displayedColumns = this.vdisplayedColumns;
            this.noData = this.dataSource.filteredData.length;
          }
          else {
            console.log('hide data');
            this.dataSource = new MatTableDataSource(this.ManualDetails);
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
    this.GetManualData();
  }

  DownloadFile(element){
    console.log(element);
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', element.fileDownloadLink);
    link.setAttribute('download', element.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}




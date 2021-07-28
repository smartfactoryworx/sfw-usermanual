import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, SimpleChanges, ɵConsole, ViewChild } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FgexdailogComponent } from './fgexdailog/fgexdailog.component';
import { ManualEntryService } from '../manual-entry.service';
import { TableUtilsService } from 'src/app/table-utils.service';
interface fgex {
  fgexid?: string;
  fgexno?: number;
  fgexproductname?: string;
  fgexhalbcode?: string;
  fgexpack?: number;
  fgextype?: string;
  //fgextypeId?: string;
  fgextypename?: string;
  fgexlayout?: number;
  fgexblistersize?: string;
  fgexcurrentmachine?: string;
  fgexblisterperformat?: number;
  fgexcycle?: number;
  fgexratedspeed?: number;
  fgextablet?: number; // Formatlineid: string;
  fgexNoOfBlisterInCarton?: number;
  fgexSecondaryMachineSpeed?: number;
  IsT200Used?: string;
  fgexRemark: string;
}

@Component({
  selector: 'app-fgex',
  templateUrl: './fgex.component.html',
  styleUrls: ['./fgex.component.scss']
})
export class FgexComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog, private manualentryservice: ManualEntryService,private tableutil: TableUtilsService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  @Input() lineid: string;
  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  public fgextype: fgex[] = [];
  public globalKeys: any[];
  dataSource: MatTableDataSource<fgex>;
  roleName;
  roleActionBit: boolean = false;
  displayedColumnsAs = {
    fgexid: { 'DN': 'ID', 'visible': true },
    fgexno: { 'DN': 'fgex No.', 'visible': false },
    fgexproductname: { 'DN': 'Product Name', 'visible': false },
    fgexhalbcode: { 'DN': 'Halb-Code', 'visible': false },
    fgexpack: { 'DN': 'Pack', 'visible': false },
    fgextype: { 'DN': 'Type', 'visible': false },
    //fgextypename: { 'DN': 'Type', 'visible': false },
    //fgextypeId: { 'DN': 'Type', 'visible': true },
    fgexlayout: { 'DN': 'Layout No.', 'visible': false },
    fgexblistersize: { 'DN': 'Blister Size', 'visible': false },
    fgexcurrentmachine: { 'DN': 'Current Machine', 'visible': false },
    fgexblisterperformat: { 'DN': 'Format', 'visible': false },
    fgexcycle: { 'DN': 'Cycle', 'visible': false },
    fgexratedspeed: { 'DN': 'Blister Per Minute', 'visible': false },
    fgextablet: { 'DN': 'Tablet Per Blister', 'visible': true },

    fgexNoOfBlisterInCarton: { 'DN': 'Blister in carton', 'visible': false },
    fgexSecondaryMachineSpeed: { 'DN': 'Sec. Machine Speed', 'visible': false },

    IsT200Used: { 'DN': 'T200-used', 'visible': false },
    fgexRemark: { 'DN': 'Tablet Per Blister', 'visible': true }
  }
  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }

  GetfgexData(lineid) {
    //console.log(lineid);
    //console.log("lineID:Testing");
    this.fgextype = [];
    //this.manualentryservice.GetServerAPIPath().subscribe(serverdetails => {
    this.manualentryservice.GetFgexData().subscribe((fgexdata: any[]) => {
      //console.log(fgexdata);
      for (let i = 0; i < fgexdata.length; i++) {
        const c = fgexdata[i];
        //console.log(c);
        const fgex_data =
        {
          fgexid: c._id,
          fgexno: c.fgex,
          fgexproductname: c.product_name,
          fgexhalbcode: c.halb_code,
          fgexpack: c.pack,
          fgextype: c.type,
          //fgextypeId: c && c.type && c.type._id,
          fgextypename: c && c.type && c.type.display_name,
          fgexlayout: c.layout_no,
          fgexblistersize: c.blister_size,
          fgexcurrentmachine: c.current_machine,
          fgexblisterperformat: c.blister_per_format,
          fgexcycle: c.machine_cycle,
          fgexratedspeed: c.rated_speed,
          fgextablet: c.tablet_per_blister,

          fgexNoOfBlisterInCarton: c.No_of_blisters,
          fgexSecondaryMachineSpeed: c.Secondary_machines_speed,
          IsT200Used: c.T200_use,
          fgexRemark: c.Remark

        }
        this.fgextype.push(fgex_data);

      }
      //console.log(this.fgextype);
      this.vdisplayedColumns = [];
      //console.log(this.fgextype[0]);
      if (Object.keys(fgexdata).length > 0) {
        for (let i = 0; i < Object.keys(this.fgextype[0]).length; i++) {
          this.vdisplayedColumns.push(Object.keys(this.fgextype[0])[i]);
          //console.log("function");
        }
        this.vdisplayedColumns.push('star');
        this.gotData = true;
        this.dataSource = new MatTableDataSource(this.fgextype);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.displayedColumns = this.vdisplayedColumns;
      }
      else {
        //console.log('else part called');
        this.gotData = true;
        this.dataSource = null;
        this.displayedColumns = this.vdisplayedColumns;
      }
    });
    //});
  }

  SendGlobalKeysToModal() {

    this.globalKeys = [];
    //this.manualentryservice.GetServerAPIPath().subscribe(serverdetails => {

    this.manualentryservice.GetSubstituteData('fgextype').subscribe((globalkeydata: any[]) => {
      //console.log(globalkeydata);
      for (let i = 0; i < globalkeydata.length; i++) {
        const c = globalkeydata[i];
        let a: string[] = [''];
        //console.log(c.value);
        a.push(c._id);
        a.push(c.display_name);
        //console.log("values "+a);
        this.globalKeys.push(a);
        //console.log(this.globalKeys);

      }
      //console.log(this.globalKeys);

    });
    // });
    //console.log(this.globalKeys);
    return this.globalKeys;
  }



  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   this.lineid = changes.lineid.currentValue;
  //   if (changes.lineid.currentValue != null && changes.lineid.currentValue != "") {
  //     //console.log("----ngOnChange function----");
  //     this.GetfgexData(this.lineid);
  //     //changes.lineid.currentValue replaced with '5e5113fbfba653297ef343aa'
  //   }
  // }

  ngOnInit() {
   // console.log('1st');
    try {
      let localStroagePath = JSON.parse(localStorage.getItem('currentUser'));
      //console.log(localStroagePath.roles.length);
      if (localStroagePath.roles.length != 0) {
        this.roleName = localStroagePath.roles[0].name;
      //  console.log(this.roleName, "roleName");
        if (this.roleName.includes("manager") || this.roleName.includes("admin")) {
          this.roleActionBit = true;
        } else {
          this.roleActionBit = false;
        }
      }
    } catch (error) {
      this.roleActionBit = false;
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.

    //if ( this.lineid != null &&  this.lineid != "") {
    //console.log("----ngOnChange function----");
    this.GetfgexData(this.lineid);
    //changes.lineid.currentValue replaced with '5e5113fbfba653297ef343aa'
    //}


  }

  ClearElements() {
    //this._id.setValue("");
  }

  deleteRow(element) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DailogAddfgex() {
    //console.log('add details');
    const dialogRef = this.dialog.open(FgexdailogComponent, {
      width: '700px',
      height: '500px',
      data: {
        dataKey: {
          globalKeys: this.SendGlobalKeysToModal(),
          lineid: this.lineid,
          title: 'Add Details',
          button: 'Done'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.SubmitChanges(result);
      }
    });
  }

  DailogUpdatefgex(element) {
    //console.log("fuction called");
    //console.log("this is updated: " + JSON.stringify(element));
    const dialogRef = this.dialog.open(FgexdailogComponent, {
      width: '700px',
      height: '500px',
      data: {
        dataKey: {
          lineid: this.lineid,
          globalKeys: this.SendGlobalKeysToModal(),
          rowdata: element,
          title: 'Update Details',
          button: 'Update'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      //this.dialogValue = result.data;
      if (result !== undefined) {
        this.SubmitChanges(result);
        //this.dialogValue = result.data;
        //this.openSnackBar("Success", "Records Updated Successfully");

      }

    });
  }

  SubmitChanges(result) {
    //console.log("I have reached function");
    // this.httpClient.get('configs/apix/api_server.json').subscribe( apipath => {
    //  if ('https://int91mat11.smartfactoryworx.tech/' !== undefined) {
    var T = {};
    if (result._id !== null) {
      console.log(result.T200Used, "result.T200Used");

      T = {
        _id: result._id,
        fgex: result.fgex,
        product_name: result.product_name,
        halb_code: result.halb_code,
        pack: result.pack,
        type: result.type,
        // display_name: result.display_name,
        layout_no: result.layout_no,
        blister_size: result.blister_size,
        current_machine: result.current_machine,
        blister_per_format: result.blister_per_format,
        machine_cycle: result.machine_cycle,
        rated_speed: result.rated_speed,
        tablet_per_blister: result.tablet_per_blister,
        line_id: this.lineid,
        No_of_blisters: result.blisterInCarton,
        Secondary_machines_speed: result.secondaryMachineSpeed,
        T200_use: result.T200Used,
      }
    }
    else {
      T = {
        _id: null,
        fgex: result.fgex,
        product_name: result.product_name,
        halb_code: result.halb_code,
        pack: result.pack,
        type: result.type,
        // display_name: result.display_name,
        layout_no: result.layout_no,
        blister_size: result.blister_size,
        current_machine: result.current_machine,
        blister_per_format: result.blister_per_format,
        machine_cycle: result.machine_cycle,
        rated_speed: result.rated_speed,
        tablet_per_blister: result.tablet_per_blister,
        line_id: this.lineid,
        No_of_blisters: result.blisterInCarton,
        Secondary_machines_speed: result.secondaryMachineSpeed,
        T200_use: result.T200Used,
      }
    }
    console.log("Data which is being posted : " + JSON.stringify(T));
    console.log('/api/fgex');

    this.manualentryservice.PostFgexData(T).subscribe(
      (data: any[]) => {
        //console.log(data);
        this.GetfgexData(this.lineid);
        this.openSnackBar("Success", "Records Updated Successfully");

        //this.openSnackBar("Request Successfull");
      },
      (error: HttpErrorResponse) => {
        //console.log(error);
        if (error.status >= 400) {
          this.openSnackBar("Validation", error.error);
        }
        else {
          this.openSnackBar("Error", error.error);
        }
      }
    );
    //}
    //  });
  }

  exportTable(){
    this.tableutil.exportArrayToExcel(this.fgextype,"Fgex_Master","Fgex_Master");
  }
}

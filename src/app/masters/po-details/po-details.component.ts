import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, SimpleChanges, ɵConsole, ViewChild, OnChanges } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PoDetailsDialogComponent } from './po-details-dialog/po-details-dialog.component';
import { ManualEntryService } from '../manual-entry.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

interface Product {
  ProductID: string;
  ProductCode: string;
  ProductName: string;

}
interface poDetails {
  isUsed?: boolean;
  current_status?: string;
  postApiHitFrom?: string;
  _id?: string;
  PONumber?: string;
  ProductCode?: string;
  LOTNumber?: string;
  HalbCode?: string;
  LOTSize?: number;
  PlantCode?: string;
  PlantName?: string;

  ProductDescription?: string;
  UpdateTimestamp?: string;
  createdAt?: string;
  updatedAt?: string;


}
@Component({
  selector: 'app-po-details',
  templateUrl: './po-details.component.html',
  styleUrls: ['./po-details.component.scss']
})
export class PoDetailsComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog, public datePipe: DatePipe,
    private manualentryservice: ManualEntryService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  @Input() _id: string;
  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  public poList: poDetails[] = [];
  public globalKeys: any[];
  public Products: Product[] = [];

  public filteredProducts = this.Products.slice();
  dataSource: MatTableDataSource<poDetails>;

  displayedColumnsAs = {
    isUsed: { 'DN': 'isUsed', 'visible': true },
    current_status: { 'DN': 'Current Status', 'visible': true },
    postApiHitFrom: { 'DN': 'Post Api Hit From', 'visible': true },
    _id: { 'DN': 'ID', 'visible': true },
    PONumber: { 'DN': 'PO Number', 'visible': false },
    ProductCode: { 'DN': 'FGex', 'visible': false },
    LOTNumber: { 'DN': 'Lot Number', 'visible': false },
    HalbCode: { 'DN': 'HALB Code', 'visible': false },
    LOTSize: { 'DN': 'Lot Size', 'visible': false },
    PlantCode: { 'DN': 'Plant Code', 'visible': false },
    PlantName: { 'DN': 'Plant Name', 'visible': false },

    ProductDescription: { 'DN': 'Product', 'visible': false },
    UpdateTimestamp: { 'DN': 'Update Timestamp', 'visible': true },
    createdAt: { 'DN': 'Created At', 'visible': true },
    updatedAt: { 'DN': 'Last Updated At', 'visible': false }

  }
  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }

  GetPOData() {

    this.poList = [];
    //this.manualentryservice.GetServerAPIPath().subscribe(serverdetails => {
      //this.manualentryservice.GetPOData(serverdetails['server']).subscribe((podata: any[]) => {
      this.manualentryservice.GetPOData().subscribe((podata: any[]) => {
        console.log(podata);
        for (let i = 0; i < podata.length; i++) {
          const c = podata[i];
          //console.log(c);
          const po_data =
          {
            isUsed: c.isUsed,
            current_status: c.current_status,
            postApiHitFrom: c.postApiHitFrom,
            _id: c._id,
            PONumber: c.PONumber,
            LOTNumber: c.LOTNumber,
            LOTSize: c.LOTSize,
            ProductCode: c.ProductCode,
            HalbCode: c.HalbCode,
            ProductDescription: c.ProductDescription,
            PlantCode: c.PlantCode,
            PlantName: c.PlantName,
            UpdateTimestamp: c.UpdateTimestamp,
            createdAt: c.createdAt,
            updatedAt: this.datePipe.transform(c.updatedAt, 'dd-MM-yyyy HH:mm')

          }
          this.poList.push(po_data);

        }
        console.log(this.poList);
        this.vdisplayedColumns = [];
        //console.log(this.poList[0]);
        if (Object.keys(podata).length > 0) {
          for (let i = 0; i < Object.keys(this.poList[0]).length; i++) {
            this.vdisplayedColumns.push(Object.keys(this.poList[0])[i]);
            //console.log("function");
          }
          this.vdisplayedColumns.push('star');
          this.gotData = true;
          this.dataSource = new MatTableDataSource(this.poList);
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
      //});
    });
  }
  ngOnInit() {
    this.GetPOData();
   
  }


  deleteRow(element) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DailogAddPODetails() {
    //console.log('add details');
    const dialogRef = this.dialog.open(PoDetailsDialogComponent, {
      width: '600px',
      height: '500px',
      data: {
        dataKey: {
          _id: this._id,
          Products: this.Products,
          filteredProducts: this.manualentryservice.filteredProducts,
          title: 'Add Details',
          button: 'Done'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.SubmitChanges(result);
      }
    });
  }

  DailogUpdatePODetails(element) {
    //console.log("fuction called");
    //console.log("this is updated: " + JSON.stringify(element));
    const dialogRef = this.dialog.open(PoDetailsDialogComponent, {
      width: '600px',
      height: '500px',
      data: {
        dataKey: {
          _id: this._id,
          Products: this.Products,
          filteredProducts: this.manualentryservice.filteredProducts,
          rowdata: element,
          title: 'Update Details',
          button: 'Update'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result !== undefined) {
        this.SubmitChanges(result);
      }

    });
  }

  SubmitChanges(result) {
    let combinedCode = result.ProductHALBCode;
    let SplitProductCode = combinedCode.split("|")[0].replace(/\s/g, "");
    let SplitHalbCode = combinedCode.split("|")[1].replace(/\s/g, "");
    console.log(combinedCode);
    console.log(SplitProductCode);
    console.log(SplitHalbCode);
    //PO Number Trimed
    let poNumber = (result.PONumber).replace(/\s+/g, '');
  //  this.manualentryservice.GetServerAPIPath().subscribe((apipath) => {
      //if (apipath['server'] !== undefined) {
        var T = {};
        T = {
          //isUsed: result.isUsed,
          //current_status: result.current_status,
          //postApiHitFrom: result.postApiHitFrom,
          _id: result._id,
          PONumber: poNumber,
          LOTNumber: result.LOTNumber,
          HalbCode: SplitHalbCode,
          LOTSize: result.LOTSize,
          PlantCode: result.PlantCode,
          PlantName: result.PlantName,
          ProductCode: SplitProductCode,
          ProductDescription: result.ProductDescription,
          UpdateTimestamp: moment(this.manualentryservice.ConvertToLocalTimezone(new Date())).format(
            'YYYY-MM-DDTHH:mm:ss'
          ),
          postApiHitFrom:"Manual Entry" 
          //createdAt: result.createdAt,
          //updatedAt: result.updatedAty
        };
        console.log(JSON.stringify(T));
        this.manualentryservice.PostPOData(T).subscribe(
          (data: any) => {
            console.log(data);
            this.GetPOData();
            this.openSnackBar(
              'Success',
              'Records Updated Successfully'
            );
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            if (error.status == 409) {
              this.openSnackBar('Validation', error.error);
            } else {
              //this.openSnackBar('Error', "Batch is Duplicate or Machine is powered OFF");
              this.openSnackBar('Error', error.error);
            }
          }
        );
      // }
   // });
  }

  GetFgexData() {
    this.Products = [];
   // this.manualentryservice.GetServerAPIPath().subscribe((apipath) => {
     // if (apipath['server'] !== undefined) {
        // this.manualentryservice.GetAllFgexList().subscribe((data: any[]) => {
          let data = this.manualentryservice.searchedFgexData;
          console.log(data, 'chernobyl')
            for (let i = 0; i < data.length; i++) {
              const c = data[i];
              //console.log(c);
              const Product_data = {
                ProductID: c._id,
                ProductCode: c.fgex + ' | ' + c.halb_code,
                ProductName: c.product_name
              };
              this.Products.push(Product_data);
            }
            //this.filterProduct.next(this.Products.slice());
            this.filteredProducts = this.Products.slice();
          // });
      //}
  //  });
  }

}
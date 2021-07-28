import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManualEntryService } from '../../manual-entry.service';


@Component({
  selector: 'app-po-details-dialog',
  templateUrl: './po-details-dialog.component.html',
  styleUrls: ['./po-details-dialog.component.scss']
})

export class PoDetailsDialogComponent implements OnInit {


  podetailsform: FormGroup;
  PONumber: FormControl;
  LOTNumber: FormControl;
  HalbCode: FormControl;
  LOTSize: FormControl;
  PlantCode: FormControl;
  PlantName: FormControl;
  ProductCode: FormControl;
  ProductHALBCode: FormControl;
  ProductDescription: FormControl;
  fgex: FormControl;
  Products;
  filteredProducts;
  title;
  button;
  _id;
  errorText;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PoDetailsDialogComponent>,
    private httpClient: HttpClient, private _snackBar: MatSnackBar, protected dataentryservice: ManualEntryService) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createPODetails() {
    this.fgex = new FormControl('', Validators.required);
    this.PONumber = new FormControl('', Validators.required);
    this.LOTNumber = new FormControl('', Validators.required);
    this.HalbCode = new FormControl('');
    this.LOTSize = new FormControl('', Validators.required);
    this.PlantCode = new FormControl('', Validators.required);
    this.PlantName = new FormControl('', Validators.required);
    this.ProductCode = new FormControl('');
    this.ProductDescription = new FormControl('', Validators.required);
    this.ProductHALBCode = new FormControl('-1', Validators.required);

  }

  createPoForm() {
    this.podetailsform = new FormGroup({
      fgex: this.fgex,
      PONumber: this.PONumber,
      LOTNumber: this.LOTNumber,
      HalbCode: this.HalbCode,
      LOTSize: this.LOTSize,
      PlantCode: this.PlantCode,
      PlantName: this.PlantName,
      ProductCode: this.ProductCode,
      ProductDescription: this.ProductDescription,
      ProductHALBCode: this.ProductHALBCode
    });
  }


  ngOnInit() {
    console.log(this.data);
    this.createPODetails();
    this.createPoForm();

    console.log(this.filteredProducts);
    if (this.data.dataKey.rowdata !== null) {
      if (this.data.dataKey.title === 'Add Details') {
        // console.log(this.data.dataKey.rowdata);
        this.title = this.data.dataKey.title;
        this.button = this.data.dataKey.button;
      } else {

        console.log(this.data.dataKey.rowdata);
        this.title = this.data.dataKey.title;
        this.button = this.data.dataKey.button;

        const c = this.data.dataKey.rowdata;
        console.log(c, "cccccccccc......");
        console.log(c.ProductCode + ' | ' + c.HalbCode);
        this.podetailsform.patchValue({

          PONumber: c.PONumber,
          LOTNumber: c.LOTNumber,
          fgex: c.ProductCode,
          //HalbCode: c.HalbCode,
          LOTSize: c.LOTSize,
          PlantCode: c.PlantCode,
          PlantName: c.PlantName,
          // ProductCode: c.ProductCode,
          ProductDescription: c.ProductDescription,
          ProductHALBCode: c.ProductCode + ' | ' + c.HalbCode,

        });
      }

    }
  }

  async filterFgexData(fgex) {
    // this.httpClient.get('/api/fgex?fgex=' + fgex).subscribe(res =>{
    // console.log(res, 'Chernobyl')
    // })
    if (fgex == null || fgex == undefined || fgex === "") {
      console.log(fgex);
      this.errorText = "Please fill the Fgex";

    } else {
      await this.dataentryservice.GetSearchedFgexList(fgex).then((res) => {
        // console.log(res, 'Chernobyl')
        this.Products = this.dataentryservice.Products;
        this.filteredProducts = this.dataentryservice.filteredProducts;
        console.log(this.filteredProducts, 'Chernobyl')

      })

    }
  }

  ProductChange($event) {
    console.log($event.value);
    try {
      let f = this.Products.find(i => i.ProductCode === $event.value).ProductName;
      console.log(f);
      this.podetailsform.patchValue({
        ProductDescription: f
      });
    }
    catch (error) {
      console.log(error);
    }
  }


  close() {
    this.dialogRef.close();
  }



}


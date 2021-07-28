import { Component, OnInit, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Line {
  lineid: string;
  linecode: string;
  linename: string,
}

export interface PlantData {
  companyname: string;
  countryname: string;
  statename: string;
  locationname: string;
  plantid: string;
  plantname: string;
  plantcode: string;
}

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})

export class LinesComponent implements OnInit {

  @Input() plantid: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public Linedata: Line[] = [];
  public PlantsData: PlantData[] = [];
  displayedColumns: string[] = [];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  //dataSource = [];
  dataSource: MatTableDataSource<Line>;

  displayedColumnsAs = {
    lineid: { 'DN': 'Line ID', 'visible': true },
    linecode: { 'DN': 'Line Code', 'visible': false },
    linename: { 'DN': 'Line Name', 'visible': false }
  }

  //---------------------------------------------------------LINE------------------------------------------------
  lineform: FormGroup;
  line_id: FormControl;
  line_code: FormControl;
  line_name: FormControl;
  plantSelect: FormControl;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createFormControlsLine() {
    this.line_id = new FormControl('');
    this.line_code = new FormControl('', Validators.required);
    this.line_name = new FormControl('', Validators.required);
    this.plantSelect = new FormControl('');
  }

  createLineForm() {
    this.lineform = new FormGroup({
      line_id: this.line_id,
      line_code: this.line_code,
      line_name: this.line_name,
      plantSelect: this.plantSelect
    });
  }
  ngOnInit() {
    this.createFormControlsLine();
    this.createLineForm();
    this.GetPlantData();
    console.log(this.plantid);
  }

  onFileInput() {
    console.log('file input');
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('on change', changes);
    console.log(changes.plantid.currentValue);
    if (changes.plantid.currentValue != "" && changes.plantid.currentValue != null) {
      this.GetLinedata(changes.plantid.currentValue);
    }
  }

  GetLinedata(plant) {
    console.log(plant.plantid);
    this.Linedata = [];
    this.httpClient.get('/api/manual/line/' + plant.plantid).subscribe(
      (data: any[]) => {
        this.vdisplayedColumns = [];
        for (let i = 0; i < data.length; i++) {
          const c = data[i];
          const line_data =
          {
            lineid: c._id,
            linecode: c.line_code,
            linename: c.line_name
          }
          this.Linedata.push(line_data);
        }
        if (Object.keys(data).length > 0) {
          for (let i = 0; i < Object.keys(this.Linedata[0]).length; i++) {
            //console.log(Object.keys(this.Equipments[0])[i]);
            this.vdisplayedColumns.push(Object.keys(this.Linedata[0])[i]);
          }
          this.vdisplayedColumns.push('star');
          //this.vdisplayedColumns.push('delete');
          this.gotData = true;
          this.dataSource = new MatTableDataSource(this.Linedata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.displayedColumns = this.vdisplayedColumns;
        }
      },
      (error: HttpErrorResponse) => {
        this.gotData = true;
        //this.dataSource = null;
        if (error.status == 409) {
          this.openSnackBar("Validation", error.error);
        }
        else if (error.status == 404) {
          this.dataSource = null;
        }
        else {
          this.openSnackBar("Error", error.error);
        }
      });
  }

  GetPlantData() {
    this.PlantsData = [];
    //this.Companies = [];

    this.httpClient.get('/api/manual/company').subscribe(
      (data: any[]) => {
        //this.companydata = data;
        for (let i = 0; i < data.length; i++) {
          const company = data[i]
          company.countries.forEach(country => {
            country.states.forEach(state => {
              state.locations.forEach(location => {
                location.plants.forEach(plant => {
                  //const data = {};
                  const ELEMENT_DATA =
                  {
                    companyname: company.company_name,
                    countryname: country.country_name,
                    statename: state.state_name,
                    locationname: location.location_name,
                    plantid: plant._id,
                    plantcode: plant.plant_code,
                    plantname: plant.plant_name
                  }
                  this.PlantsData.push(ELEMENT_DATA);
                });
              });
            });
          });
        }
        this.plantSelect.setValue(this.PlantsData[0]);
        this.GetLinedata(this.PlantsData[0]);
      })
  }

  reset()
  {
    this.line_code.setValue("");
    this.line_id.setValue("");
    this.line_name.setValue("");
  }

  postLineFormData() {
    console.log(this.lineform.value);
    //console.log(this.lineform.valid);

    console.log(this.lineform.value);
    const T = {
      _id: this.line_id.value,
      line_code: this.line_code.value,
      line_name: this.line_name.value,
      plant_id: this.plantSelect.value.plantid
    }
    console.log(T);
    this.httpClient.post('/api/manual/line', T).subscribe(
      (data: any[]) => {
        console.log(data);
        this.openSnackBar("Success", "Records has been added/updated successfully");
        this.GetLinedata(this.plantSelect.value);
        this.reset();
        //this.lineform.reset();
      },
      (error: HttpErrorResponse) => {
        this.gotData = true;
        console.log(error);
        if (error.status == 409) {
          //this.httpErrorService.onError(error);
          this.openSnackBar("Validation", error.message);

        }
        else if (error.status == 404) {
          this.dataSource = null;
        }
        else {
          this.openSnackBar("Error", error.error);
        }
      }
    );
  }
  updateRow(element) {
    console.log(element);
    this.lineform.patchValue({
      line_id: element.lineid,
      line_code: element.linecode,
      line_name: element.linename
    });
  }
  deleteRow(element) {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

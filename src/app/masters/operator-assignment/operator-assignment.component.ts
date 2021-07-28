import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import * as jspreadsheet from 'jspreadsheet-ce';
import { default as _rollupMoment, Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManualEntryService } from '../manual-entry.service';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM - YYYY',
  },
  display: {
    dateInput: 'MMM - YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Operator {
  id: string,
  name: string,
}

interface Shift {
  id: string,
  name: string,
}
interface shiftwiseoperator {
  date: string;
  OperatorIdShiftA: string;
  OperatorIdShiftB: string;
  OperatorIdShiftC: string;
}
@Component({
  selector: 'app-operator-assignment',
  templateUrl: './operator-assignment.component.html',
  styleUrls: ['./operator-assignment.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class OperatorAssignmentComponent implements OnInit {
  constructor(private httpClient: HttpClient, protected datePipe: DatePipe, private snackBar: MatSnackBar,public dataentryservice : ManualEntryService) { }

  @ViewChild('spreadsheet') spreadsheet: ElementRef;
  data: any;
  public Operators: Operator[] = [];
  public Shifts: Shift[] = [];
  public ShiftwiseOperatorData: shiftwiseoperator[] = [];
  operatorAssignmentForm: FormGroup;
  date = new FormControl(moment());
  table;
  dateList;
  gotData: boolean = false;
  shiftsOperatorData = [];

  createFormControls() {
    this.date = new FormControl('', Validators.required);
  }
  createFormGroups() {
    this.operatorAssignmentForm = new FormGroup({
      date: this.date,
    });
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = new FormControl(moment()).value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = new FormControl(moment()).value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.year(normalizedMonth.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  ngOnInit(): void {
    this.createFormGroups();
    this.createFormControls();
    this.BindDefaultFormField();
    this.GetShiftOperators();

  }

  BindDefaultFormField() {
    this.date.setValue(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
  }


  GetShiftOperators() {

    this.dataentryservice.GetOperatorDetails().subscribe((d: any) => {

      this.Operators = [];
      for (let i = 0; i <= d.length - 1; i++) {
        const c = d[i];
        const Operator_data =
        {
          id: c._id,
          name: c.operator_name,
        }
        this.Operators.push(Operator_data);
      }
      console.log(this.Operators, "Operators");
      this.BindShiftOperators();
    })
  }

  BindShiftOperators() {
    var SearchDate = this.datePipe.transform(this.date.value, 'yyyy-MM-dd');
    console.log(SearchDate);

    var D = this.getMonthDateRange(moment(this.date.value).format("YYYY"), moment(this.date.value).format("MM"));
    this.dateList = this.getDaysBetweenDates(D.start, D.end);
    console.log(D.start, "Start Date");
    console.log(D.end, "End Date");
    console.log(this.dateList);
    console.log('http://3.7.253.233:4000/api/multiline/operator?line_id=6076d65c4b1bc322740e238e&startdate=' + moment(D.start).format("yyyy-MM-DD") + '&endate=' + moment(D.end).format("yyyy-MM-DD"));
    this.dataentryservice.GetShiftOperators(moment(D.start).format("yyyy-MM-DD"),moment(D.end).format("yyyy-MM-DD")).subscribe((operatordata: any) => {
      if (operatordata == null) {
        this.DefaultOperatorDetails();
      }
      else {
        console.log(operatordata);

        console.log(this.dateList.length);
        this.ShiftwiseOperatorData = [];
        let data;
        for (let i = 0; i <= this.dateList.length - 1; i++) {
          var date1 = this.datePipe.transform(new Date(this.dateList[i]), 'yyyy-MM-dd');
          var filterOperatorDetail = operatordata.filter(function (el) { return moment(el.date).format('YYYY-MM-DD') === date1 });
          console.log(filterOperatorDetail);

          if (filterOperatorDetail.length == 0) {
            // console.log("in if");
            const data =
            {
              date: this.dateList[i],
              OperatorIdShiftA: null,
              OperatorIdShiftB: null,
              OperatorIdShiftC: null

            }
            this.ShiftwiseOperatorData.push(data);
          } else {
            //console.log("else part called");
            const data =
            {
              date: this.dateList[i],
              OperatorIdShiftA: filterOperatorDetail[0].OperatorIdShiftA,
              OperatorIdShiftB: filterOperatorDetail[0].OperatorIdShiftB,
              OperatorIdShiftC: filterOperatorDetail[0].OperatorIdShiftC,

            }
            this.ShiftwiseOperatorData.push(data);
          }
        }
        console.log(this.ShiftwiseOperatorData);
        this.jexcelGridView();
        this.gotData = true;

      }

    });

  }
  DefaultOperatorDetails() {
    this.ShiftwiseOperatorData = [];
    for (let i = 0; i <= this.dateList.length - 1; i++) {
      const c = this.dateList[i];
      console.log(c);

      const data =
      {
        date: this.dateList[i],
        OperatorIdShiftA: null,
        OperatorIdShiftB: null,
        OperatorIdShiftC: null,

      }
      this.ShiftwiseOperatorData.push(data);
    }
    console.log(this.ShiftwiseOperatorData);
    this.jexcelGridView();
    this.gotData = true;
  }


  jexcelGridView() {
    //jexcel(this.spreadsheet.nativeElement.innerHTML = '');
    document.getElementById('spreadsheet').innerHTML = '';
    this.table = jspreadsheet(document.getElementById('spreadsheet'), {
      data: this.ShiftwiseOperatorData,
      search: true,
      //pagination: 10,
      // paginationOptions: [10, 20,30],
      allowExport: true,
      tableHeight: '400px',
      defaultColWidth: 150,
      contextMenu: false,
      allowInsertRow: false,
      allowInsertColumn:false,
      button: true,
      rowResize: true,
      columnDrag: true,
      colHeaders: ['Date', 'Shift-A Operator', 'Shift-B Operator', 'Shift-C Operator'],
      columns: [
        { type: 'text', width: 200, readOnly: true },
        { type: 'dropdown', source: this.Operators, width: 250 },
        { type: 'dropdown', source: this.Operators, width: 250 },
        { type: 'dropdown', source: this.Operators, width: 250 },

      ],
      // insertRow:this.Addnewrow,


      onchange: this.onchange,
      // onafterchange:this.UT,
      // handler:this.handler,
      // onselection: this.selected,
      // updateTable:this.UT
    });
    // console.log(jexcel(this.spreadsheet.nativeElement.headers));
    // jexcel(this.spreadsheet.nativeElement.headers.style.backgroundColor ='red');
  }
  PostShiftwiseOperatorDetails() {
    //console.log(JSON.stringify(this.table.getData()));

    let shiftwiseOperators;
    shiftwiseOperators = this.table.getData();


    let date = shiftwiseOperators.map(function (x) {
      return x[0];
    });
    // console.log(date, "date");
    let shiftA_operator = shiftwiseOperators.map(function (x) {
      return x[1];
    });
    //console.log(shiftA_operator, "shiftA_operator");
    let shiftB_operator = shiftwiseOperators.map(function (x) {
      return x[2];
    });
    //console.log(shiftB_operator, "shiftB_operator");
    let shiftC_operator = shiftwiseOperators.map(function (x) {
      return x[3];
    });
    // console.log(shiftC_operator, "shiftC_operator");
    this.shiftsOperatorData = [];
    for (let i = 0; i <= shiftwiseOperators.length - 1; i++) {
      const T = {
        "date": date[i],
        "line_id": this.dataentryservice.lineId,
        "shift_wise": [
          {
            "shift_name": "Shift A",
            "operator_name": shiftA_operator[i]=== "" ? null : shiftA_operator[i]
          },
          {
            "shift_name": "Shift B",
            "operator_name": shiftB_operator[i]=== "" ? null : shiftB_operator[i]
          },
          {
            "shift_name": "Shift C",
            "operator_name": shiftC_operator[i]=== "" ? null : shiftC_operator[i],
          }
        ]
      }
      this.shiftsOperatorData.push(T);
    }
    // this.shiftsOperatorData = [
    //   {
    //     "date": "2021-04-10",
    //     "line_id": "6076d65c4b1bc322740e238e",
    //     "shift_wise": [
    //       {
    //         "shift_name": "Shift A",
    //         "operator_name": "6040a7f708aad8331bb871db"
    //       },
    //       {
    //         "shift_name": "Shift B",
    //         "operator_name": "6040a7f708aad8331bb871db"
    //       },
    //       {
    //         "shift_name": "Shift C",
    //         "operator_name": "6040a7f708aad8331bb871db"
    //       }
    //     ]
    //   },
    //   {
    //     "date": "2021-04-11",
    //     "line_id": "6076d65c4b1bc322740e238e",
    //     "shift_wise": [
    //       {
    //         "shift_name": "Shift A",
    //         "operator_name": "6040a7f708aad8331bb871db"
    //       },
    //       {
    //         "shift_name": "Shift B",
    //         "operator_name": "6040a7f708aad8331bb871db"
    //       },
    //       {
    //         "shift_name": "Shift C",
    //         "operator_name": "6040a7f708aad8331bb871db"
    //       }
    //     ],
    //   },
    // ]
   

    console.log(JSON.stringify(this.shiftsOperatorData), "this.shiftsOperatorData");
    //this.appService.getAPIConfiguration().subscribe(apiConfigs => {
    // if (apiConfigs.restAPI.host !== undefined) {
    this.dataentryservice.PostShiftOperators(this.shiftsOperatorData).subscribe(
      (data: any) => {
        console.log('data posted', data);
        this.BindShiftOperators();
        this.openSnackBar('Success', 'Data saved sucessfully');
      },
      (error: HttpErrorResponse) => {
        if (error.status == 409) {
          this.openSnackBar('Validation', error.error);
        }
        else {
          this.openSnackBar('Error', error.error);
        }
      }
    );
    // }
    // });
  }
  onchange(instance, cell, x, y, value, cellName) {
    console.log("onchange called");
    console.log(instance, "instance");
    console.log(cell, "cell");
    console.log(this.table);
    console.log(x, "column number");
    console.log(y, "row number");
    console.log(value, "value");
    console.log(cellName, "cellName");

    console.log('New change on cell ' + jspreadsheet.getColumnNameFromId([4, y]) + ' to: ' + value + '');
    // instance.td
    // instance.thead.firstElementChild.children[x].style.backgroundColor = "red";
  }

  getDaysBetweenDates(startDate, endDate) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return dates;
  };
  getMonthDateRange(year, month) {
    var moment = require('moment');

    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    var startDate = moment([year, month - 1]);

    // Clone the value before .endOf()
    var endDate = moment(startDate).endOf('month');

    // just for demonstration:
    console.log(startDate.toDate());
    console.log(endDate.toDate());

    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

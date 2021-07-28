import { LineViewService } from './../line-view/line-view.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManualEntryService {
  path;
  public Products;
  public filteredProducts;
  public searchedFgexData;
  public lineId;
  public gotFgexData = false;
  constructor(private httpClient: HttpClient, private lineViewService: LineViewService, private router: Router,) {
    this.path = this.getLineId();
    this.lineId = this.lineViewService.path2LineID(this.path);
    console.log(this.lineId, 'ghostly')

  }

  getLineId() {
    let exactLineRoute = '';
    const lineRoute = this.router.url.split('/');
    // console.log(lineRoute, lineRoute.length, "Novo")
    for (let i = 1; i < 6; i++) {
      exactLineRoute += '/' + lineRoute[i]

    }
    console.log(exactLineRoute, 'ghostly');
    return exactLineRoute;
  }

  // GetServerAPIPath(): Observable<object> {
  //   return this.httpClient.get('configs/apix/api_server.json');
  // }
  //Type could be : machinestate, shutdownloss, downtimloss.

  //GetSubstituteData(lineid, type, URL): Observable<object> {
  GetSubstituteData(type): Observable<object> {
    // console.log('https://int91mat11.smartfactoryworx.tech/' + '/api/type?type=' + type );
    return this.httpClient.get('/api/type?type=' + type)
  }

  GetLosscategory(lineid, URL): Observable<object> {
    return this.httpClient.get(URL + '/api/type?type=losscategory')
  }

  GetLossData(lineid, type, URL): Observable<object> {
    return this.httpClient.get(URL + '/api/loss?type=' + type)
  }

  GetUPDTDefintitionData(lineid, URL): Observable<object> {
    return this.httpClient.get(URL + '/api/updt')
  }

  PostSubstituteData(data, URL): Observable<object> {
    return this.httpClient.post(URL + '/api/type', data);
  }
  // GetEquipmentdata(lineid, URL, type): Observable<object> {
  GetEquipmentdata(type): Observable<object> {
    //http://3.7.253.233:4000/api/manual/equipmentNew?type=all
    console.log('/api/manual/equipmentNew?type=all');
    return this.httpClient.get('/api/manual/equipmentNew?type=all');
  }
  PostEquipmentdata(data): Observable<object> {
    console.log('/api/manual/equipment');
    return this.httpClient.post('/api/manual/equipment', data);
  }

  GetFaultCauseData(): Observable<object> {
    console.log('/api/manual/faultCause');
    return this.httpClient.get('/api/manual/faultCause');
  }

  PostFaultCauseData(data): Observable<object> {
    return this.httpClient.post('/api/manual/faultCause', data);
  }

  GetFaultCauseDataType(type): Observable<object> {
    console.log('/api/manual/faultCause?machine_state=' + type);
    return this.httpClient.get('/api/manual/faultCause?machine_state=' + type);
  }

  GetSkuDetails(lineid, URL): Observable<object> {
    return this.httpClient.get(URL + '/api/manual/sku')
  }

  GetOperatorDetails(): Observable<object> {
    return this.httpClient.get('/api/manual/getoperator?origin=all');
  }
  GetShiftOperators(startdate, endDate): Observable<object> {
    return this.httpClient.get('/api/multiline/operator?startdate=' + startdate + '&endate=' + endDate)
  }

  PostShiftOperators(data): Observable<object> {
    return this.httpClient.post('/api/manual/currentsku', data)
  }
  GetDatapattern(): Observable<object> {
    return this.httpClient.get('configs/apix/data_pattern.json');
  }

  GetMachineProperty(): Observable<object> {
    return this.httpClient.get('configs/apix/common_config.json');
  }

  //Get Manpower designation
  GetDesingationDetails(lineid, URL): Observable<object> {
    return this.httpClient.get(URL + '/api/type?type=manpowerdesignation');
  }

  GetCurrentBatchSKU(lineid, URL): Observable<object> {
    return this.httpClient.get(URL + '/api/manual/currentsku');
  }

  GetDatafromURL(URL): Observable<object> {
    return this.httpClient.get(URL);
  }
  //Get email template data from fake api
  GetEmailTemplateData(user, api, namespace, URL): Observable<object> {
    return this.httpClient.get(URL + 'services/' + user + '/' + api + '/' + namespace);
  }

  GetShifts(URL): Observable<object> {
    return this.httpClient.get(URL + '/api/manual/shift');
  }

  GetShiftDetails(URL, lineid): Observable<object> {
    return this.httpClient.get(URL + '/api/manual/shift');
  }

  GetStateCauseData(URL, shift, date, state): Observable<object> {
    return this.httpClient.get(URL + '/api/trend/state_wise_report?date=' + date + '&shift=' + shift + '&machine_state=' + state);
  }
  ConvertToLocalTimezone(inputdate) {
    return new Date(inputdate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  }

  GetRejectReworkDetails(URl, shiftdate, lineid, shiftname): Observable<object> {
    return this.httpClient.get(URl + '/api/rework?date=' + shiftdate + '&line_id=' + lineid + '&shift_name=' + shiftname);
  }

  PostRejectReworkData(URL, data): Observable<object> {
    return this.httpClient.post(URL + '/api/rework', data);
  }

  GetEventDataForChart(URL, date, shift, type): Observable<object> {
    console.log(URL + '/api/trend/shifthistory?date=' + date + '&shift=' + shift + '&type=' + type);
    return this.httpClient.get(URL + '/api/trend/shifthistory?date=' + date + '&shift=' + shift + '&type=' + type);
  }

  //GetOperatorData(URL): Observable<object> {
  GetOperatorData(): Observable<object> {
    return this.httpClient.get('/api/manual/getoperator?origin=all');
  }

  PostOperatorData(data): Observable<object> {
    return this.httpClient.post('/api/manual/postoperator', data);
  }

  GetPreviousShift(URL): Observable<object> {
    return this.httpClient.get(URL + '/api/shift/preshiftcalculation');
  }

  GetShiftEndReport(URL, LineID, shiftdate, shiftname): Observable<object> {
    //console.log(URL + '/api/report/shift?line_id=' + LineID + '&shift=' + shiftname + '&date=' + shiftdate);

    return this.httpClient.get(URL + '/api/report/shift?' + 'shift=' + shiftname + '&date=' + shiftdate);
  }
  GetFormatData(URL, LineID): Observable<object> {
    return this.httpClient.get(URL + '/api/manual/format');
  }

  PostFormatData(URL, data): Observable<object> {
    return this.httpClient.post('/api/manual/format?line_id=GetBindDataGetBindData', data);
  }

  GetFormatListfromProductID(URL, ProductID) {
    return this.httpClient.get(URL + '/api/manual/sku/' + ProductID);
  }

  GetBatchDetailsForReport(URL, LineID, BatchNo) {
    //console.log(URL + '/api/report/batch?line_id=' + LineID + '&batch=' + BatchNo);
    return this.httpClient.get(URL + '/api/report/batch?line_id=' + '&batch=' + BatchNo);
  }

  //Populating Batch Names for Dropdown

  GetBatchNames(URL, LineID) {
    return this.httpClient.get(URL + '/api/manual/batchtrigger');
  }

  //GetFgexData(URL): Observable<object> {
  GetFgexData(): Observable<object> {
    // console.log('https://int91mat11.smartfactoryworx.tech/' + '/api/fgex?fgex=all');
    return this.httpClient.get('/api/fgex?fgex=all');
  }


  PostFgexData(data): Observable<object> {
    return this.httpClient.post('/api/fgex', data);
  }

  //GetAllFgexList(URL): Observable<object> {
  GetAllFgexList(): Observable<object> {
    //console.log(URL+'/api/fgex?fgex=all');
    return this.httpClient.get('/api/fgex?fgex=all');
  }

 async GetSearchedFgexList(fgex) {
    //console.log(URL+'/api/fgex?fgex=' + fgex);
    return new Promise((resolve, reject) => {
      this.httpClient.get('/api/fgex?fgex=' + fgex).subscribe((res: any) => {
        console.log(res, 'chernobyl')
        this.searchedFgexData = res;
        this.Products = [];
        let data = res;
        // console.log(data, 'chernobyl')
        for (let i = 0; i < data.length; i++) {
          const c = data[i];
          const Product_data = {
            ProductID: c._id,
            ProductCode: c.fgex + ' | ' + c.halb_code + ' | ' + c.current_machine,
            ProductName: c.product_name
          };
          this.Products.push(Product_data);
        }
        this.filteredProducts = this.Products.slice();
        this.gotFgexData = true;
        resolve(this.searchedFgexData)
      })
      // console.log(this.searchedFgexData, 'chernobyl')
    })
  }

  //GetShiftPDTBreaks(): Observable<object> {
  GetShiftPDTBreaks(): Observable<object> {
    //console.log(URL+'/api/manual/pdt');
    return this.httpClient.get('/api/manual/pdt');
  }
  GetPOData(): Observable<object> {
    //console.log(URL+'/api/fgex?fgex=all');
    return this.httpClient.get('/api/sap?token=sfw0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8');
  }
  //Will GET changeover Type (TypeA, Type B, Type C etc.)
  GetChangeOverData(URL) {
    //console.log(URL + '/api/changeovermaster')
    return this.httpClient.get(URL + '/api/changeovermaster');
  }

  PostChangeoverData(URL, data) {
    //console.log(URL + '/api/changeover', data);
    return this.httpClient.post(URL + '/api/changeover', data);
  }

  GetChangeoverCurrent(URL) {
    //console.log(URL + '/api/changeover/current');
    return this.httpClient.get(URL + '/api/changeover/current');
  }
  BindChangeOverData(URL) {
    //console.log(URL + '/api/sku?line_id=' + LineID);
    return this.httpClient.get(URL + '/api/sku');
  }
  PostPOData(data) {
    //console.log()
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth-token': 'sfw0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8'
    });
    let options = { headers: headers };
    console.log(options);
    //console.log(URL + '/api/sap?token=sfw0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8', data);
    //return this.httpClient.post(URL + '/api/sap', data, options);
    return this.httpClient.post('/api/sap/batch', data, options)
  }

}


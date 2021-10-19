import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public parseParamsFromOptions = (loadOptions: any, otherMap?: Map<string, any>): HttpParams => {
    let params: HttpParams = new HttpParams();
    [
      "skip",
      "take",
      "requireTotalCount",
      "requireGroupCount",
      "sort",
      "filter",
      "totalSummary",
      "group",
      "groupSummary"
    ].forEach((i) => {
      if (i in loadOptions && this.isNotEmpty(loadOptions[i]))
        params = params.set(i, JSON.stringify(loadOptions[i]));
    });

    if (this.isNotEmpty(otherMap)) {
      otherMap?.forEach((val, key) => {
        if (this.isNotEmpty(val)) {
          params = params.set(key, JSON.stringify(val));
        }
      });
    }

    return params;
  }

  isNotEmpty = (value: any) => {
    return value !== undefined && value !== null && value !== "";
  }

  formatToSimpleDate(date: Date): string {
    console.log('format', date);
    if (typeof date.getMonth === 'function') {
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
    }

    return "";
  }
}

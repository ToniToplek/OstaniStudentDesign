import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StayStudentService{
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  //Korisnici
  public getUsersList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Korisnici/getallusers`).toPromise();
  }


  //Predmeti
  public getPredmetsList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Predmeti/getallpredmets`).toPromise();
  }


  //Moduli
  public getModulsList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Moduli/getallmoduls`).toPromise();
  }


  //Sifrarnik
  public getSifrarnikList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Sifrarnik/getallsifrarniks`).toPromise();
  }


  //Uloge
  public getUlogeList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Uloge/getallulogas`).toPromise();
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Korisnici } from '../models/korisnici.model';
import { Moduli } from '../models/moduli.model';
import { Predmeti } from '../models/predmeti.model';
import { Sifrarnik } from '../models/sifrarnik.model';
import { Uloge } from '../models/uloge.model';
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

  public getUserDataById = (bulkId: string, id: number): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Korisnici/getuserbyid/${id}`).toPromise();
  }

  public addUser = (korisnik: Korisnici): Promise<any> => {
    korisnik.bulkId = null;
    return this.httpClient.post(`${this.apiBaseUrl}api/Korisnici/adduser`, korisnik).toPromise();
  }

  public updateUser = (korisnik: Korisnici): Promise<any> => {
    return this.httpClient.put(`${this.apiBaseUrl}api/Korisnici/updateuser`, korisnik).toPromise();
  }

  public deleteUser = (id: number): Promise<any> => {
    return this.httpClient.delete(`${this.apiBaseUrl}api/Korisnici/deleteuserbyid/${id}`).toPromise();
  }

  //Predmeti
  public getPredmetsList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Predmeti/getallpredmets`).toPromise();
  }

  public addSubject = (predmet: Predmeti): Promise<any> => {
    return this.httpClient.post(`${this.apiBaseUrl}api/Predmeti/addpredmet`, predmet).toPromise();
  }

  public updateSubject = (predmet: Predmeti): Promise<any> => {
    return this.httpClient.put(`${this.apiBaseUrl}api/Predmeti/updatepredmet`, predmet).toPromise();
  }

  public deleteSubject = (id: number): Promise<any> => {
    return this.httpClient.delete(`${this.apiBaseUrl}api/Predmeti/deletepredmet/${id}`).toPromise();
  }


  //Moduli
  public getModulsList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Moduli/getallmoduls`).toPromise();
  }
  
  public addModul = (modul: Moduli): Promise<any> => {
    return this.httpClient.post(`${this.apiBaseUrl}api/Moduli/addmodul`, modul).toPromise();
  }

  public updateModul = (modul: Moduli): Promise<any> => {
    return this.httpClient.put(`${this.apiBaseUrl}api/Moduli/updatemodul`, modul).toPromise();
  }

  public deleteModul= (id: number): Promise<any> => {
    return this.httpClient.delete(`${this.apiBaseUrl}api/Moduli/deletemodul/${id}`).toPromise();
  }


  //Sifrarnik
  public getSifrarnikList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Sifrarnik/getallsifrarniks`).toPromise();
  }

  public addSifrarnikItem = (item: Sifrarnik): Promise<any> => {
    return this.httpClient.post(`${this.apiBaseUrl}api/Sifrarnik/addsifrarnik`, item).toPromise();
  }

  public updateSifrarnikItem = (item: Sifrarnik): Promise<any> => {
    return this.httpClient.put(`${this.apiBaseUrl}api/Sifrarnik/updatesifrarnik`, item).toPromise();
  }

  public deleteSifrarnikItem = (id: number): Promise<any> => {
    return this.httpClient.delete(`${this.apiBaseUrl}api/Sifrarnik/deletesifrarnik/${id}`).toPromise();
  }

  //Uloge
  public getRoleList = (bulkId: string): Promise<any> => {
    return this.httpClient.get(`${this.apiBaseUrl}api/Uloge/getallulogas`).toPromise();
  }

  public addRole = (item: Uloge): Promise<any> => {
    return this.httpClient.post(`${this.apiBaseUrl}api/Uloge/adduloga`, item).toPromise();
  }

  public updateRole = (item: Uloge): Promise<any> => {
    return this.httpClient.put(`${this.apiBaseUrl}api/Uloge/updateuloga`, item).toPromise();
  }

  public deleteRole = (id: number): Promise<any> => {
    return this.httpClient.delete(`${this.apiBaseUrl}api/Uloge/deleteuloga/${id}`).toPromise();
  }

}

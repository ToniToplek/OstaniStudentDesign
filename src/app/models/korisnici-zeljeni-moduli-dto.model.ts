export class KorisniciZeljeniModuliDto {
    public idKorisnik: number;
    public ime: string;
    public prezime: string;
    public prviIzbor: string;
    public drugiIzbor: string;
    public prviIzborModulId: number;
    public drugiIzborModulId: number;

    constructor(idKorisnik : number = 0,  ime : string = '',  prezime : string = '',  prviIzbor : string = '',  drugiIzbor : string = '', prviIzborModulId : number = 0, drugiIzborModulId : number = 0) {  
        this.idKorisnik = idKorisnik;
        this.ime = ime;
        this.prezime = prezime;
        this.prviIzbor = prviIzbor;
        this.drugiIzbor = drugiIzbor;
        this.prviIzborModulId = prviIzborModulId;
        this.drugiIzborModulId = drugiIzborModulId;
    }
}


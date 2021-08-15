export class KorisniciUloge {
    public id: number;
    public idKorisnik: number;
    public idUsluge: number;

    constructor(id : number = 0,  idKorisnik : number = 0,  idUsluge : number = 0) {  
        this.id = id;
        this.idKorisnik = idKorisnik;
        this.idUsluge = idUsluge;
    }
}
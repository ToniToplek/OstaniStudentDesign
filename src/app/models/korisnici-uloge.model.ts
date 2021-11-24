export class KorisniciUloge {
    public id: number;
    public idKorisnik: number;
    public idUloge: number;

    constructor(id : number = 0,  idKorisnik : number = 0,  idUloge : number = 0) {  
        this.id = id;
        this.idKorisnik = idKorisnik;
        this.idUloge = idUloge;
    }
}
export class KorisniciPredmeti {
    public id: number;
    public idKorisnik: number;
    public idPredmet: number;
    public rang: number;
    public brojIzbora: number;

    constructor(id : number = 0,  idKorisnik : number = 0,  idPredmet : number = 0,  rang : number = 0,  brojIzbora : number = 0) {  
        this.id = id;
        this.idKorisnik = idKorisnik;
        this.idPredmet = idPredmet;
        this.rang = rang;
        this.brojIzbora = brojIzbora;
    }
}
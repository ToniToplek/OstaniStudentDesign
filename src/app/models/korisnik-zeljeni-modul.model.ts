export class KorisnikZeljeniModul{
    public id: number;
    public idKorisnik: number;
    public idModul: number;
    public rang: number;

    constructor(id : number = 0, idKorisnik : number = 0, idModul : number = 0, rang : number = 0) {  
        this.id = id;
        this.idKorisnik = idKorisnik;
        this.idModul = idModul;
        this.rang = rang;
    }
}
export class KorisnikZeljeniModul{
    public id: number;
    public idKorisnik: number;
    public idModul: number;
    public rank: number;

    constructor(id : number = 0, idKorisnik : number = 0, idModul : number = 0, rank : number = 0) {  
        this.id = id;
        this.idKorisnik = idKorisnik;
        this.idModul = idModul;
        this.rank = rank;
    }
}
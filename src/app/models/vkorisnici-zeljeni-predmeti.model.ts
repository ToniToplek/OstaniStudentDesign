export class VKorisniciZeljeniPredmeti {
    public id: number;
    public ime: string;
    public prezime: string;
    public korisnikId: number;
    public predmetId: number;
    public rang: number;
    public brojIzbora: number;
    public modulId: number;
    public sifrarnikId: number;
    public naziv: string;
    public jeZimski: boolean;
    public kapacitet: number;
    public modul: string;
    public kratica: string;

    constructor(id : number = 0,  ime : string = '',  prezime : string = '',  email : string = '',  korisnikId : number = 0, predmetId: number = 0, rang: number = 0, brojIzbora: number = 0, modulId: number = 0, sifrarnikId: number = 0, naziv: string = '', jeZimski: boolean = false, kapacitet: number = 0, modul: string = '', kratica: string = '') {  
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.korisnikId = korisnikId;
        this.predmetId = predmetId;
        this.rang = rang;
        this.brojIzbora = brojIzbora;
        this.modulId = modulId;
        this.sifrarnikId = sifrarnikId;
        this.naziv = naziv;
        this.jeZimski = jeZimski;
        this.kapacitet = kapacitet;
        this.modul = modul;
        this.kratica = kratica;
    }
}
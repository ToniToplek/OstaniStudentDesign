export class Predmeti{
    public id: number;
    public naziv: string;
    public kapacitet: number;
    public idModul: number;
    public idSifrarnik: number;

    constructor(id : number = 0, naziv : string = '', kapacitet : number = 0, idModul : number = 0, idSifrarnik : number = 0,) {  
        this.id = id;
        this.naziv = naziv;
        this.kapacitet = kapacitet;
        this.idModul = idModul;
        this.idSifrarnik = idSifrarnik;
    }
}
export class Sifrarnik{
    public id: number;
    public naziv: string;
    public zahtijevaModul: boolean


    constructor(id : number = 0, naziv : string = '', zahtijevaModul: boolean = false) {  
        this.id = id;
        this.naziv = naziv;
        this.zahtijevaModul = zahtijevaModul;
    }
}
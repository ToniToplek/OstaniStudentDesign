export class Moduli{
    public id: number;
    public naziv: string;
    public kratica: string;


    constructor(id : number = 0, naziv : string = '', kratica : string = '') {  
        this.id = id;
        this.naziv = naziv;
        this.kratica = kratica;
    }
}
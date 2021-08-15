export class Korisnici{
    public id: number;
    public ime: string;
    public prezime: string;
    public email: string;
    public jmbag: string;
    public bulkId: string;


    constructor(id : number = 0,  ime : string = '',  prezime : string = '',  email : string = '',  jmbag : string = '', bulkId : string = '') {  
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.jmbag = jmbag;
        this.bulkId = bulkId;
    }
}
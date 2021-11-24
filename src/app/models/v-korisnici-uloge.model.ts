export class VKorisniciUloge {
    public id: number;
    public ime: string;
    public prezime: string;
    public email: string;
    public jmbag: string;
    public korisnikId: number;
    public naziv: string;
    public ulogaId: number;
    public korisniciUlogeId: number;

    constructor(id : number = 0,  ime : string = '',  prezime : string = '',  email : string = '',  jmbag : string = '', korisnikId: number = 0, naziv: string = '', ulogaId: number = 0, korisniciUlogeId: number = 0) {  
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.jmbag = jmbag;
        this.korisnikId = korisnikId;
        this.naziv = naziv;
        this.ulogaId = ulogaId;
        this.korisniciUlogeId = korisniciUlogeId;
    }

}

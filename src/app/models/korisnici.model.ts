import { KorisniciPredmeti } from "./korisnici-predmeti.model";
import { KorisniciUloge } from "./korisnici-uloge.model";
import { KorisnikZeljeniModul } from "./korisnik-zeljeni-modul.model";

export class Korisnici{
    public id: number;
    public ime: string;
    public prezime: string;
    public email: string;
    public jmbag: string;
    public bulkId: string;
    public korisniciPredmetis: KorisniciPredmeti[];
    public korisniciUloges: KorisniciUloge[];
    public korisnikZeljeniModuls: KorisnikZeljeniModul[];

    constructor(id : number = 0,  ime : string = '',  prezime : string = '',  email : string = '',  jmbag : string = '', bulkId : string = '', korisniciPredmetis: KorisniciPredmeti[] = null, korisniciUloges: KorisniciUloge[] = null, korisnikZeljeniModuls: KorisnikZeljeniModul[] = null) {  
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.jmbag = jmbag;
        this.bulkId = bulkId;
        this.korisniciPredmetis = korisniciPredmetis;
        this.korisniciUloges = korisniciUloges;
        this.korisnikZeljeniModuls = korisnikZeljeniModuls;
    }
}
export class OstaniStudentDto {
    public IdKorisnik: number;
    public IdPredmet: number;
    public IdModul: number;
    public Rang: number;
    public BrojIzbora: number;


    constructor(IdKorisnik : number = 0, IdPredmet : number = 0, IdModul : number = 0, Rang : number = 0, BrojIzbora : number = 0, ) {  
        this.IdKorisnik = IdKorisnik;
        this.IdPredmet = IdPredmet;
        this.IdModul = IdModul;
        this.Rang = Rang;
        this.BrojIzbora = BrojIzbora;
    }
}

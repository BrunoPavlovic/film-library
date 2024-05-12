export interface KorisnikI {
    ime: String,
    prezime: String,
    lozinka:  String,
    email: String,
    korime: String,
    datum_rođenja: Date
}

export interface PrijavaI{
    korime: String,
    lozinka : String
}
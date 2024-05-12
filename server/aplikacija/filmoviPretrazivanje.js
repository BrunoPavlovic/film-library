const konst = require("../konstante.js");
const portRest = 12233;
const url = "http://localhost:" + portRest + "/api";
const kodovi = require("./moduli/kodovi.js")
class FilmoviZanroviPretrazivanje {

    async dohvatiFilmove(stranica, kljucnaRijec = "") {
        let putanja = url + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec
        console.log(putanja)
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi)
        return filmovi;
    }

    async dohvatiSveZanrove() {
        let odgovor = await fetch(url + "/zanr");
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }

    async dohvatiNasumceFilm(zanr) {
        let odgovor = await fetch(url + "/tmdb/filmovi?stranica=1&kljucnaRijec=");
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        let rez = [filmovi.results[kodovi.dajNasumceBroj(0,20)],filmovi.results[kodovi.dajNasumceBroj(0,20)]];
        return rez;
    }
}



module.exports = FilmoviZanroviPretrazivanje;
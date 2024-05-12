const ds = require("fs/promises");

class Konfiguracija {
    constructor() {
        this.konf = {}
    }

    dajKonf() {
        return this.konf;
    }

    async ucitajKonfiguraciju() {
        var podaci = await ds.readFile(process.argv[2], "UTF-8");
        this.konf = pretvoriJSONkonfig(podaci);
        console.log(this.konf);
    }

    dohvatiPortRest(podaci) {
        var nizPodataka = podaci.split("\n");
        for (let podatak of nizPodataka) {
            var podatakNiz = podatak.split("=");
            var naziv = podatakNiz[0];
            var vrijednost = podatakNiz[1];
            if(naziv=="rest.port"){
                return vrijednost;
            }
        }
    }

    dohvatiPortApp(podaci) {
        var nizPodataka = podaci.split("\n");
        for (let podatak of nizPodataka) {
            var podatakNiz = podatak.split("=");
            var naziv = podatakNiz[0];
            var vrijednost = podatakNiz[1];
            if(naziv=="app.port"){
                return vrijednost;
            }
        }
    }
}



function pretvoriJSONkonfig(podaci) {
    console.log(podaci);
    let konf = {};
    var a = 0, b = 0, c = 0, d = 0, e = 0;
    var regKorime = new RegExp(/(?=.+[0-9].+[0-9])(?=.+[a-zA-Z].+[a-zA-Z]).{15,20}/);
    var regLozinka = new RegExp(/(?=.+[0-9].+[0-9].+[0-9])(?=.+[a-zA-Z].+[a-zA-Z].+[a-zA-Z])(?=.+[^A-z0-9].+[^A-z0-9].+[^A-z0-9]).{20,100}/);
    var nizPodataka = podaci.split("\n");
    for (let podatak of nizPodataka) {
        var podatakNiz = podatak.split("=");
        var naziv = podatakNiz[0];
        var vrijednost = podatakNiz[1];
        if (naziv == "rest.korime") {
            a++;
            if (regKorime.test(vrijednost) == false) {
                throw new Error("Korisničko ime ne ispunjava uvjete!");
            }
        }

        if (naziv == "rest.lozinka") {
            b++;
            if (regLozinka.test(vrijednost) == false) {
                throw new Error("Lozinka ne ispunjava uvjete!");
            }
        }

        if (naziv == "tmdb.apikey.v3") c++;

        if (naziv == "tmdb.apikey.v4") d++;

        if (naziv == "app.broj.stranica") {
            e++;
            var vrijednost2 = parseInt(vrijednost);
            if (vrijednost2 < 5 || vrijednost2 > 100) {
                throw new Error("Vrijednost app.broj.stranica nije između 5 i 100");
            }
        }
        konf[naziv] = vrijednost;
    }
    if (a == 0) {
        throw new Error("Korisničko ime ne postoji!");
    }
    if (b == 0) {
        throw new Error("Lozinka ne postoji!");
    }
    if (e == 0) {
        throw new Error("app.broj.stranica ne postoji!");
    }
    if (c == 0) {
        throw new Error("Tmdb apikey v3 ne postoji!");
    }
    if (d == 0) {
        throw new Error("Tmdb apikey v4 ne postoji!");
    }
    return konf;
}

module.exports = Konfiguracija;
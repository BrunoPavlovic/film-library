const konst = require("../konstante.js");
const mail = require("./moduli/mail.js")
const kodovi = require("./moduli/kodovi.js")
const portRest = 12233;
const totp = require("./moduli/totp.js");

class Autentifikacija {
    async dodajKorisnika(korisnik) {
        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "moja sol"),
            email: korisnik.email,
            korime: korisnik.korime,
            datum_rođenja: korisnik.datum_rođenja
        };

        let aktivacijskiKod = kodovi.dajNasumceBroj(10000, 99999);
        tijelo["aktivacijskiKod"] = aktivacijskiKod;
        let TOTP = totp.kreirajTajniKljuc(korisnik.korime);
        //tijelo["TOTP"] = TOTP;

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici", parametri)

        if (odgovor.status == 200) {
            console.log("Korisnik ubačen na servisu");
            /*let mailPoruka = "aktivacijski kod:" + aktivacijskiKod
                + " http://localhost:12144/aktivacijaRacuna?korime=" + korisnik.korime + "&kod=" + aktivacijskiKod
            mailPoruka += " TOTP Kljuc: " + TOTP;
            let poruka = await mail.posaljiMail("bpavlovic20@foi.hr", korisnik.email,
                "Aktivacijski kod", mailPoruka);*/
            return true;
        } else {
            console.log(odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }

    async aktivirajKorisnickiRacun(korime, kod) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ aktivacijskiKod: kod }),
            headers: zaglavlje
        }

        return await fetch("http://localhost:" + portRest + "/api/korisnici/" + korime + "/aktivacija", parametri)
    }

    async prijaviKorisnika(korime, lozinka) {
        lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
        let tijelo = {
            lozinka: lozinka,
        };
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici/" + korime + "/prijava", parametri)

        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }

    async dohvatiKorisnika(){
        let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici/");
        let podaci = await odgovor.text();
        podaci = JSON.parse(podaci);
        console.log(podaci);
        for(let p of podaci){
            if(p.prijava == "da"){
                let odgovor2 = await fetch("http://localhost:"+portRest+"/api/korisnici/"+p.korime);
                let podaci2 = await odgovor2.text();
                podaci2 = JSON.parse(podaci2);
                return podaci2;
            }
        }
        console.log("Nema prijavljenih korisnika");
        return false;
    }

    async odjaviKorisnika(){
        let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici/");
        let podaci = await odgovor.text();
        podaci = JSON.parse(podaci);
        console.log(podaci);
        for(let p of podaci){
            if(p.prijava == "da"){
                let parametri = {
                    method: 'PUT',
                    body: JSON.stringify(p)
                }
                let odgovor2 = await fetch("http://localhost:"+portRest+"/api/korisnici/"+p.korime+"/odjava",parametri);
                let podaci2 = await odgovor2.text();
                podaci2 = JSON.parse(podaci2);
                console.log(podaci2);
                return podaci2;
            }
        }
        console.log("Nema prijavljenih korisnika");
        return false;
    }

}

module.exports = Autentifikacija;
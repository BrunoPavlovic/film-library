const FilmoviPretrazivanje = require("./filmoviPretrazivanje.js");
const jwt = require("./moduli/jwt.js")
const Autentifikacija = require("./autentifikacija.js")
let auth = new Autentifikacija();
let fp = new FilmoviPretrazivanje();

exports.aktvacijaRacuna = async function (zahtjev, odgovor) {
    console.log(zahtjev.query);
    let korime = zahtjev.query.korime;
    let kod = zahtjev.query.kod;
  
    let poruka = await auth.aktivirajKorisnickiRacun(korime, kod);
    console.log(poruka)

    if (poruka.status == 200) {
        odgovor.send(await poruka.text());
    } else {
        odgovor.send(await poruka.text());
    }
}


exports.registracija = async function (zahtjev, odgovor) {
    console.log(zahtjev.body)
    let greska = "";
    let uspjeh = await auth.dodajKorisnika(zahtjev.body);
    if (uspjeh) {
            console.log("Uspješno dodan korisnik!");
            odgovor.redirect("/prijava");
            return;
    } else {
            return greska = "Dodavanje nije uspjelo provjerite podatke!";
    }
}

exports.prijava = async function (zahtjev, odgovor) {
    if (zahtjev.method == "POST") {
        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;
        var korisnik = await auth.prijaviKorisnika(korime, lozinka);
        var proba=JSON.parse(korisnik);
        if(proba.aktivan=="da"){
                    console.log("Uspješna prijava");
                    zahtjev.session.jwt = jwt.kreirajToken(korisnik)
                    zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
                    zahtjev.session.korime = korisnik.korime;
                    odgovor.redirect("*");
                    return true;
        }
        else {
                console.log("Neuspješna prijava!");
                return false;
        }
    }
}

exports.dohvatiKorisnika = async function (zahtjev,odgovor){
    odgovor.json(await auth.dohvatiKorisnika());
}

exports.odjaviKorisnika = async function (zahtjev,odgovor){
    odgovor.json(await auth.odjaviKorisnika());
}


exports.dajSveZanrove = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiSveZanrove());
}
exports.dajDvaFilma = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiNasumceFilm(zahtjev.query.zanr))
}

exports.getJWT = async function (zahtjev, odgovor) {
    odgovor.type('json')
    if (zahtjev.session.jwt != null) {
        let k = { korime: jwt.dajTijelo(zahtjev.session.jwt).korime };
        let noviToken = jwt.kreirajToken(k)
        odgovor.send({ ok: noviToken });
        return
    } 
    odgovor.status(401);
    odgovor.send({ greska: "nemam token!" });
}

exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
        if (!jwt.provjeriToken(zahtjev)) {
            odgovor.status(401);
            odgovor.json({ greska: "neaoutorizirani pristup" });
        } else {
            let str = zahtjev.query.str;
            let filter = zahtjev.query.filter;
            console.log(zahtjev.query)
            odgovor.json(await fp.dohvatiFilmove(str,filter))
        }
}

exports.dodajFilm = async function (zahtjev, odgovor) {
    console.log(zahtjev.body);
    if (!jwt.provjeriToken(zahtjev)) {
        odgovor.status(401);
        odgovor.json({ greska: "neaoutorizirani pristup" });
     } else {
        odgovor.json({ok: "OK"});
     }
}

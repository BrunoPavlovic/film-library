const konst = require("../konstante.js");
const express = require(konst.dirModula +'express');
const Konfiguracija = require("../konfiguracija");
const restKorisnici = require("./restKorisnik.js")
const RestTMDB = require("./restTMDB");
const restFilm = require("./restFilm.js");
const restŽanr = require("./restŽanr.js");
const ds = require("fs/promises");
const cors = require(konst.dirModula+'cors');

var port;
const server = express();


let konf = new Konfiguracija();

konf.ucitajKonfiguraciju().then(pripremiPort).then(pokreniServer).catch((greska) => {
    if (process.argv.length == 2)
        console.error("Potrebno je unjeti naziv datoteke!");
    else
        console.error(greska);
    process.exit()
});


function pokreniServer() {
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());

    pripremiPutanjeKorisnikAktivacija();
    pripremiPutanjeKorisnik();
    pripremiPutanjeFilm();
    pripremiPutanjeŽanr();
    pripremiPutanjeTMDB();

    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        let poruka = { greska: "nema resursa" }
        odgovor.json(poruka);
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}



function pripremiPutanjeKorisnik(){
    server.get("/api/korisnici",restKorisnici.getKorisnici);
    server.post("/api/korisnici",restKorisnici.postKorisnici);
    server.put("/api/korisnici",restKorisnici.putKorisnici);
    server.put("/api/korisnici",restKorisnici.deleteKorisnici);

    server.get("/api/korisnici/:korime",restKorisnici.getKorisnik);
    server.post("/api/korisnici/:korime",restKorisnici.postKorisnik);
    server.put("/api/korisnici/:korime",restKorisnici.putKorisnik);
    server.delete("/api/korisnici/:korime",restKorisnici.deleteKorisnik);

    server.get("/api/korisnici/:korime/prijava",restKorisnici.getKorisnikAktivacija);
    server.post("/api/korisnici/:korime/prijava",restKorisnici.getKorisnikPrijava);
    server.put("/api/korisnici/:korime/prijava",restKorisnici.putKorisnici);
    server.delete("/api/korisnici/:korime/prijava",restKorisnici.deleteKorisnik);

    server.put("/api/korisnici/:korime/odjava",restKorisnici.putKorisnikOdjava);
}

function pripremiPutanjeKorisnikAktivacija(){
    server.get("/api/korisnici/:korime/aktivacija",restKorisnici.getKorisnikAktivacija);
    server.post("/api/korisnici/:korime/aktivacija",restKorisnici.postKorisnik);
    server.put("/api/korisnici/:korime/aktivacija",restKorisnici.putKorisnikAktivacija);
    server.delete("/api/korisnici/:korime/aktivacija",restKorisnici.deleteKorisnik);
}

function pripremiPutanjeFilm(){

    server.get("/api/filmovi/:id",restFilm.getFilm);
    server.post("/api/filmovi/:id",restFilm.postFilm);
    server.put("/api/filmovi/:id",restFilm.putFilm);
    server.delete("/api/filmovi/:id",restFilm.deleteFilm);

    server.get("/api/filmovi",restFilm.getFilmovi);
    server.post("/api/filmovi",restFilm.postFilmovi);
}

function pripremiPutanjeŽanr(){

    server.get("/api/zanr",restŽanr.getŽanrovi);
    server.post("/api/zanr",restŽanr.postŽanrovi);
    server.put("/api/zanr",restŽanr.putŽanrovi);
    server.delete("/api/zanr",restŽanr.deleteŽanrovi);

    server.get("/api/zanr/:id",restŽanr.getŽanr);
    server.post("/api/zanr/:id",restŽanr.postŽanr);
    server.put("/api/zanr/:id",restŽanr.putŽanr);
    server.delete("/api/zanr/:id",restŽanr.deleteŽanr);

}

function pripremiPutanjeTMDB() {
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    server.get("/api/tmdb/zanr",restTMDB.getZanr.bind(restTMDB));
    server.get("/api/tmdb/filmovi",restTMDB.getFilmovi.bind(restTMDB));
}

async function pripremiPort(){
    var podaci = await ds.readFile(process.argv[2], "UTF-8");
    port = konf.dohvatiPortRest(podaci);
}

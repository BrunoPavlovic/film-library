const konst= require("../konstante.js");
const ds = require("fs/promises");
const express = require(konst.dirModula + 'express');
const sesija = require(konst.dirModula+'express-session')
const kolacici = require(konst.dirModula+'cookie-parser')
const Konfiguracija = require("../konfiguracija");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");
const path = require('path');
const cors = require(konst.dirModula+'cors');



var port;
const server = express();

function pokreniServer() {

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());
    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: {  maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));

    pripremiPutanjuAngular();
    server.use("/",express.static(__dirname + '/angular/dist/zadaca_02'));

    pripremiPutanjePocetna();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();

    
    console.log(__dirname);
    server.use("/js", express.static(__dirname + "/js"));
    server.use("/dokumentacija", express.static(__dirname + "/dokumentacija"));
    server.use("/slike",express.static(__dirname + "/../slike"));

    server.use((zahtjev, odgovor) => {
        if (odgovor.status == 400) {
            console.log("Neispravan zahtjev (error:400)!");
            process.exit();
        }
        else if(odgovor.status==200){
            console.log(konf.dajKonf());
            odgovor.send(JSON.stringify(poruka));
        }
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pripremiPort).then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error(greska);
    process.exit()
});

function pripremiPutanjePocetna() {
    //server.get("/", htmlUpravitelj.pocetna);
    //server.get("/dokumentacija",htmlUpravitelj.dokumentacija);
    server.get('/dajSveZanrove', fetchUpravitelj.dajSveZanrove);
    server.get('/dajDvaFilma', fetchUpravitelj.dajDvaFilma);
}

function pripremiPutanjePretrazivanjeFilmova() {
    //server.get('/filmoviPretrazivanje', htmlUpravitelj.filmoviPretrazivanje);
    //server.post('/filmoviPretrazivanje', fetchUpravitelj.filmoviPretrazivanje);
    server.post('/dodajFilm', fetchUpravitelj.dodajFilm);
}

function pripremiPutanjeAutentifikacija() {
    //server.get("/registracija", htmlUpravitelj.registracija);
    //server.post("/registracija", htmlUpravitelj.registracija);
    //server.get("/odjava", htmlUpravitelj.odjava);
    server.get("/dohvatiKorisnika", fetchUpravitelj.dohvatiKorisnika);
    server.post("/prijava", fetchUpravitelj.prijava);
    server.post("/registracija", fetchUpravitelj.registracija);
    server.get("/getJWT", fetchUpravitelj.getJWT);
    server.get("/aktivacijaRacuna", fetchUpravitelj.aktvacijaRacuna);
    server.get("/odjava",fetchUpravitelj.odjaviKorisnika);
}

function pripremiPutanjuAngular(){
    server.get('/', (zahtjev, odgovor) => {
        odgovor.sendFile(__dirname + '/angular/dist/zadaca_02/index.html');
    });
}

async function pripremiPort(){
    var podaci = await ds.readFile(process.argv[2], "UTF-8");
    port = konf.dohvatiPortApp(podaci);
}

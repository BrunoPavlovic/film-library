const FilmDAO = require("./filmDAO.js");

exports.getFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let fdao = new FilmDAO();
    let id = zahtjev.params.id;
    fdao.daj(id).then((film) => {
        console.log(film);
        odgovor.send(JSON.stringify(film));
    });
}


exports.postFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let fdao = new FilmDAO();
    fdao.obrisi(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.putFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let fdao = new FilmDAO();
    fdao.azuriraj(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.getFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let fdao = new FilmDAO();
    fdao.dajSve().then((filmovi) => {
        odgovor.send(JSON.stringify(filmovi));
    });
}

exports.postFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let fdao = new FilmDAO();
    fdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

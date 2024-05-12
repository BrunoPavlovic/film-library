const ŽanrDAO = require("./žanrDAO.js");

exports.getŽanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let ždao = new ŽanrDAO();
    ždao.dajSve().then((žanr) => {
        console.log(žanr);
        odgovor.send(JSON.stringify(žanr));
    });
}

exports.postŽanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let ždao = new ŽanrDAO();
    ždao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.putŽanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteŽanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let ždao = new ŽanrDAO();
    ždao.obrisi_nepostoji().then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.getŽanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let ždao = new ŽanrDAO();
    let id = zahtjev.params.id;
    ždao.daj(id).then((žanr) => {
        console.log(žanr);
        odgovor.send(JSON.stringify(žanr));
    });
}


exports.postŽanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putŽanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let ždao = new ŽanrDAO();
    ždao.azuriraj(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.deleteŽanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let ždao = new ŽanrDAO();
    ždao.obrisi(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
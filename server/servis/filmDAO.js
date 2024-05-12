const Baza = require("./baza.js");

class FilmDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Film;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Film WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (film) {
		this.baza.spojiSeNaBazu();
		console.log(film)
		let sql = `INSERT INTO Film (tmbd_id,naziv,originalni_naslov,datum_objave,
            jezik,ocjena_filma,opis,status) VALUES (?,?,?,?,?,?,?,?)`;
        let podaci = [film.tmbd_id,film.naziv,film.originalni_naslov,film.datum_objave
                        ,film.jezik,film.ocjena_filma,film.opis,
                        film.status];
		await this.baza.izvrsiUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}

	obrisi = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "DELETE FROM Film WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		this.baza.zatvoriVezu();
		return true;
	}

	azuriraj = async function (id, film) {
		this.baza.spojiSeNaBazu();
		let sql = `UPDATE Film SET tmbd_id=?,naziv=?,originalni_naslov=?,datum_objave=?,
        jezik=?,ocjena_filma=?,opis=?,status=? WHERE id=?`;
        let podaci = [film.tmbd_id,film.naziv,film.originalni_naslov,film.datum_objave,film.jezik,film.ocjena_filma,film.opis,
            "ne",id];
		await this.baza.izvrsiUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}

	filtriraj = async function (stranica, brojFilmova) {
		
	}
}

module.exports = FilmDAO;
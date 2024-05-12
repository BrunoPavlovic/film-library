const Baza = require("./baza.js");

class ŽanrDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Žanr;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Žanr WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (žanr) {
		this.baza.spojiSeNaBazu();
		console.log(žanr)
		let sql = `INSERT INTO Žanr (tmdb,naziv) VALUES (?,?)`;
        let podaci = [žanr.id,žanr.name];
		await this.baza.izvrsiUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}

	obrisi = async function (id) {
		this.baza.spojiSeNaBazu();
		let sql = "DELETE FROM Žanr WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		this.baza.zatvoriVezu();
		return true;
	}

    obrisi_nepostoji = async function(){
		this.baza.spojiSeNaBazu();
        let sql = "DELETE FROM Žanr WHERE NOT EXISTS(SELECT * FROM žanr_filmovi WHERE Žanr_id=Žanr.id)";
        await this.baza.izvrsiUpit(sql);
		this.baza.zatvoriVezu();
		return true;
    }

	azuriraj = async function (id, žanr) {
		this.baza.spojiSeNaBazu();
		let sql = `UPDATE Korisnik SET naziv=? WHERE id=?`;
        let podaci = [žanr.naziv,id];
		await this.baza.izvrsiUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}
}

module.exports = ŽanrDAO;
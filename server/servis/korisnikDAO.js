const Baza = require("./baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Korisnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (korisnik) {
		console.log(korisnik);
		this.baza.spojiSeNaBazu();
		let sql = `INSERT INTO Korisnik (ime,prezime,lozinka,email,korime,datum_rođenja,aktivacijskiKod,tip_korisnika_id) VALUES (?,?,?,?,?,?,?,?)`;
        let podaci = [korisnik.ime,korisnik.prezime,
                      korisnik.lozinka,korisnik.email,korisnik.korime,korisnik.datum_rođenja,korisnik.aktivacijskiKod,1];
		await this.baza.izvrsiUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}

	obrisi = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "DELETE FROM Korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql,[korime]);
		this.baza.zatvoriVezu();
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		this.baza.spojiSeNaBazu();
		let sql = `UPDATE Korisnik SET ime=?, prezime=?, lozinka=?, datum_rođenja=? WHERE korime=?`;
        let podaci = [korisnik.ime,korisnik.prezime,
                      korisnik.lozinka,korisnik.datum_rođenja,korime];
		await this.baza.izvrsiUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}

	azurirajAktivnost = async function (korime, korisnik) {
		this.baza.spojiSeNaBazu();
		let sql = `UPDATE Korisnik SET aktivan=? WHERE korime=?`;
        let podaci = [korisnik.aktivan,korime];
		await this.baza.izvrsiRunUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}

	azurirajPrijavu = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = `UPDATE Korisnik SET prijava=? WHERE korime=?`;
        let podaci = ["da",korime];
		await this.baza.izvrsiRunUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}

	azurirajOdjavu = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = `UPDATE Korisnik SET prijava=? WHERE korime=?`;
        let podaci = ["ne",korime];
		await this.baza.izvrsiRunUpit(sql,podaci);
		this.baza.zatvoriVezu();
		return true;
	}
}

module.exports = KorisnikDAO;
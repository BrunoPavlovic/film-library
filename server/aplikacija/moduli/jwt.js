const konst= require("../../konstante.js");
const jwt = require(konst.dirModula + "jsonwebtoken")

exports.kreirajToken = function(korisnik){
	let token = jwt.sign({ korime: korisnik.korime }, konst.tajniKljucJWT, { expiresIn: "1h" });
	console.log(token);
    return token;
}

exports.provjeriToken = function(zahtjev) {
	console.log("Provjera tokena: "+zahtjev.headers.authorization);
    if (zahtjev.headers.authorization != null) {
        console.log(zahtjev.headers.authorization);
		let token="jksd";
        try {
            let podaci = jwt.verify(token, konst.tajniKljucJWT);
            console.log("JWT podaci: "+podaci);
			return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }
    return false;
}

exports.ispisiDijelove = function(token){
	let dijelovi = token.split(".");
	let zaglavlje =  dekodirajBase64(dijelovi[0]);
	console.log(zaglavlje);
	let tijelo =  dekodirajBase64(dijelovi[1]);
	console.log(tijelo);
	let potpis =  dekodirajBase64(dijelovi[2]);
	console.log(potpis);
}

exports.dajTijelo = function(token){
	let dijelovi = token.split(".");
	return JSON.parse(dekodirajBase64(dijelovi[1]));
}

function dekodirajBase64(data){
	let buff = new Buffer(data, 'base64');
	return buff.toString('ascii');
}

const konst = require("../konstante.js");
const sqlite3 = require('sqlite3').verbose();
const ds = require("fs");

class Baza {

    constructor() {
        this.db = null;
    }

    spojiSeNaBazu(){
        this.db = new sqlite3.Database('../baza.sqlite',sqlite3.OPEN_READWRITE, (err)=>{
            if (err) {
                console.error(err.message);
              }
              console.log('Spoijili ste se na bazu.');
        });
    }

    izvrsiRunUpit(sql, podaciZaSQL){
        return new Promise((uspjeh,neuspjeh)=>{
            console.log(podaciZaSQL);
            console.log(sql);
            this.db.run(sql,podaciZaSQL,(greska, rezultat) => {
                if(greska)
                    neuspjeh(greska);
                else{
                    uspjeh(rezultat);
                    console.log("Izvšen upit=> "+ sql);
                }
            });
        })
    }

    izvrsiUpit(sql, podaciZaSQL){
        return new Promise((uspjeh,neuspjeh)=>{
            this.db.all(sql,podaciZaSQL,(greska, rezultat) => {
                if(greska)
                    neuspjeh(greska);
                else{
                    uspjeh(rezultat);
                    console.log("Izvšen upit=> "+ sql);
                }
            });
        })
    }

    zatvoriVezu() {
        this.db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Zatvorili ste vezu.');
        });
    }
}

module.exports = Baza;
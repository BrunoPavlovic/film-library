import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { FilmoviI } from '../servisi/FilmoviI';
import { HttpServis } from '../servisi/httpServis.service';

@Component({
  selector: 'app-filmovi-pretrazivanje',
  templateUrl: './filmovi-pretrazivanje.component.html',
  styleUrls: ['./filmovi-pretrazivanje.component.scss']
})
export class FilmoviPretrazivanjeComponent implements OnInit {
  filmovi! : any;
  poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" ;

  constructor(private filmService : HttpServis){}

  async ngOnInit() {
    this.dajFilmove(2);
    let rezultat = document.getElementById("filter");
    rezultat?.addEventListener("keyup", (event) => { this.dajFilmove(2) });
  };

  async dajFilmove(str: Number){
    let poruka = document.getElementById("poruka");
    let odgovor = await fetch(environment.restServis + "/api/tmdb/filmovi?kljucnaRijec=" + this.dajFilter() + "&stranica=" + str);
    if (odgovor.status == 200) {
      let podaci = await odgovor.text();
      podaci = JSON.parse(podaci).results;
      console.log(podaci);
      this.filmovi = podaci;
    } else if (odgovor.status == 401) {
      let glavna = document.getElementById("sadrzaj");
      glavna!.innerHTML = "";
      poruka!.innerHTML = "Neautorizirani pristup! Prijavite se!"
    } else {
      poruka!.innerHTML = "Greška u dohvatu filmova!"
    }
  }

  dajFilter() {
    let rezultat = document.getElementById("filter") as HTMLInputElement;
    return rezultat.value;
  }

  async dodajUbazu(idFilma: Number,prijedlog : FilmoviI) {
    let odgovor = await fetch(environment.restServis + "/api/tmdb/filmovi?kljucnaRijec=" + this.dajFilter() + "&stranica=2");
    if (odgovor.status == 200) {
      let podaci = await odgovor.text();
      let filmovi = JSON.parse(podaci).results;
      for (let film of filmovi) {
        if (idFilma == film.id) {
          prijedlog.tmbd_id = film.id;
          prijedlog.naziv = film.title;
          prijedlog.originalni_naslov = film.original_title;
          prijedlog.datum_objave = film.release_date;
          prijedlog.jezik = film.original_language;
          prijedlog.ocjena_filma = film.vote_average;
          prijedlog.opis = film.overview;
          prijedlog.status = "da";
          
          console.log("Prijedlog: "+JSON.stringify(prijedlog));
          console.log("Prijedlog bez stringify: "+prijedlog);
          this.filmService.dodajFilm(prijedlog).subscribe((data)=>{
            console.log("Film dodan u bazu!");
          });
          break;
        }
      }
    }
  }

}

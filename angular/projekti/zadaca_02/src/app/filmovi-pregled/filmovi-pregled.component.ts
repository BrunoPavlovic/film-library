import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FilmoviI } from '../servisi/FilmoviI';
import { KorisnikI } from '../servisi/KorisnikI';

@Component({
  selector: 'app-filmovi-pregled',
  templateUrl: './filmovi-pregled.component.html',
  styleUrls: ['./filmovi-pregled.component.scss']
})
export class FilmoviPregledComponent implements OnInit {
  filmovi!: any;
  filmoviParse! : FilmoviI[];
  filmoviPolje : any = [];
  film!: any;
  odabrani : boolean = false;

  ngOnInit() {
    this.dajFilmove();
  }

  async dajFilmove() {
    let odgovor = await fetch(environment.restServis + "/api/filmovi");
    if (odgovor.status == 200) {
      let podaci = await odgovor.text();
      podaci = JSON.parse(podaci);
      console.log(podaci);
      this.filmovi = podaci;
      this.filmoviParse = this.filmovi;
      for(let f of this.filmoviParse){
        if(f.status == "ne"){
          this.filmoviPolje.push(f);
        }
      }
    }
  }

  async odabraniFilm(odabraniFilm : any){
    let odgovor = await fetch(environment.restServis + "/api/filmovi/"+odabraniFilm.id);
    if (odgovor.status == 200){
      let podaci = await odgovor.text();
      podaci = JSON.parse(podaci);
      console.log(podaci);
      this.odabrani = true;
      this.film = podaci;
    }
  }
}
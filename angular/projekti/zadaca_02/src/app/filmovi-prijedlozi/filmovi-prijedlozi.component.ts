import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FilmoviI } from '../servisi/FilmoviI';
import { HttpServis } from '../servisi/httpServis.service';

@Component({
  selector: 'app-filmovi-prijedlozi',
  templateUrl: './filmovi-prijedlozi.component.html',
  styleUrls: ['./filmovi-prijedlozi.component.scss']
})
export class FilmoviPrijedloziComponent implements OnInit {

  filmovi!: any;
  filmoviParse! : FilmoviI[];
  filmoviPolje : any = [];

  constructor(private filmService : HttpServis){}

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
        if(f.status == "da"){
          this.filmoviPolje.push(f);
        }
      }
    }
  }

  async odobri(odabraniFilm : any){
    this.filmService.odobriFilm(odabraniFilm).subscribe((data)=>{
        location.reload();
    });
  }

  async odbij(odabraniFilm : any){
    this.filmService.odbijFilm(odabraniFilm).subscribe((data)=>{
      location.reload();
    });
  }
}

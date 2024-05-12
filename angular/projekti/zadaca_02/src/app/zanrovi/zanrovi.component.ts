import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpServis } from '../servisi/httpServis.service';
import { ZanrI } from '../servisi/ZanrI';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.scss']
})
export class ZanroviComponent {

  zanrovi! : any;
  zanroviBaza! :any;
  zanrPostoji : any;
  ima : boolean = false;
  nema : boolean = false;

  constructor(private filmService : HttpServis){}

  async ngOnInit() {
    this.dajZanroveTMDB();
    this.dajZanroveBaza();
  };

  async dajZanroveTMDB(){
    let odgovor = await fetch(environment.restServis + "/api/tmdb/zanr");
    if (odgovor.status == 200) {
      let podaci = await odgovor.text();
      podaci = JSON.parse(podaci).genres;
      console.log(podaci);
      this.zanrovi = podaci;
    }
  }

  async dajZanroveBaza() {
    let odgovor = await fetch(environment.restServis + "/api/zanr");
    if (odgovor.status == 200) {
      let podaci = await odgovor.text();
      podaci = JSON.parse(podaci);
      console.log(podaci);
      if(podaci!=null){
        this.ima = true;
        this.zanroviBaza = podaci;
      }
    }
  }

  async dodajUbazu(idZanra: Number,prijedlog : ZanrI) {
    let odgovor = await fetch(environment.restServis + "/api/tmdb/zanr");
    if (odgovor.status == 200) {
      let podaci = await odgovor.text();
      let zanroviProvjera = JSON.parse(podaci).genres;

      let odgovor2 = await fetch(environment.restServis + "/api/zanr");
      if (odgovor2.status == 200) {
        let podaci2 = await odgovor2.text();
        let zanrProvjera = JSON.parse(podaci2);
        for(let baza of zanrProvjera){
          if(idZanra == baza.tmdb){
            this.nema=true;
            this.zanrPostoji = baza;
            return;
          } 
        }
      }
      for (let zanr of zanroviProvjera) {
        if (idZanra == zanr.id) {
          console.log("Prijedlog: "+JSON.stringify(prijedlog));
          this.filmService.dodajZanr(prijedlog).subscribe((data)=>{
            console.log("Zanr dodan u bazu!");
            this.dajZanroveBaza();
          });
        }
      }
    }
  }

  async obrisiKojeNemaju(){
    this.filmService.obrisiZanr().subscribe((data)=>{
      console.log("USPJEŠNO OBRISANI!");
      this.dajZanroveBaza();
    })
  }
}

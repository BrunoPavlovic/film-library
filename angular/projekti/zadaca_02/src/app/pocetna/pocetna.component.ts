import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit{


  async ngOnInit() {
    console.log("EVO2");
    let main = document.getElementsByTagName("main")[0];
    let prikaz = "<ol>";
    for (let p of await this.dohvatiZanrove()) {
      prikaz += "<li>" + p.naziv;
      let filmovi = await this.dohvatiFilmove(p.naziv);
      prikaz += "<ul>";
      prikaz += "<li>" + filmovi[0]["original_title"] + "</li>"
      prikaz += "<li>" + filmovi[1]["original_title"] + "</li>"
      prikaz += "</ul></li>"
      prikaz += "</li>"
    }
    main.innerHTML = prikaz + "</ol>";
  };


  async dohvatiZanrove() {
    let odgovor = await fetch(environment.appServis + "/dajSveZanrove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
  }

  async dohvatiFilmove(zanr: String) {
    let odgovor = await fetch(environment.appServis + "/dajDvaFilma?zanr=" + zanr);
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
  }

}

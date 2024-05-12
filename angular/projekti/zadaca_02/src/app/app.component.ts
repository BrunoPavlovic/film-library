import { Location } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'zadaca_02';
  putanja = "nema";

  

  constructor(private lokacija: Location){
    lokacija.onUrlChange((v) => {
      console.log('Promjena putanje: '+ v)
    })
  }
  
  ngDoCheck(){
    this.putanja = this.lokacija.path();
  }

  async odjavi(){
    let odgovor = await fetch(environment.appServis+"/odjava");
    let podaci = await odgovor.text();
    console.log(podaci);
    window.location.reload();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import { HttpServis } from '../servisi/httpServis.service';
import { KorisnikI } from '../servisi/KorisnikI';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  reCAPTCHAToken: string = "";
  tokenVisible: boolean = false;

  constructor(private httpServis: HttpServis, private recaptchaV3Service: ReCaptchaV3Service) { }

  async ngOnInit() {
    let odgovor = await fetch(environment.appServis + "/dohvatiKorisnika");
    let korisnik = await odgovor.text();
    let podaci = JSON.parse(korisnik) as KorisnikI;
    console.log(podaci);

    let ime = document.getElementById("ime") as HTMLInputElement;
    ime.value = podaci.ime as string;

    let prezime = document.getElementById("prezime") as HTMLInputElement;
    prezime.value = podaci.prezime as string;

    let korime = document.getElementById("korime") as HTMLInputElement;
    korime.value = podaci.korime as string;

    let lozinka = document.getElementById("lozinka") as HTMLInputElement;
    lozinka.value = podaci.lozinka as string;

    let email = document.getElementById("email") as HTMLInputElement;
    email.value = podaci.email as string;

    let datum_rođenja = document.getElementById("datum_rođenja") as HTMLInputElement;
    datum_rođenja.value = podaci.datum_rođenja.toString();
  }


  public provjeriRECAPTCHA(form: NgForm, data: KorisnikI): void {
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      this.tokenVisible = true;
      this.reCAPTCHAToken = `Token [${token}] uspješno generiran`;
      this.azuriraj(data);
    });
  }

  async azuriraj(podaci: KorisnikI) {
    let korime = document.getElementById("korime") as HTMLInputElement;
    podaci.korime = korime.value;

    let ime = document.getElementById("ime") as HTMLInputElement;
    podaci.ime = ime.value;

    let prezime = document.getElementById("prezime") as HTMLInputElement;
    podaci.prezime = prezime.value;

    let lozinka = document.getElementById("lozinka") as HTMLInputElement;
    podaci.lozinka = lozinka.value;


    let datum_rođenja = document.getElementById("datum_rođenja") as HTMLInputElement;
    let datum = datum_rođenja.value as unknown as Date;
    podaci.datum_rođenja = datum;

    console.log(podaci);
    this.httpServis.azurirajKorisnika(podaci).subscribe((data)=>{
      this.ngOnInit();
    });
  }
}

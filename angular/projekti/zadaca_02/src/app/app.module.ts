import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { AppRoutingModule } from './app-routing.module';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { HttpServis } from './servisi/httpServis.service';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { FilmoviPretrazivanjeComponent } from './filmovi-pretrazivanje/filmovi-pretrazivanje.component';
import { ProfilComponent } from './profil/profil.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { FilmoviPrijedloziComponent } from './filmovi-prijedlozi/filmovi-prijedlozi.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';


@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    RegistracijaComponent,
    PrijavaComponent,
    DokumentacijaComponent,
    FilmoviPretrazivanjeComponent,
    ProfilComponent,
    FilmoviPregledComponent,
    FilmoviPrijedloziComponent,
    ZanroviComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecaptchaV3Module
  ],
  providers: [
    HttpServis,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { KorisnikI, PrijavaI } from './KorisnikI';
import { environment } from '../../environments/environment';
import { FilmoviI } from './FilmoviI';
import { ZanrI } from './ZanrI';

@Injectable()
export class HttpServis {
  constructor(private http: HttpClient) { }

  probareCAPTHA(token : any){
    return this.http.post("https://www.google.com/recaptcha/api/siteverify",{
      secret: environment.recaptcha.siteKey,
      response : token
    });
  }

  dodajKorisnika(korisnik : KorisnikI): Observable<KorisnikI>{
    return this.http.post<KorisnikI>(environment.appServis+"/registracija",korisnik);
  }

  provjeriKorisnika(korisnik:PrijavaI) : Observable<PrijavaI>{
    return this.http.post<PrijavaI>(environment.appServis+"/prijava",korisnik);
  }

  azurirajKorisnika(korisnik : KorisnikI) : Observable<KorisnikI>{
    return this.http.put<KorisnikI>(environment.restServis+"/api/korisnici/"+korisnik.korime,korisnik);
  }

  dodajFilm(prijedlog:FilmoviI) : Observable<FilmoviI>{
    return this.http.post<FilmoviI>(environment.restServis+"/api/filmovi/",prijedlog);
  }

  dodajZanr(prijedlog:ZanrI) : Observable<ZanrI>{
    return this.http.post<ZanrI>(environment.restServis+"/api/zanr/",prijedlog);
  }

  odobriFilm(korisnik : any) : Observable<any>{
    return this.http.put<any>(environment.restServis+"/api/filmovi/"+korisnik.id,korisnik);
  }

  odbijFilm(korisnik : any) : Observable<any>{
    return this.http.delete<any>(environment.restServis+"/api/filmovi/"+korisnik.id,korisnik);
  }

  obrisiZanr(){
    return this.http.delete(environment.restServis+"/api/zanr");
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { FilmoviPretrazivanjeComponent } from './filmovi-pretrazivanje/filmovi-pretrazivanje.component';
import { ProfilComponent } from './profil/profil.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { FilmoviPrijedloziComponent } from './filmovi-prijedlozi/filmovi-prijedlozi.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';

const routes: Routes = [
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'dokumentacija', component: DokumentacijaComponent },
  { path: 'filmoviPretrazivanje', component: FilmoviPretrazivanjeComponent },
  { path: 'filmoviPregled', component: FilmoviPregledComponent },
  { path: 'filmoviPrijedlozi', component: FilmoviPrijedloziComponent},
  { path: 'zanrovi', component: ZanroviComponent},
  { path: 'profil', component: ProfilComponent },
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

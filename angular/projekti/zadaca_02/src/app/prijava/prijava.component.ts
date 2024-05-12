import { Component } from '@angular/core';
import { HttpServis } from '../servisi/httpServis.service';
import { PrijavaI } from '../servisi/KorisnikI';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent {
  private prijava : any;
  reCAPTCHAToken: string = "";
  tokenVisible: boolean = false;

  constructor(private userService : HttpServis,private recaptchaV3Service: ReCaptchaV3Service,private  router: Router){}

  public provjeriRECAPTCHA(form: NgForm, prijava : PrijavaI): void {
    if(prijava.korime=="" || prijava.lozinka=="" || form.invalid==true){
      console.log("Popunite sve podatke!");
      return;
    }

    this.recaptchaV3Service.execute('LOGIN').subscribe((token: string) => {
      this.tokenVisible = true;
      this.reCAPTCHAToken = `Token [${token}] uspješno generiran`;
      this.userService.provjeriKorisnika(prijava).subscribe((data)=>{
        this.router.navigate(['']);
      });
    });
  }
}

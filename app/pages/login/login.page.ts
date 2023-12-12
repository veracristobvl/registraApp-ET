import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ServicedatosService } from 'src/app/services/servicesdatos.service';
import { ServiceFirebase } from 'src/app/services/serviceFirebase.service';
import { collectionGroup, doc } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string ='';
  contrasena:string ='';
  emailInvalido:boolean = false;
  contrasenaInvalida:boolean = false;
  credencialesValidas :boolean = false;
  item$: Observable<any[]>;
  formLogin:FormGroup
  docenteAuth: import("c:/Users/crizv/OneDrive/Desktop/RegistrApp_Evaluaci-n3_Casa_Valencia_Vera-main/src/app/models/docente.model").Docente[];
  docente : any;
  errorMessage: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private storageService:ServicedatosService,
    private router: Router,
    private appComponent: AppComponent,
    private dataFirebase : ServiceFirebase
  ) {
    this.appComponent.showMenu = false; 
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  
  ngOnInit() {
    const name = 'login'
  }
  
  async onSubmit(){

    let logged :any; 
    try{
      logged = await this.dataFirebase.login(this.formLogin.value)
    }
    catch(error){
      if (error.code === 'auth/invalid-credential') {
        this.errorMessage = 'datos incorrectos';
      }

    }
    if (logged){
      this.router.navigate(['/about'])
    }
    
  }
  clearError(){
    this.errorMessage = null
  }

}

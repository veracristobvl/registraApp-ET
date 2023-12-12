import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// import { Storage } from '.angular'; 
import { ServicedatosService, Docente } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


//Firebase
import { Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { ServiceFirebase } from 'src/app/services/serviceFirebase.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  

  // VARIABLES
  newDocente: Docente = <Docente>{};
  @ViewChild('myList')myList:IonList;

  //FORMULARIOS
  registroForm: FormGroup
  formReg :FormGroup

  formularioValido = false;
  asignaturas: any;
  //FIN DE VARIABLES

  //CONSTRUCTOR
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private storageService:ServicedatosService,
    private plt: Platform,
    private toastController: ToastController,
    private router: Router,
    private appComponent: AppComponent,
    private dataFirebase : ServiceFirebase,
    private firestore: Firestore,
    ) { 
      // FORMULARIO DOCENTE
    
    this.appComponent.showMenu = false;
    
  }
  // FIN DE CONSTRUCTOR

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/asignaturas')
      .subscribe(res => {
        this.asignaturas=res
       })
      this.formReg = new FormGroup({
        email:new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword : new FormControl('',Validators.required),
        nombre: new FormControl('', Validators.required),
        apellido: new FormControl('', Validators.required),
        asignatura1:new FormControl('', Validators.required),
        asignatura2:new FormControl('', Validators.required),
      });
      this.formReg.get('asignatura2').setValidators([
        Validators.required,
        this.asignaturaDiferenteValidator.bind(this),
      ]);
      this.formReg.get('confirmPassword').setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this),
      ])

  }
  
  asignaturaDiferenteValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const asignatura1 = this.formReg.get('asignatura1')?.value;
    const asignatura2 = control.value;
  
    return asignatura1 === asignatura2 ?{ 'asignaturaIgual': true }:null;
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.formReg.get('password')?.value;
    const confirmPassword = control.value;
  
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  addDocente(){
    //createUserWithEmailAndPassword(email,password).then()
    const itemCollection = collection(this.firestore, 'docentes');
    addDoc(itemCollection, this.newDocente)
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message:msg,
      duration:2000
    });
    toast.present();
  }
  
  async onSubmit() {
    this.dataFirebase.register(this.formReg.value)
    this.showToast('Docente Registrado')
    this.router.navigate(['/login'])
  }

  
}

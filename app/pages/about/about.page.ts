import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ServiceFirebase } from 'src/app/services/serviceFirebase.service';
import { ServicedatosService } from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  username:string;
  isLoggedIn:boolean;
  imageUrl='../../../assets/img/niño-presente.jpg'
  docente :any;
  constructor(
    private storageService:ServicedatosService,
    private router: Router,
    private appComponent: AppComponent,
    private dataFirebase: ServiceFirebase
  ) { 
    
  }

  async ngOnInit() {
    this.appComponent.showMenu = true
    this.username=''
    //this.docente = this.dataFirebase.docenteAuth
    this.dataFirebase.getUser().then(user=>{
      this.docente=user
    })    
  }
    
    async obtenerYGuardarUsuario() {
      try {
        // Llama a la función asincrónica y espera a que se resuelva la promesa
        this.docente = await this.dataFirebase.getUser();
  
        // Ahora puedes usar la variable "docente" como desees
        console.log('Docente obtenido:', this.docente);
  
        // Aquí podrías realizar más operaciones con el docente, si es necesario
        // Por ejemplo:
        // this.otraVariable = this.docente.algunaPropiedad;
  
      } catch (error) {
        console.error('Error al obtener el docente:', error);
      }
    }
}


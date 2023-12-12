import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { ServiceFirebase } from 'src/app/services/serviceFirebase.service';
import { Docente, ServicedatosService } from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  docente: any;
  constructor(
      private storageService:ServicedatosService,
      private dataFirebase: ServiceFirebase){
    
   }

  ngOnInit() {
    this.dataFirebase.getUser().then(user =>{
      this.docente = user
    })
  }

  onSubmit() {
  }
  
}

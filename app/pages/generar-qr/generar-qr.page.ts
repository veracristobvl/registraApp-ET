import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServiceFirebase } from 'src/app/services/serviceFirebase.service';
import { Docente, ServicedatosService } from 'src/app/services/servicesdatos.service';
import * as uuid from 'uuid'
@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {
  qr = false
  sala = '';
  asignatura = ''
  idAsistencia :any;
  docente: any;
  isLoggedIn:boolean;
  asistenciasArr: any = [];

  public horaActual: Date;
  
  
  codigoQR = '';
  
  
  constructor(
    private storageService:ServicedatosService,
    private datePipe: DatePipe,
    private router: Router,
    private dataFirebase: ServiceFirebase,
    private toastController: ToastController,

  ){
    
  }
  
  obtenerHoraActual(){
  }
  ngOnInit() {
    this.dataFirebase.getUser().then(user=>{
      this.docente=user
    })
  }

  generarQR(){
    if(this.sala != '' && this.asignatura != ''){
      this.generarID();
      this.horaActual = new Date( )
      this.qr = true
      
      this.codigoQR = JSON.stringify({
        idAsistencia: this.idAsistencia,
        idDocente:this.docente.id,
        sala:this.sala,
        fecha: this.horaActual,
        asignatura:this.asignatura
      })
    }else{
      alert('Se deben rellenar los datos para generar el Código!')
    }
  }
  asistenciaConfirmada(){
    this.showToast('Asistencia Guardada con éxito.')
  }
  async showToast(msg){
    const toast = await this.toastController.create({
      message:msg,
      duration:2000
    });
    toast.present();
  }
  borrarQR(){
    this.qr = false
  }
  generarID() {
    this.idAsistencia = this.generarIDUnico();
    console.log(this.idAsistencia)
  }
  generarIDUnico() {
    return uuid.v4().replace(/-/g, ''); // Eliminar guiones para obtener un ID alfanumérico
  }

  async getAsistencia(){
    const datosAsistencia = await this.dataFirebase.getAsistencias(this.idAsistencia)
    this.asistenciasArr = datosAsistencia
    console.log(datosAsistencia.length)
  }

  async deleteAsistencias(){
    await this.dataFirebase.deleteAsistencias(this.idAsistencia)
  }

}

import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {Firestore, collectionData,collection} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

//import { getFirestore,  getDocs, addDoc } from 'firebase/firestore';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  //Variable que cambia a true o false dependiendo de la vista. False en Login y Registro
  showMenu: boolean;
  //db = getFirestore(this.app)
  item$: Observable<any[]>;
  firestore:Firestore = inject(Firestore)
  
  
  constructor() {
    this.showMenu = true
    const itemCollection = collection(this.firestore,'items')
    this.item$ = collectionData(itemCollection)
  }
  
  ngOnInit() {
    
    
  }
}
  
  
  
  
  
  
  
  
  
  
  /*// Referencia a la colección "alumnos"
  alumnosCollection = collection(this.db, 'docentes');
  // Funcion para Obtener Alumnos
  obtenerAlumnos = async () => {
      try {
        const querySnapshot = await getDocs(this.alumnosCollection);
    
        querySnapshot.forEach((doc) => {
          // Accede a los datos de cada documento
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
  // Función para agregar un nuevo docente
  agregarAlumno = async (nombre, edad, curso) => {
    try {
      // Agrega un nuevo documento a la colección "alumnos"
      const nuevoAlumno = await addDoc(this.alumnosCollection, {
        nombre: nombre,
        edad: edad,
        curso: curso,
      });

      console.log('Alumno agregado con ID:', nuevoAlumno.id);
    } catch (error) {
      console.error('Error al agregar alumno:', error);
    }
  };*/


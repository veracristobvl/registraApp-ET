import { Inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { Firestore, collectionData, collection, addDoc, doc, getDoc, query, where, getDocs, deleteDoc } from '@angular/fire/firestore';
import { Auth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";


import { Docente } from "../models/docente.model";
import { Storage } from "@ionic/storage";

@Injectable({
    providedIn: 'root',
  })

  export class ServiceFirebase{
    docenteAuth :any;
    constructor(
            private auth:Auth,
            private firestore: Firestore,
            private storage : Storage
    ){
        const docentesCollection = collection(this.firestore, 'docentes');
    }

    addDocente(docente :Docente){
    const docenteRef = collection(this.firestore, 'docentes');
    return addDoc(docenteRef, docente)
   }

    // -------------------- AUTHENTICATION ----------------------  //
    register(docente:Docente){
        createUserWithEmailAndPassword(this.auth, docente.email, docente.password).then(async cred=>{
            docente.id = cred.user.uid
            const docenteRef = await addDoc(collection(this.firestore, 'docentes'),{
                nombre: docente.nombre,
                apellido: docente.apellido,
                email: docente.email,
                password: docente.password,
                asigatura1: docente.asignatura1,
                asigatura2: docente.asignatura2,
                uid:cred.user.uid
            });
            
        })
    }

    async login({email,password}: any){
        try{
            let uid :string;
            const cred = await signInWithEmailAndPassword(this.auth, email, password)
            uid = cred.user.uid
            await this.storage.set('user', this.findDocente(uid));
            return true
            }
        catch(error){
            throw error;
        }
    }
    
    
    
    async getUser() {
        return this.storage.get('user');
      }
    async logout(){
        await this.storage.set('user', '');
        return signOut(this.auth)
    }

    getAuthState() {
        return this.auth.authStateReady;
    }

    async findDocente(uid:string){
        const q = query(collection(this.firestore, "docentes"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        let docentes : any;
        let docente : any= null;
        docentes = (await getDocs(query(collection(this.firestore,'docentes')))).docs.map((docentes) =>{ 
            return docentes.data()
        })


        if (!querySnapshot.empty) {
            // Si hay resultados en la consulta, obtenemos el primer documento
            const docData = querySnapshot.docs[0].data();
            docente = { ...docData, id: querySnapshot.docs[0].id };
        }
        
        return docente
        
    }

    async getAsistencias(idAsistencia:string){
        const q = query(collection(this.firestore, "asistencia"), where("id", "==", idAsistencia));
        const querySnapshot = await getDocs(q);
        const dataArray = [];

        querySnapshot.forEach((doc) => {
        // Obtiene los datos del documento y agrega a dataArray
        const data = doc.data();
        dataArray.push(data);
        });
        return dataArray
    }

    async deleteAsistencias(idAsistencia){
        try{
            await deleteDoc(doc(this.firestore, 'asistencia', idAsistencia))
            console.log(`Se eliminaron los documentos con ID ${idAsistencia}:`)
        }catch(error){
            console.error(`Error al eliminar documento con ID ${idAsistencia}:`, error)
        }
    }
}
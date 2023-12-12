import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicedatosService } from 'src/app/services/servicesdatos.service';
import { ServiceFirebase } from '../services/serviceFirebase.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(
    private dataFirebase:ServiceFirebase,
    private router:Router
    ) { }

  ngOnInit() {

  }
  async onLogout(){
    await this.dataFirebase.logout()
      .then(() => {
        this.router.navigate(['/login']).then(()=>{
          window.location.reload()
        })
      })
  }

}

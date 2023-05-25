import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';
import { CommunicateService } from './services/communicate.service';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HomeComponent, HttpClient]
})
export class AppComponent {

  nom: string | null = null
  id: number | undefined = undefined; 
  user: User = {}
  title = 'LesCarnetsDeVoyage';

  constructor(private router: Router, private cs: CommunicateService, private userService: UserService) { }

  ngOnInit(): void{
    
    this.cs.getValueId().subscribe(id => this.id = id)
    this.cs.getValue().subscribe(nom => this.nom = nom)
    console.log("nom....." + this.nom)
  }

  // displayAccount(){
  //   this.userService.getUserById(this.id!).subscribe(res => {
  //     this.user = res;
  //     console.log(res);
      
  //     this.router.navigateByUrl(`myAccount/${this.user.id}`)
  //   });
  // }

  signOut() {
    localStorage.removeItem('tokens')
    this.cs.sendValue(null)
    this.router.navigateByUrl('/')
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommunicateService } from '../services/communicate.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: User = {
    id:0,
    email: "",
    username: "",
    password: "",
    role: "CLIENT"
  }

  erreur: string | null = null
  constructor( private userService: UserService, private router: Router, private cs: CommunicateService){}

  ngOnInit(): void {
  }

  connexion(){
    console.log(this.user);
    this.userService.checkUser(this.user).subscribe({
      next: result => {
        localStorage.setItem("user", JSON.stringify(result))
        console.log(this.user);
        this.cs.sendValue(this.user.username!)
        this.router.navigateByUrl("")
      },
      error: (e) => {this.erreur = "identifiants incorrects"+ e
      console.log(this.user)}
      
    })
  }

}

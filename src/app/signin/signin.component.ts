import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommunicateService } from '../services/communicate.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = {
    id: 0,
    email: "",
    username: "",
    password: "",
    role: "CLIENT"
  }

  erreur: string | null = null
  constructor(private userService: UserService, private router: Router, private cs: CommunicateService) { }

  ngOnInit(): void {
  }

  inscription() {
    console.log(this.user);
    const userPayload = {
      username: this.user.username,
      email: this.user.email
    };

    this.userService.checkDuplicate(userPayload.username!, userPayload.email!).subscribe({
      next: duplicate => {
        if (duplicate.username && duplicate.email) {
          this.erreur = "Le nom d'utilisateur et l'email sont déjà utilisés";
        } else if (duplicate.username) {
          this.erreur = "Le nom d'utilisateur est déjà utilisé";
        } else if (duplicate.email) {
          this.erreur = "L'email est déjà utilisé";
        } else {
          this.userService.addUser(this.user).subscribe({
            next: result => {
              this.router.navigateByUrl("/auth");
            },
            error: (e) => {
              console.log(e);
            }
          });
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

}

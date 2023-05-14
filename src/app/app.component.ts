import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';
import { CommunicateService } from './services/communicate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HomeComponent, HttpClient]
})
export class AppComponent {

  nom: string | null = null
  title = 'LesCarnetsDeVoyage';

  constructor(private router: Router, private cs: CommunicateService) { }

  ngOnInit(): void{
    this.cs.getValue().subscribe(nom => this.nom = nom)
    console.log("nom....." + this.nom)
  }

  signOut() {
    localStorage.removeItem('tokens')
    this.cs.sendValue(null)
    this.router.navigateByUrl('/')
  }
}

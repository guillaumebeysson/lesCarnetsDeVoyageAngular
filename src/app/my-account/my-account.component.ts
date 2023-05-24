import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicateService } from '../services/communicate.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  paysListe: any[] = [];
  nom: string | null = null
  title = 'LesCarnetsDeVoyage';

  constructor(private http: HttpClient, private router: Router, private cs: CommunicateService) { }

  ngOnInit() {
    //récupère la liste des pays via l'api
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(paysListe => {
      // stocke la liste des pays en francais par ordre alphabetique
      this.paysListe = paysListe.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
      console.log(paysListe);
    });
    this.cs.getValue().subscribe(nom => this.nom = nom)
    console.log("nom....." + this.nom)
  }

}

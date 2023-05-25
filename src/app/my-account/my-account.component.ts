import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicateService } from '../services/communicate.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  paysListe: any[] = [];
  nom: string | null = null
  id: number | undefined = undefined
  user: User = {};
  
  title = 'LesCarnetsDeVoyage';

  constructor(private http: HttpClient, private router: Router, private cs: CommunicateService, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    //récupère la liste des pays via l'api
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(paysListe => {
      // stocke la liste des pays en francais par ordre alphabetique
      this.paysListe = paysListe.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
      console.log(paysListe);
    });

    this.cs.getValue().subscribe(nom => this.nom = nom)
    this.cs.getValueId().subscribe(id => this.id = id)
    console.log("nom....." + this.nom)
    console.log("id....." + this.id)

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.userService.getUserById(id).subscribe(u => this.user = u);
    });
  }

}

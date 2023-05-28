import { Component, OnInit } from '@angular/core';
import { CarnetService } from '../services/carnet.service';
import { CritereRecherche } from '../interfaces/critere-recherche';
import { Carnet } from '../interfaces/carnet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  carnets?: Carnet[] = [];
  carnet: Carnet = {};
  selectedCarnet?: Carnet;
  paysListe: any[] = [];

  constructor(private carnetService: CarnetService, private http: HttpClient) { }

  ngOnInit(): void {
    this.carnetService.searchCarnets(this.criteresRecherche).subscribe(res => {
      this.carnets = res;
    })
    //récupère la liste des pays via l'api
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(paysListe => {
      // stocke la liste des pays en francais par ordre alphabetique
      this.paysListe = paysListe.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
      console.log(paysListe);
    });
  }

  criteresRecherche: CritereRecherche = {};

  effectuerRecherche(): void {
    // Modification de la propriété CSS
    const elementCarnets = document.getElementById('carnets');
    if (elementCarnets) {
      elementCarnets.style.display = 'flex';
    }
    console.log("criteresRecherche.........." + JSON.stringify(this.criteresRecherche))
    this.carnetService.searchCarnets(this.criteresRecherche)
      .subscribe(resultat => {
        this.carnets = resultat;
        console.log("résultats....." + JSON.stringify(resultat));
      });
  }

}

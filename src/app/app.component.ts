import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';
import { CommunicateService } from './services/communicate.service';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';
import { Observable, debounceTime, distinctUntilChanged, of } from 'rxjs';

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
  paysRecherches: string[] = [];
  listePays: string[] = ['France', 'Brésil', 'Allemagne', 'Canada', 'Australie', 'Albanie', 'Algérie', 'Afrique du sud', 'Italie'];
  valeurInput = '';

  constructor(private router: Router, private cs: CommunicateService, public userService: UserService) { }

  ngOnInit(): void {
    // this.cs.getValueId().subscribe(id => this.id = id)
    this.cs.getValue().subscribe(nom => this.nom = nom)
    // console.log("nom....." + this.nom)
    const token = localStorage.getItem('tokens');
    if (token) {
      this.nom = this.userService.getUsernameFromToken(token);
      console.log("nom in token....." + this.nom)
    }
  }

  signOut() {
    localStorage.removeItem('tokens')
    this.cs.sendValue(null)
    this.router.navigateByUrl('/')
    location.reload()
  }

  rechercherPays(event: Event): void {
    const valeur = (event.target as HTMLInputElement).value;
    const displayList = document.querySelector("#listCountrySelected");

    if (valeur.length >= 1) {
      // Utiliser debounceTime pour ajouter une attente de 300 ms
      const rechercheAttendue$ = this.attendre300ms(valeur).pipe(
        distinctUntilChanged(),
        debounceTime(3000)
      );

      rechercheAttendue$.subscribe(() => {
        this.paysRecherches = this.rechercherDansListe(valeur);
        console.log("Liste des pays affichés..." + this.paysRecherches);

        if (this.paysRecherches.length === 0) {
          displayList?.setAttribute("style", "display: none;");
        } else {
          displayList?.setAttribute("style", "display: flex;");
        }

      });
    } else {
      this.paysRecherches = [];
      displayList?.setAttribute("style", "display: none;");
    }
  }

  attendre300ms(valeur: string): Observable<string> {
    return of(valeur);
  }

  rechercherDansListe(valeur: string): string[] {
    const termeRecherche = valeur.toLowerCase();
    return this.listePays.filter(pays =>
      pays.toLowerCase().startsWith(termeRecherche)
    );
  }

  viderInput(): void {
    const inputElement = document.querySelector<HTMLInputElement>("#rechercheRapide");
    const displayList = document.querySelector("#listCountrySelected");
    if (inputElement) {
      inputElement.value = "";
    }
    displayList?.setAttribute("style", "display: none;");
  }


}

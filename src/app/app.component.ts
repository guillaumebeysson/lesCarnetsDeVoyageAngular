import { Component, HostListener } from '@angular/core';
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
  listePays: any[] = [];

  constructor(private router: Router, private cs: CommunicateService, public userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cs.getValue().subscribe(nom => this.nom = nom)
    const token = localStorage.getItem('tokens');
    if (token) {
      this.nom = this.userService.getUsernameFromToken(token);
      console.log("nom in token....." + this.nom)
    }
    //récupère la liste des pays via l'api
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(listePays => {
      const translation = listePays.map(pays => pays.translations.fra.common);
      // stocke la liste des pays en francais par ordre alphabetique
      this.listePays = translation.sort((a, b) => a.localeCompare(b));
      console.log("list" + JSON.stringify(listePays));
    });
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
      this.paysRecherches = this.rechercherDansListe(valeur);
      console.log("Liste des pays affichés..." + this.paysRecherches);

      if (this.paysRecherches.length === 0) {
        displayList?.setAttribute("style", "display: none;");
      } else {
        displayList?.setAttribute("style", "display: flex;");
      }
    } else {
      this.paysRecherches = [];
      displayList?.setAttribute("style", "display: none;");
    }
  }

  rechercherDansListe(valeur: string): string[] {
    const termeRecherche = valeur.toLowerCase();
    let resultatsFiltres = this.listePays.filter(pays =>
      pays.toLowerCase().startsWith(termeRecherche)
    );

    return resultatsFiltres.slice(0, 15);
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    const rechercheInput = document.querySelector<HTMLInputElement>("#rechercheRapide");
    const displayList = document.querySelector("#listCountrySelected");

    if (rechercheInput && !rechercheInput.contains(target as Node)) {
      this.viderInput();
    }
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

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
  listePays: string[] = ["Afghanistan",
    "Afrique du Sud",
    "Albanie",
    "Algérie",
    "Allemagne",
    "Andorre",
    "Angola",
    "Anguilla",
    "Antarctique",
    "Antigua-et-Barbuda",
    "Antilles néerlandaises",
    "Arabie saoudite",
    "Argentine",
    "Arménie",
    "Aruba",
    "Australie",
    "Autriche",
    "Azerbaïdjan",
    "Bahamas",
    "Bahreïn",
    "Bangladesh",
    "Barbade",
    "Bélarus",
    "Belgique",
    "Belize",
    "Bénin",
    "Bermudes",
    "Bhoutan",
    "Bolivie",
    "Bosnie-Herzégovine",
    "Botswana",
    "Brésil",
    "Brunéi Darussalam",
    "Bulgarie",
    "Burkina Faso",
    "Burundi",
    "Cambodge",
    "Cameroun",
    "Canada",
    "Cap-Vert",
    "Ceuta et Melilla",
    "Chili",
    "Chine",
    "Chypre",
    "Colombie",
    "Comores",
    "Congo-Brazzaville",
    "Corée du Nord",
    "Corée du Sud",
    "Costa Rica",
    "Côte d’Ivoire",
    "Croatie",
    "Cuba",
    "Danemark",
    "Diego Garcia",
    "Djibouti",
    "Dominique",
    "Égypte",
    "El Salvador",
    "Émirats arabes unis",
    "Équateur",
    "Érythrée",
    "Espagne",
    "Estonie",
    "État de la Cité du Vatican",
    "États fédérés de Micronésie",
    "États-Unis",
    "Éthiopie",
    "Fidji",
    "Finlande",
    "France",
    "Gabon",
    "Gambie",
    "Géorgie",
    "Géorgie du Sud et les îles Sandwich du Sud",
    "Ghana",
    "Gibraltar",
    "Grèce",
    "Grenade",
    "Groenland",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernesey",
    "Guinée",
    "Guinée équatoriale",
    "Guinée-Bissau",
    "Guyana",
    "Guyane française",
    "Haïti",
    "Honduras",
    "Hongrie",
    "Île Bouvet",
    "Île Christmas",
    "Île Clipperton",
    "Île de l'Ascension",
    "Île de Man",
    "Île Norfolk",
    "Îles Åland",
    "Îles Caïmans",
    "Îles Canaries",
    "Îles Cocos - Keeling",
    "Îles Cook",
    "Îles Féroé",
    "Îles Heard et MacDonald",
    "Îles Malouines",
    "Îles Mariannes du Nord",
    "Îles Marshall",
    "Îles Mineures Éloignées des États-Unis",
    "Îles Salomon",
    "Îles Turks et Caïques",
    "Îles Vierges britanniques",
    "Îles Vierges des États-Unis",
    "Inde",
    "Indonésie",
    "Irak",
    "Iran",
    "Irlande",
    "Islande",
    "Israël",
    "Italie",
    "Jamaïque",
    "Japon",
    "Jersey",
    "Jordanie",
    "Kazakhstan",
    "Kenya",
    "Kirghizistan",
    "Kiribati",
    "Koweït",
    "Laos",
    "Lesotho",
    "Lettonie",
    "Liban",
    "Libéria",
    "Libye",
    "Liechtenstein",
    "Lituanie",
    "Luxembourg",
    "Macédoine",
    "Madagascar",
    "Malaisie",
    "Malawi",
    "Maldives",
    "Mali",
    "Malte",
    "Maroc",
    "Martinique",
    "Maurice",
    "Mauritanie",
    "Mayotte",
    "Mexique",
    "Moldavie",
    "Monaco",
    "Mongolie",
    "Monténégro",
    "Montserrat",
    "Mozambique",
    "Myanmar",
    "Namibie",
    "Nauru",
    "Népal",
    "Nicaragua",
    "Niger",
    "Nigéria",
    "Niue",
    "Norvège",
    "Nouvelle-Calédonie",
    "Nouvelle-Zélande",
    "Oman",
    "Ouganda",
    "Ouzbékistan",
    "Pakistan",
    "Palaos",
    "Panama",
    "Papouasie-Nouvelle-Guinée",
    "Paraguay",
    "Pays-Bas",
    "Pérou",
    "Philippines",
    "Pitcairn",
    "Pologne",
    "Polynésie française",
    "Porto Rico",
    "Portugal",
    "Qatar",
    "R.A.S. chinoise de Hong Kong",
    "R.A.S. chinoise de Macao",
    "régions éloignées de l’Océanie",
    "République centrafricaine",
    "République démocratique du Congo",
    "République dominicaine",
    "République tchèque",
    "Réunion",
    "Roumanie",
    "Royaume-Uni",
    "Russie",
    "Rwanda",
    "Sahara occidental",
    "Saint-Barthélémy",
    "Saint-Kitts-et-Nevis",
    "Saint-Marin",
    "Saint-Martin",
    "Saint-Pierre-et-Miquelon",
    "Saint-Vincent-et-les Grenadines",
    "Sainte-Hélène",
    "Sainte-Lucie",
    "Samoa",
    "Samoa américaines",
    "Sao Tomé-et-Principe",
    "Sénégal",
    "Serbie",
    "Serbie-et-Monténégro",
    "Seychelles",
    "Sierra Leone",
    "Singapour",
    "Slovaquie",
    "Slovénie",
    "Somalie",
    "Soudan",
    "Sri Lanka",
    "Suède",
    "Suisse",
    "Suriname",
    "Svalbard et Île Jan Mayen",
    "Swaziland",
    "Syrie",
    "Tadjikistan",
    "Taïwan",
    "Tanzanie",
    "Tchad",
    "Terres australes françaises",
    "Territoire britannique de l'océan Indien",
    "Territoire palestinien",
    "Thaïlande",
    "Timor oriental",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinité-et-Tobago",
    "Tristan da Cunha",
    "Tunisie",
    "Turkménistan",
    "Turquie",
    "Tuvalu",
    "Ukraine",
    "Union européenne",
    "Uruguay",
    "Vanuatu",
    "Venezuela",
    "Viêt Nam",
    "Wallis-et-Futuna",
    "Yémen",
    "Zambie",
    "Zimbabwe"];

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
    const resultatsFiltres = this.listePays.filter(pays =>
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

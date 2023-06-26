import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicateService } from '../services/communicate.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Carnet } from '../interfaces/carnet';
import { CarnetService } from '../services/carnet.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  paysListe: any[] = [];
  nom: string | null = null
  // id: number | undefined = undefined
  user: User = {};
  carnets?: Carnet[] = [];
  selectedCarnet?: Carnet;
  selectedCarnetId: number | undefined;

  title = 'LesCarnetsDeVoyage';
  userObject: User | undefined;

  constructor(private http: HttpClient, private router: Router, private cs: CommunicateService, private activatedRoute: ActivatedRoute,private carnetService: CarnetService, private userService: UserService) { }

  ngOnInit() {
    //récupère la liste des pays via l'api
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(paysListe => {
      // stocke la liste des pays en francais par ordre alphabetique
      this.paysListe = paysListe.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
      console.log(paysListe);
    });

    const token = localStorage.getItem('tokens');
    if (token) {
      this.nom = this.userService.getUsernameFromToken(token);
      console.log("nom in token....." + this.nom)
    }

    if (token) {
      this.userService.getUserById(this.userService.getIdFromToken(token)).subscribe((user) => {
        this.userObject = user;
        console.log("userEmail"+ JSON.stringify(user.email))
        console.log("userId.................................."+ JSON.stringify(user.id))
        this.userService.getCarnetByUser(user?.id!).subscribe(res => {
          this.carnets = res;
          console.log("........++++++++++..........."+this.carnets)
        })
      })
    }

  }

  onDelete(): void {
    if (this.selectedCarnetId === undefined) {
      console.error("L'id est indéfini");
      return;
    }
    this.carnetService.removeCarnet(this.selectedCarnetId).subscribe({
      next: () => 
        this.carnetService.getCarnets().subscribe(carnets => {
          this.carnets = carnets;
          console.log("Carnet Supprimé !")
        }), 
      error: () =>
        console.log("Erreur lors de la suppression du carnet")
    });

    this.selectedCarnetId = undefined;
    this.showModalDelete = false;
  }
  
  showModalDelete: boolean = false;

onModal(id?: number) {
  if (id === undefined) {
    console.error("L'id est indéfini");
    return;
  } else {
    this.showModalDelete = true;
    this.selectedCarnetId = id;
  }
  console.log(this.showModalDelete)
  console.log("id..........."+id);
  
}

closeModal(){
  this.showModalDelete = false;
}


}

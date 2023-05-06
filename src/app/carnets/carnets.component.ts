import { Component, OnInit } from '@angular/core';
import { CarnetService } from '../services/carnet.service';
import { Carnet } from '../interfaces/carnet';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.component.html',
  styleUrls: ['./carnets.component.css']
})
export class CarnetsComponent implements OnInit {
  
  carnets?: Carnet[] = [];
  carnet: Carnet = {};
  selectedCarnet?: Carnet;

  constructor(private carnetService: CarnetService,private router: Router) { }

  ngOnInit(): void {
    this.carnetService.getCarnets().subscribe(res => {
      this.carnets = res;
    })
  }

  onDelete(id?: number): void {
    if (id === undefined) {
      console.error("L'id est indéfini");
      return;
    }
    this.carnetService.removeCarnet(id).subscribe({
      next: () => 
        this.carnetService.getCarnets().subscribe(carnets => {
          this.carnets = carnets;
          console.log("Supression effectuée")
        }), 
      error: () =>
        console.log("Erreur lors de la suppression du carnet")
    });
  }


}

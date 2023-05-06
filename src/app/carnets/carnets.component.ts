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
    this.carnetService.removeCarnet(id).subscribe(res => {
      if (res) {
        // actualiser la liste des carnets après suppression
        this.router.navigate(['/carnets']);
      } else {
        console.log("Erreur lors de la suppression du carnet");
      }
    });
  }



}

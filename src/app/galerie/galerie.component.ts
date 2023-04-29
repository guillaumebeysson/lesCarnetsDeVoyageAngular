import { Component, OnInit } from '@angular/core';
import { CarnetService } from '../services/carnet.service';
import { Carnet } from '../interfaces/carnet';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit {

  carnet: Carnet = {}
  carnets?: Carnet[] = [];

  constructor(private carnetService: CarnetService) { }

  ngOnInit(): void {
    this.carnetService.getCarnets().subscribe(res => {
      this.carnets = res;
      console.log(res)
    })
  }

}

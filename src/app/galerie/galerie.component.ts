import { Component, OnInit } from '@angular/core';
import { CarnetService } from '../services/carnet.service';
import { Carnet } from '../interfaces/carnet';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit {

  carnets?: Carnet[] = [];

  constructor(private carnetService: CarnetService) { }

  ngOnInit(): void {
    this.carnetService.getCarnetsReverseOrder().subscribe(res => {
      this.carnets = res;
      console.log(res)
    })
  }

}

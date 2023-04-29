import { Component, OnInit } from '@angular/core';
import { CarnetService } from '../services/carnet.service';
import { Carnet } from '../interfaces/carnet';


@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.component.html',
  styleUrls: ['./carnets.component.css']
})
export class CarnetsComponent implements OnInit {
  
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

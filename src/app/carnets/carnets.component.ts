import { Component, OnInit } from '@angular/core';

interface Carnet {
  id: number;
  name: string;
  price: number;
  picture: string;
  
}
@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.component.html',
  styleUrls: ['./carnets.component.css']
})
export class CarnetsComponent implements OnInit {
  
  carnets?: Carnet[];

  constructor() { }

  ngOnInit(): void {

  }

}

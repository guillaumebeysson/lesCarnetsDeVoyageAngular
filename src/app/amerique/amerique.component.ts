import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-amerique',
  templateUrl: './amerique.component.html',
  styleUrls: ['./amerique.component.css']
})
export class AmeriqueComponent implements OnInit {
  countriesAmerica!: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/region/americas').subscribe(
      response => {
        this.countriesAmerica = response;
        console.log(this.countriesAmerica);
      },
      error => {
        console.error(error);
      }
    );
  }
  

}

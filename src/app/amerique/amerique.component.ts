import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CountriesAmerica {
  name: { common: string };
  cca2: string;
  area: string;
  capital: string[];
  languages: string[];
  flags: { svg: string };
  maps: {googleMaps: string};
}

@Component({
  selector: 'app-amerique',
  templateUrl: './amerique.component.html',
  styleUrls: ['./amerique.component.css']
})

export class AmeriqueComponent implements OnInit {
  countriesData: CountriesAmerica[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CountriesAmerica[]>('https://restcountries.com/v3.1/region/americas').subscribe((data) => {
      this.countriesData = data;
      console.log(this.countriesData);
      console.log()
    });
  }
  

}

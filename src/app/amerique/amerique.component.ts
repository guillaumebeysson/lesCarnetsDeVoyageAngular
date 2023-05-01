import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarnetService } from '../services/carnet.service';
import { Carnet } from '../interfaces/carnet';

interface CountriesAmerica {
  translations: { fra: { common: string } };
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
      this.countriesData = data.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
      console.log(this.countriesData);
    });
  }
  

}

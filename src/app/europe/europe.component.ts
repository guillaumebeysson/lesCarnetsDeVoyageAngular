import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CountriesEuropa {
  translations: { fra: { common: string } };
  cca2: string;
  area: string;
  capital: string[];
  languages: string[];
  flags: { png: string };
  maps: {googleMaps: string};
}
@Component({
  selector: 'app-europe',
  templateUrl: './europe.component.html',
  styleUrls: ['./europe.component.css']
})
export class EuropeComponent implements OnInit {
  countriesData: CountriesEuropa[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CountriesEuropa[]>('https://restcountries.com/v3.1/region/europe').subscribe((data) => {
      this.countriesData = data.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
      console.log(this.countriesData);
    });
  }
  

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CountriesOceania{
  translations: { fra: { common: string } };
  cca2: string;
  area: string;
  capital: string[];
  languages: string[];
  flags: { png: string };
  maps: {googleMaps: string};
}
@Component({
  selector: 'app-oceanie',
  templateUrl: './oceanie.component.html',
  styleUrls: ['./oceanie.component.css']
})
export class OceanieComponent implements OnInit {

  countriesData: CountriesOceania[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CountriesOceania[]>('https://restcountries.com/v3.1/region/oceania').subscribe((data) => {
      this.countriesData = data.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
      console.log(this.countriesData);
    });
  }
  

}

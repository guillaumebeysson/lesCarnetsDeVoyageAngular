import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CountriesAfrica {
  name: { common: string };
  cca2: string;
  area: string;
  capital: string[];
  languages: string[];
  flags: { png: string };
  maps: {googleMaps: string};
}

@Component({
  selector: 'app-afrique',
  templateUrl: './afrique.component.html',
  styleUrls: ['./afrique.component.css']
})
export class AfriqueComponent implements OnInit {

  countriesData: CountriesAfrica[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CountriesAfrica[]>('https://restcountries.com/v3.1/region/africa').subscribe((data) => {
      this.countriesData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      console.log(this.countriesData);
    });
  }
  

}

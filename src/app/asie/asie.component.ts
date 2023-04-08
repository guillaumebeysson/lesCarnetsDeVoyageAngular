import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CountriesAsia {
  name: { common: string };
  cca2: string;
  area: string;
  capital: string[] | null;
  languages: string[];
  flags: { png: string };
  maps: {googleMaps: string};
}

@Component({
  selector: 'app-asie',
  templateUrl: './asie.component.html',
  styleUrls: ['./asie.component.css']
})
export class AsieComponent implements OnInit {

  countriesData: CountriesAsia[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CountriesAsia[]>('https://restcountries.com/v3.1/region/asia').subscribe((data) => {
      this.countriesData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      console.log(this.countriesData);
    });
  }
  

}
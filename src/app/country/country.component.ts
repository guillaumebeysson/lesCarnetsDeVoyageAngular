import { Component, OnInit } from '@angular/core';
import { CarnetService } from '../services/carnet.service';
import { Carnet } from '../interfaces/carnet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  carnets?: Carnet[] = [];
  countryName?: string;
  

  constructor(private carnetService: CarnetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const country = params['country'];
      const id = params['id'];
      this.carnetService.getCarnetsByCountry(country).subscribe(c => this.carnets = c);
      this.countryName =  this.activatedRoute.snapshot.paramMap.get('country')!;
    });
  }

}

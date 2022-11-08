import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import worldmap from '../../assets/worldmap_small.json';
import { HttpClient } from '@angular/common/http';
import { CountryDetail } from './country-detail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, ) {}

  mapOption: EChartsOption = {};

  nameCountry: string = '';

  countryDetail: CountryDetail = {};

  ngOnInit(): void {
    this.mapFunction();
  }


  // On récupère le pays sélectionné via echarts
  selectedCountry($event: any, type: string): void {
    // this.countryDetail = {};
    console.log($event);
    this.nameCountry = $event.name;
    const clickedCountryName = worldmap.features.find(
      (o: any) => o.properties.name === this.nameCountry
    );
    // on récupère les données d'un pays via l'API RestCountries
    this.http
      .get(
        'https://restcountries.com/v3.1/alpha/' +
          clickedCountryName.properties.iso_a2
      )
      .subscribe((data: any) => {
        this.countryDetail = {
          flag: data[0].flags.png,
          name: data[0].translations.fra.common,
          capital: data[0].capital[0],
          region: data[0].region,
          area: data[0].area.toLocaleString('fr-FR'),
          population: data[0].population.toLocaleString('fr-FR'),
          googleMap: data[0].maps.googleMaps,
        };
        console.log(data);
      });
    console.log('nom du pays sélectionné..........' + this.nameCountry);
  }

  mapFunction(): void {
    echarts.registerMap('USA', worldmap, {});

    // customisation de la map

    this.mapOption = {
      aria: {
        enabled: true,
      },
      label: [
        {
          // Relative percentage
          color: '#fff',
        },
      ],
      backgroundColor: {
        type: 'radial',
        x: 0.3,
        y: 0.3,
        r: 0.8,
        colorStops: [
          {
            offset: 0,
            // couleur de fond de la map monde
            color: '#fafafa',
          },
        ],
      },

      series: [
        {
          name: 'USA PopEstimates',
          type: 'map',
          roam: true,
          map: 'USA',

          select: {
            itemStyle: {
              // couleur du border ou du background des pays lorsque il est sélectionné
              borderColor: '',
              areaColor: '#fafafa',
            },
          },
          // min et max de l échelle donc du zoom
          scaleLimit: {
            min: 1.3,
            max: 20,
          },
          // label au survol sur un pays
          emphasis: {
            label: {
              show: true,
              color: '#000',
              backgroundColor: '',
              // fontSize: 16,
              borderColor: '',
            },
            itemStyle: {
              // couleur d'un pays au hover
              color: '#fff',
              areaColor: '#fcc24c',
            },
          },
          // couleur des pays
          itemStyle: {
            areaColor: '#fdac0f',
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.3)',
            shadowOffsetY: 1,
            color: '',
            borderColor: '#fff',
            borderWidth: 0.5,
          },
        },
      ],
    };
  }
}

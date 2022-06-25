import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import worldmap from '../../assets/worldmap_small.json';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  mapOption: EChartsOption = {};

  ngOnInit(): void {
    this.mapFunction();
  }


    selectedCountry($event: any, type: string): void {
      console.log($event);
      const clickedCountry = worldmap.features.find(
        (o: any) => o.properties.name === $event.name
      );
      console.log('clickedCoutry ....' + clickedCountry);
    }
  
  mapFunction(): void{
    // console.log("taata", worldmap.features[0].properties.name);
    // console.log("taata", worldmap.features[5].properties.name);
    
    // let tata = document.getElementById('tata')

    // console.log(tata);

    echarts.registerMap('USA', worldmap, {

      
    });

    


    // customisation de la map

    this.mapOption = {
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
              // couleur du border des pays lorsque il est sélectionné
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
              areaColor: '#fff',
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

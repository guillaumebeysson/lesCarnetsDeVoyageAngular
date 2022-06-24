import { Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts";
import * as echarts from 'echarts';
import worldmap from '../../assets/worldmap_small.json';
import * as $ from "jquery";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  mapOption: EChartsOption={};

  ngOnInit(): void {
    this.mapFunction();
  }



toto($event:any, type:string) :void{
  console.log($event)
  const clickedCountry = worldmap.features.find((o:any) => o.properties.name===$event.name)
  console.log(clickedCountry)
}






  
  mapFunction(): void{
    // console.log("taata", worldmap.features[0].properties.name);
    // console.log("taata", worldmap.features[5].properties.name);
   
    
    // let tata = document.getElementById('tata')

    // console.log(tata);

    echarts.registerMap('USA', worldmap, {

      
    });

    

    this.mapOption = {
      
      series: [
        {
          name: 'USA PopEstimates',
          type: 'map',
          roam: true,
          map: 'USA',
          emphasis: {
            label: {
              show: false
            }
          },
        }  
      ]
    };
  }






















  colorMap(): void{
    let L:any
    var myGeoJSONPath = 'path/to/mymap.geo.json';
        var myCustomStyle = {
            stroke: false,
            fill: true,
            fillColor: '#fff',
            fillOpacity: 1
        }
        $.getJSON(myGeoJSONPath,function(data:any){
            var map = L.map('map').setView([39.74739, -105], 4);

            L.geoJson(data, {
                clickable: false,
                style: myCustomStyle
            }).addTo(map);
        })
  }

}
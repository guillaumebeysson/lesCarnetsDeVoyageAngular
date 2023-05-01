import { Component, OnInit } from '@angular/core';
import { Carnet } from '../interfaces/carnet';
import { ActivatedRoute } from '@angular/router';
import { CarnetService } from '../services/carnet.service';

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: ['./carnet.component.css']
})
export class CarnetComponent implements OnInit {
  
  showModal!: boolean;
  imageUrl?: string;
  carnet?: Carnet;


  constructor(private activatedRoute: ActivatedRoute,
    private carnetService: CarnetService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.carnetService.getCarnetById(id).subscribe(c => this.carnet = c);
    });
  }
  
  show(imageUrl: string){
      this.imageUrl = imageUrl;
      this.showModal = true; // Show-Hide Modal Check
      console.log(this.showModal);
    }
    hide(){
      this.showModal = false; //Bootstrap Modal Close event
      console.log(this.showModal);
    }
   
  

  

}

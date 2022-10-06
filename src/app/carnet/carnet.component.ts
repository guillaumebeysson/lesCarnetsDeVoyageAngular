import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: ['./carnet.component.css']
})
export class CarnetComponent implements OnInit {
  
  showModal!: boolean


  constructor() {
  }

  ngOnInit(): void {
  }
  
  
  show()
    {
      this.showModal = true; // Show-Hide Modal Check
      console.log(this.showModal);
    }
    hide()
    {
      this.showModal = false; //Bootstrap Modal Close event
      console.log(this.showModal);
    }
   
  

  

}

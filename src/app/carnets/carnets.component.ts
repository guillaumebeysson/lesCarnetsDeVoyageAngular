import { Component, OnInit } from '@angular/core';
import { CarnetService } from '../services/carnet.service';
import { Carnet } from '../interfaces/carnet';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.component.html',
  styleUrls: ['./carnets.component.css']
})
export class CarnetsComponent implements OnInit {
  
  carnets?: Carnet[] = [];
  carnet: Carnet = {};
  selectedCarnet?: Carnet;
  selectedCarnetId: number | undefined;

  constructor(private carnetService: CarnetService,private router: Router) { }

  ngOnInit(): void {
    this.carnetService.getCarnets().subscribe(res => {
      this.carnets = res;
      console.log(this.carnets)
    })
  }

//   onDelete(): void {
//     if (this.selectedCarnetId === undefined) {
//       console.error("L'id est indéfini");
//       return;
//     }
//     this.carnetService.removeCarnet(this.selectedCarnetId).subscribe({
//       next: () => 
//         this.carnetService.getCarnets().subscribe(carnets => {
//           this.carnets = carnets;
//           console.log("Carnet Supprimé !")
//         }), 
//       error: () =>
//         console.log("Erreur lors de la suppression du carnet")
//     });

//     this.selectedCarnetId = undefined;
//     this.showModalDelete = false;
//   }
  
//   showModalDelete: boolean = false;

// onModal(id?: number) {
//   if (id === undefined) {
//     console.error("L'id est indéfini");
//     return;
//   } else {
//     this.showModalDelete = true;
//     this.selectedCarnetId = id;
//   }
//   console.log(this.showModalDelete)
//   console.log("id..........."+id);
  
// }

// closeModal(){
//   this.showModalDelete = false;
// }


}

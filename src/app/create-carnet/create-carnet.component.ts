import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CarnetService } from '../services/carnet.service';
import { Router } from '@angular/router';
import { Carnet } from '../interfaces/carnet';



@Component({
  selector: 'app-create-carnet',
  templateUrl: './create-carnet.component.html',
  styleUrls: ['./create-carnet.component.css']
})
export class CreateCarnetComponent implements OnInit {
  @ViewChild('introduction') introduction!: ElementRef;
  @ViewChild('description') description!: ElementRef;

  paysListe: any[] = [];
  compteur1!: HTMLElement;
  compteur2!: HTMLElement;

  imageUrl1: string | undefined;
  imageUrl2: string | undefined;
  imageUrl3: string | undefined;

  erreur: string | null = null
  today = new Date();


  carnet: Carnet = {
    id: 0,
    title: "",
    introduction: "",
    description: "",
    picture1: "",
    picture2: "",
    picture3: "",
    country: "",
    city: "",
    durationTrip: 0,
    departurePeriod: "",
    organisation: "",
    situation: "",
    transport: "",
    date: this.today
  }

  constructor(private http: HttpClient, private carnetService: CarnetService, private router: Router) { }

  ngOnInit() {
    this.compteur1 = document.getElementById('compteur-textarea-introduction')!;
    this.compteur2 = document.getElementById('compteur-textarea-description')!;
    //récupère la liste des pays via l'api
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(paysListe => {
      // stocke la liste des pays en francais par ordre alphabetique
      this.paysListe = paysListe.sort((a, b) => a.translations.fra.common.localeCompare(b.translations.fra.common));
      console.log(paysListe);
    });
  }





  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.highlightDropZone(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.highlightDropZone(false);
  }

  //Visualisation pour le click
  handleFileInput(event: any, index: number) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if (index === 1) {
            this.imageUrl1 = reader.result?.toString();
          } else if (index === 2) {
            this.imageUrl2 = reader.result?.toString();
          } else if (index === 3) {
            this.imageUrl3 = reader.result?.toString();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  //Visualisation pour le drag and drop
  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    this.highlightDropZone(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if (index === 1) {
            this.imageUrl1 = reader.result?.toString();
          } else if (index === 2) {
            this.imageUrl2 = reader.result?.toString();
          } else if (index === 3) {
            this.imageUrl3 = reader.result?.toString();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  highlightDropZone(highlight: boolean) {
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) {
      dropZone.classList.toggle('drag-over', highlight);
    }
  }

  ngAfterViewInit(): void {
    this.introduction.nativeElement.addEventListener('input', () => {
      const nombreCaracteres = this.introduction.nativeElement.value.length;
      this.compteur1.innerHTML = `${nombreCaracteres}/600`;
    });
    this.description.nativeElement.addEventListener('input', () => {
      const nombreCaracteres = this.description.nativeElement.value.length;
      this.compteur2.innerHTML = `${nombreCaracteres}/600`;
    });

  }

  validCarnet() {
    console.log("carnet......." + JSON.stringify(this.carnet));
    this.carnetService.addCarnet(this.carnet).subscribe({
      next: result => {
        this.router.navigateByUrl("/")
      },
      error: (e) => {
        this.erreur = "carnet non ajouté"
        console.log(this.carnet)
      }
    })
  }


}

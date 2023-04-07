import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input, Output, EventEmitter, ElementRef, ViewChild  } from '@angular/core';


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

  constructor(private http: HttpClient) { }

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

handleFileInput(event: any) {
  const files = (event.target as HTMLInputElement).files;
  // Faire quelque chose avec les fichiers ici (par exemple, les envoyer sur un serveur)
}

imageUrl1: string | undefined;
imageUrl2: string | undefined;
imageUrl3: string | undefined;


onDragOver(event: DragEvent) {
  event.preventDefault();
  this.highlightDropZone(true);
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
  this.highlightDropZone(false);
}

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
    console.log(nombreCaracteres)
    this.compteur1.innerHTML = `${nombreCaracteres}/600`;
  });
  this.description.nativeElement.addEventListener('input', () => {
    const nombreCaracteres = this.description.nativeElement.value.length;
    console.log(nombreCaracteres)
    this.compteur2.innerHTML = `${nombreCaracteres}/600`;
  });
  
}


}

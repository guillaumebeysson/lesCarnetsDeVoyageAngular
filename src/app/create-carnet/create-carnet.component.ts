import { Component, OnInit,Input, Output, EventEmitter, ElementRef  } from '@angular/core';


@Component({
  selector: 'app-create-carnet',
  templateUrl: './create-carnet.component.html',
  styleUrls: ['./create-carnet.component.css']
})
export class CreateCarnetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

handleFileInput(event: any) {
  const files = (event.target as HTMLInputElement).files;
  // Faire quelque chose avec les fichiers ici (par exemple, les envoyer sur un serveur)
}

imageUrl: string | undefined;

onDragOver(event: DragEvent) {
  event.preventDefault();
  this.highlightDropZone(true);
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
  this.highlightDropZone(false);
}

onDrop(event: DragEvent) {
  event.preventDefault();
  this.highlightDropZone(false);
  
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result?.toString();
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
}

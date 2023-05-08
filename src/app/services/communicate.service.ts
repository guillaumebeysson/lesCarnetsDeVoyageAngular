import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  private subject: Subject<string|null> = new Subject<string|null>();
  constructor() { }

  sendValue(value: string|null){
    this.subject.next(value)
  }

  getValue(){
    return this.subject
  }
}

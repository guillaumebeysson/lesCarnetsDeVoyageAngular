import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// subject pour faire passer des informations dans différents composants
export class CommunicateService {

  private subject: Subject<string|null> = new Subject<string|null>();
  private subjectId: Subject<number|undefined> = new Subject<number|undefined>();
  
  constructor() { }

  sendValueId(id: number | undefined){
    this.subjectId.next(id)
  }
  getValueId(){
    return this.subjectId
  }

  sendValue(value: string|null){
    this.subject.next(value)
  }
  getValue(){
    return this.subject
  }
}

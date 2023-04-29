import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carnet } from '../interfaces/carnet';

@Injectable({
  providedIn: 'root'
})
export class CarnetService {

  private url: string = "http://localhost:8080/carnets"
  constructor(private http: HttpClient) { }

  

  getCarnets() {
    return this.http.get<Carnet[]>(this.url);
  }
  addCarnet(p: Carnet) {
    return this.http.post<Carnet>(this.url, p);
  }
  removeCarnet(num: number) {
    return this.http.delete<boolean>(`${this.url}/${num}`);
  }
}

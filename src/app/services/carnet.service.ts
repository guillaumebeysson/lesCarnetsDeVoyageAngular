import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carnet } from '../interfaces/carnet';

@Injectable({
  providedIn: 'root'
})
export class CarnetService {

  private url: string = "http://localhost:8080/carnets"

  constructor(private http: HttpClient) { }

  getCarnetsReverseOrder(){
    return this.http.get<Carnet[]>(`${this.url}/reverseOrder`);
  }
  getCarnetsByCountry(country: string){
    return this.http.get<Carnet[]>(`${this.url}/country/${country}`)
  }
  getCarnetById(id: number){
    return this.http.get<Carnet>(`${this.url}/${id}`)
  }
  getCarnets() {
    return this.http.get<Carnet[]>(this.url);
  }
  getLastFourCarnets(){
    return this.http.get<Carnet[]>(`${this.url}/lastFour`)
  }
  addCarnet(c: Carnet) {
    return this.http.post<Carnet>(this.url, c);
  }
  removeCarnet(id?: number) {
    return this.http.delete<boolean>(`${this.url}/delete/${id}`);
  }
}

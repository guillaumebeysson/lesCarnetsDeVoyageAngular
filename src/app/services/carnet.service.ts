import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carnet } from '../interfaces/carnet';
import { Observable } from 'rxjs';
import { CritereRecherche } from '../interfaces/critere-recherche';

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
  removeCarnet(id?: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/delete/${id}`);
  }
  
  searchCarnets(criteres: CritereRecherche): Observable<any> {
    let params = new HttpParams();

    if (criteres.title) {
      params = params.append('title', criteres.title);
    }
    if (criteres.durationTrip) {
      params = params.append('durationTrip', criteres.durationTrip.toString());
    }
    if (criteres.country) {
      params = params.append('country', criteres.country);
    }
    if (criteres.departurePeriod) {
      params = params.append('departurePeriod', criteres.departurePeriod);
    }
    if (criteres.organisation) {
      params = params.append('organisation', criteres.organisation);
    }
    if (criteres.situation) {
      params = params.append('situation', criteres.situation);
    }
    if (criteres.transport) {
      params = params.append('transport', criteres.transport);
    }

    return this.http.get<any>(`${this.url}/search`, { params });
  }
}

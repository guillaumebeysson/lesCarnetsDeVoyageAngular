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

  getCarnetsReverseOrder() {
    return this.http.get<Carnet[]>(`${this.url}/reverseOrder`);
  }
  getCarnetsByCountry(country: string) {
    return this.http.get<Carnet[]>(`${this.url}/country/${country}`)
  }
  getCarnetById(id: number) {
    return this.http.get<Carnet>(`${this.url}/${id}`)
  }
  getCarnets() {
    return this.http.get<Carnet[]>(this.url);
  }
  getLastFourCarnets() {
    return this.http.get<Carnet[]>(`${this.url}/lastFour`)
  }
  // addCarnet(c: Carnet) {
  //   return this.http.post<Carnet>(this.url, c);
  // }

  addCarnet(c: Carnet, picture1File?: File, picture2File?: File, picture3File?: File): Observable<void> {
    const data = new FormData();
    data.append("carnet", new Blob([JSON.stringify(c)], { type: "application/json" }));
    if (picture1File !== undefined) {
      data.append("picture1", picture1File, picture1File.name);
    }
    if (picture2File !== undefined) {
      data.append("picture2", picture2File, picture2File.name);
    }
    if (picture3File !== undefined) {
      data.append("picture3", picture3File, picture3File.name);
    }
    return this.http.post<void>(`${this.url}/createCarnet`, data);
  }

  removeCarnet(id?: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/delete/${id}`);
  }

  searchCarnets(criteres: CritereRecherche): Observable<any> {
    let params = new HttpParams();

    if (criteres.title) {
      params = params.append('title', criteres.title);
    } else if (!criteres.title) {
      params = params.delete('title');
    }
    if (criteres.durationTrip) {
      params = params.append('durationTrip', criteres.durationTrip.toString());
    } else if (!criteres.durationTrip) {
      params = params.delete('durationTrip');
    }
    if (criteres.country) {
      params = params.append('country', criteres.country);
    } else if (!criteres.country) {
      params = params.delete('country');
    }
    if (criteres.city) {
      params = params.append('city', criteres.city);
    } else if (!criteres.city) {
      params = params.delete('city');
    }
    if (criteres.departurePeriod) {
      params = params.append('departurePeriod', criteres.departurePeriod);
    } else if (!criteres.departurePeriod) {
      params = params.delete('departurePeriod');
    }
    if (criteres.organisation) {
      params = params.append('organisation', criteres.organisation);
    } else if (!criteres.organisation) {
      params = params.delete('organisation');
    }
    if (criteres.situation) {
      params = params.append('situation', criteres.situation);
    } else if (!criteres.situation) {
      params = params.delete('situation');
    }
    if (criteres.transport) {
      params = params.append('transport', criteres.transport);
    } else if (!criteres.transport) {
      params = params.delete('transport');
    }

    return this.http.get<any>(`${this.url}/search`, { params });
  }
}

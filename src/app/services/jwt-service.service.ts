import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('tokens');

    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url != 'http://localhost:8080/users'){
    const user: User = JSON.parse(localStorage.getItem('user') ?? "")
    const usernameAndPassword = user.username + ':' + user.password;
    request = request.clone({
      setHeaders: {
        'Authorization': 'Basic ' + btoa(usernameAndPassword)
      }
    })
  }
  return next.handle(request);
}
}

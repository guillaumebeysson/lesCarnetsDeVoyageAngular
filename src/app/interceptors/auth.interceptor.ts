import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService,) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      if (request.url !== 'http://localhost:8080/token') {
        let tokens = JSON.parse(localStorage.getItem('tokens') ?? "")
        if (this.userService.isExpiredToken(tokens.accessToken)) {
          this.userService.generateTokensFromRefreshToken(tokens.refreshToken).subscribe(res => {
            tokens = res;
            localStorage.setItem('tokens', JSON.stringify(res))
          })
        }
        request = request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + tokens.accessToken
          }
        })
      }
    return next.handle(request);
  }
}

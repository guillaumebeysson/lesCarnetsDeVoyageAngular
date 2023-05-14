import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Token } from '../interfaces/token';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://localhost:8080/token"
  private urlUser: string = "http://localhost:8080/users"
  constructor(private http: HttpClient) { }

  checkUser(user: User) {
    return this.http.post<Token>(this.url, user);
  }

  addUser(user: User){
    return this.http.post<User>(this.urlUser, user);
  }

  getUsernameFromToken(token: string) {
    const decoded: { sub: string } = jwt_decode(token)
    return decoded.sub
  }
  isExpiredToken(token: string): boolean {
    const decoded: { exp: number } = jwt_decode(token)
    const { exp } = decoded;
    return exp * 1000 < Date.now()
  }
  generateTokensFromRefreshToken(token: string) {
    const user: User = { grantType: "refreshToken" , refreshToken: token}
    return this.http.post<Token>(this.url, user);
  }
}

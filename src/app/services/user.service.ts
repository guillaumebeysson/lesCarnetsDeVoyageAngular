import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Token } from '../interfaces/token';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';

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

  getUserById(id: number) {
    return this.http.get<User>(`${this.urlUser}/${id}`)
  }

  addUser(user: User) {
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
    const user: User = { grantType: "refreshToken", refreshToken: token }
    return this.http.post<Token>(this.url, user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('tokens');
    if (token) {
      return !this.isExpiredToken(token);
    }
    return false;
  }

  checkDuplicate(username: string, email: string): Observable<{ username: boolean, email: boolean }> {
    const url = `${this.urlUser}/check-duplicate`;
    const payload = { username, email };
    return this.http.post<{ username: boolean, email: boolean }>(url, payload);
  }
}

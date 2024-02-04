import {Injectable} from '@angular/core';
import {Login} from "../models/classes/login";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {baseURL} from "../models/baseUrl";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  login(login: Login) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    let params = new HttpParams();
    params = params.append('username', login.username);
    params = params.append('password', login.password);
    return this.http.post(baseURL + 'login', params, httpOptions);
  }
  }

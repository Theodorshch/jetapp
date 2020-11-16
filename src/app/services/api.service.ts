import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person } from '../models/person';
import { ApiUrls } from '../utilities/api-urls';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPerson(): Observable<Person> {
    const url = ApiUrls.ApiUrl;
    return this.http.get<Person>(url);
  }
}

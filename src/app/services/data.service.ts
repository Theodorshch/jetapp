import { Injectable } from '@angular/core';
import { bufferCount, delay, repeat } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apiService: ApiService) { }

  getPeople(amount: number): Observable<Person[]> {
    if (amount > 0) {
      return this.apiService.getPerson()
        .pipe(
          delay(250),
          repeat(amount),
          bufferCount(amount)
        );
    } else {
      return of([]);
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, switchMap, take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { DataService } from './services/data.service';
import { Person } from './models/person';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  people: Person[];
  showSpinner = false;
  timeout: number;
  amountOfPeople: FormControl = new FormControl(0);
  amountOfPeopleSubs: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.amountOfPeopleSubs = this.amountOfPeople.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.showSpinner = true;
          this.people = [];
          this.clearTimeout();
        }),
        switchMap(value => this.dataService.getPeople(value)),
        tap(value => {
          this.showSpinner = false;
          this.people = value;
          this.setNewTimeout();
        })
      ).subscribe();
  }

  getPeople(): void {
    if (this.amountOfPeople.value > 0) {
      this.showSpinner = true;
      this.people = [];
      this.dataService.getPeople(this.amountOfPeople.value)
        .pipe(
          take(1),
          tap(value => {
            this.showSpinner = false;
            this.people = value;
            this.setNewTimeout();
          })
        ).subscribe();
    }
  }

  setNewTimeout(): void {
    this.clearTimeout();
    this.timeout = setTimeout(() => this.getPeople(), 10000);
  }

  clearTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onTooltipOpened(event): void {
    if (event) {
      this.clearTimeout();
    } else {
      this.setNewTimeout();
    }
  }

  ngOnDestroy(): void {
    this.amountOfPeopleSubs.unsubscribe();
  }
}

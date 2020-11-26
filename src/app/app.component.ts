import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';

import { DataService } from './services/data.service';
import { Person } from './models/person';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  people: Person[];
  showSpinner = false;
  timeout: number;
  amountOfPeople: FormControl = new FormControl(0);

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onRangeChange(): void {
    this.getPeople();
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

  onTooltipOpened(event: boolean): void {
    if (event) {
      this.clearTimeout();
    } else {
      this.setNewTimeout();
    }
  }
}

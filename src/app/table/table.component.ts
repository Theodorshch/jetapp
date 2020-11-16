import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Person } from '../models/person';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() people: Person[];
  @Output() tooltipOpened = new EventEmitter();

  openedTooltips = 0;

  emitTooltipStatus(event): void {
    event ? this.openedTooltips++ : this.openedTooltips--;
    this.openedTooltips === 0 ? this.tooltipOpened.emit(false) : this.tooltipOpened.emit(true);
  }
}

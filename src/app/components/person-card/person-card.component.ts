import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {

  @Input() name: string;
  @Input() lastName: string;
  @Input() age: string;
  @Input() img: string;
}

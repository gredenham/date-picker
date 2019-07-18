import { Component, EventEmitter, Output } from '@angular/core';
import { DatePickerStore } from '../../services/date-picker.store';

@Component({
    selector: 'ghm-date-picker-display',
    styleUrls: ['./date-picker-display.component.scss'],
    template: `
        <div (click)="open.next($event)" class="calendar__btn">
            <div class="calendar__btn-val" *ngFor="let date of datePickerStore.getSelectedDate | async">
                {{date.full | date: 'dd/MM/yyyy' }}
            </div>
        </div>
    `
})

export class DatePickerDisplayComponent {

    @Output() open: EventEmitter<MouseEvent> = new EventEmitter();

    constructor(public datePickerStore: DatePickerStore) {}

}

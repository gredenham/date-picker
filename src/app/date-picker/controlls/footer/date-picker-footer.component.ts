import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DatePickerStore } from '../../services/date-picker.store';
import { ICalendarDay } from '../../services/date-picker.service';

@Component({
    selector: 'app-date-picker-footer',
    styleUrls: ['./date-picker-footer.component.scss'],
    template: `
        <div class="bottom-btns">
            <div class="btn-cancel"
                [ngClass]="{'disabled-confirm': selectedDate.length === 0}"
                (click)="datePickerStore.changeSelectedDate([])">
                Reset
            </div>
            <div class="btn-ok"
                [ngClass]="{'disabled-confirm': selectedDate.length === 0}"
                (click)="confirm.next(selectedDate)">
                OK
            </div>
        </div>
    `
})

export class DatePickerFooterComponent implements OnInit {

    @Output() confirm: EventEmitter<any> = new EventEmitter();

    public selectedDate: ICalendarDay[];

    constructor(public datePickerStore: DatePickerStore) {
        this.selectedDate = [];
    }

    public ngOnInit() {
        this.datePickerStore.getSelectedDate.subscribe((date) => this.selectedDate = date);
    }

}

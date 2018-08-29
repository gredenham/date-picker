import { Component, OnInit } from '@angular/core';
import { DatePickerStore } from '../../services/date-picker.store';
import { ICalendarDay, IConfig } from '../../date-picker.sheme';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-date-picker-footer',
    styleUrls: ['./date-picker-footer.component.scss'],
    template: `
        <div *ngIf="!options.autoClose" class="bottom-btns">
            <div class="btn-cancel"
                [ngClass]="{'disabled-confirm': selectedDate.length === 0}"
                (click)="datePickerStore.changeSelectedDate([])">
                Reset
            </div>
            <div class="btn-ok"
                [ngClass]="{'disabled-confirm': selectedDate.length === 0}"
                (click)="datePickerStore.confirmDate(selectedDate)">
                OK
            </div>
        </div>
    `
})

export class DatePickerFooterComponent implements OnInit {

    public selectedDate: ICalendarDay[];

    public options: IConfig;

    constructor(
        public datePickerStore: DatePickerStore
    ) {
        this.selectedDate = [];
    }

    public ngOnInit() {
        combineLatest(
            this.datePickerStore.getSelectedDate,
            this.datePickerStore.getOptions
        ).subscribe(([date, options]) => {
            this.selectedDate = date;
            this.options = options;
        });
    }

}

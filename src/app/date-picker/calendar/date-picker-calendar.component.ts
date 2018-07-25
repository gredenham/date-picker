import { DatePickerService, ICalendarDay } from '../services/date-picker.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePickerReviewService } from '../services/date-picker.review.service';
import { DatePickerStore } from '../services/date-picker.store';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
    selector: 'app-date-picker-calendar',
    styleUrls: ['./date-picker-calendar.component.scss'],
    template: `
        <div *ngFor="let item of datePickerService.getDaysArray(selectedMonth, selectedYear)"
            class="day calendar-day"
            [ngClass]="{
                'clicked-day': datePickerReviewService.isSelected(item, selectedDate),
                'coincide-day': datePickerReviewService.isCoincide(item, selectedDate),
                'today-day': datePickerReviewService.isToday(item, date),
                'disabled-day': item === null
            }"
            (click)="selectDate(item)">
            {{ item ? item.day : '' }}
        </div>
    `
})

export class DatePickerCalendarComponent implements OnInit {

    public selectedYear: number;
    public selectedMonth: number;
    public selectedDate: ICalendarDay[] = [];

    public date: Date;

    constructor(
        public ref: ChangeDetectorRef,
        public datePickerService: DatePickerService,
        public datePickerReviewService: DatePickerReviewService,
        private datePickerStore: DatePickerStore,
    ) {}

    ngOnInit() {
        
        combineLatest(
            this.datePickerStore.getSelectedMonth,
            this.datePickerStore.getSelectedYear, 
            this.datePickerStore.getCurrentDate,
            this.datePickerStore.getSelectedDate
        ).subscribe(([month, year, cur, selectedDate]) => {
            this.date = cur;
            this.selectedMonth = month;
            this.selectedYear = year;
            this.selectedDate = selectedDate;
        });

    }

    public selectDate(date) {
        let result = this.selectedDate;

        function defineDate() {
            const index = result.findIndex((item) =>
                ( this.datePickerReviewService.isValuesEquals(date, item) )
            );
            if (index >= 0) {
                result.splice(index, 1);
            } else {
                if (result.length < 2) {
                    (result.length === 1 && this.datePickerReviewService.isFirstValueSmaller(date, result[0]))
                        ? result.unshift(date)
                        : result.push(date);
                } else if (result.length === 2) {
                    result = [];
                    defineDate.call(this);
                }
            }
        }

        if (date) {
            defineDate.call(this);
            this.datePickerStore.changeSelectedDate(result);
        }
    }
}

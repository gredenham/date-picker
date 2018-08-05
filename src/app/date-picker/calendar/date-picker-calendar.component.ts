import { DatePickerService } from '../services/date-picker.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePickerReviewService } from '../services/date-picker.review.service';
import { DatePickerStore } from '../services/date-picker.store';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ICalendarDay, IConfig } from '../date-picker.sheme';

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
                'disabled-day': item === null || !isInPeriod(item)
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
    public options: IConfig;

    public date: Date;

    constructor(
        public ref: ChangeDetectorRef,
        public datePickerService: DatePickerService,
        public datePickerReviewService: DatePickerReviewService,
        public datePickerStore: DatePickerStore,
    ) {}

    public ngOnInit() {

        combineLatest(
            this.datePickerStore.getSelectedMonth,
            this.datePickerStore.getSelectedYear,
            this.datePickerStore.getCurrentDate,
            this.datePickerStore.getSelectedDate,
            this.datePickerStore.getOptions
        ).subscribe(([month, year, cur, selectedDate, options]) => {
            this.date = cur;
            this.selectedMonth = month;
            this.selectedYear = year;
            this.selectedDate = selectedDate;
            this.options = <IConfig>options;
        });

    }

    public isInPeriod(date): boolean {
        const isSmallerOrEqualMaxDate = this.options.maxDate
            ? (this.datePickerReviewService.isFirstValueSmaller(date, this.options.maxDate)
                || this.datePickerReviewService.isValuesEquals(this.options.maxDate, date))
            : true;

        const isBiggerOrEqualMinDate = this.options.minDate
            ? (this.datePickerReviewService.isFirstValueSmaller(this.options.minDate, date)
                || this.datePickerReviewService.isValuesEquals(this.options.minDate, date))
            : true;

        return isSmallerOrEqualMaxDate && isBiggerOrEqualMinDate;
    }

    public selectDate(date) {
        if (!date || !this.isInPeriod(date)) {
            return;
        }

        let result;

        if (this.options.isModeSingleDate) {

            result = [date];
            this.datePickerStore.changeSelectedDate(result);

        } else {

            const defineDate = () => {
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
                        defineDate();
                    }
                }
            };

            result = this.selectedDate;
            defineDate();
            this.datePickerStore.changeSelectedDate(result);
        }

        if (this.options.autoClose && (this.options.isModeSingleDate || result.length === 2)) {
            this.datePickerStore.confirmDate(result);
        }
    }
}

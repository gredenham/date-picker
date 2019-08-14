import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from '../services/date-picker.service';
import { DatePickerReviewService } from '../services/date-picker.review.service';
import { DatePickerStore } from '../services/date-picker.store';
import { ICalendarDay, IConfig } from '../date-picker.sheme';

@Component({
    selector: 'ghm-date-picker-calendar',
    styleUrls: ['./date-picker-calendar.component.scss'],
    template: `
        <div *ngIf="options.showWeeksNums" class="week-nums">
            <div *ngFor="let item of datePickerService.getWeeksArray(selectedMonth, selectedYear)"
                class="week-nums__item">{{item}}</div>
        </div>
        <div *ngFor="let item of datePickerService.getDaysArray(selectedMonth, selectedYear)"
            class="day calendar-day"
            [ngClass]="{
                'clicked-day': datePickerReviewService.isSelected(item, selectedDate),
                'coincide-day': datePickerReviewService.isCoincide(item, selectedDate),
                'today-day': datePickerReviewService.isToday(item, date),
                'disabled-day': !isInPeriod(item),
                'empty-day': item === null
            }"
            (click)="selectDate(item)">
            {{ item ? item.day : '' }}
        </div>
    `
})

export class DatePickerCalendarComponent implements OnInit, OnDestroy {

    public selectedYear: number;
    public selectedMonth: number;
    public selectedDate: ICalendarDay[] = [];
    public options: IConfig;

    public date: Date;

    private ngUnsubscribe: Subject<void> = new Subject<void> ();

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
        ).pipe(
            takeUntil(this.ngUnsubscribe)
        ).subscribe(([month, year, cur, selectedDate, options]) => {
            this.date = cur;
            this.selectedMonth = month;
            this.selectedYear = year;
            this.selectedDate = selectedDate;
            this.options = <IConfig>options;
        });

    }

    public ngOnDestroy() {
        this.unsubscribe();
    }

    public isInPeriod(date): boolean {
        const isSmallerOrEqualMaxDate = date && this.options.maxDate
            ? (this.datePickerReviewService.isFirstValueSmaller(date, this.options.maxDate)
                || this.datePickerReviewService.isValuesEquals(this.options.maxDate, date))
            : true;

        const isBiggerOrEqualMinDate = date && this.options.minDate
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

    private unsubscribe(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}

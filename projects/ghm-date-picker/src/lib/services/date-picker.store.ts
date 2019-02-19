import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DatePickerService } from './date-picker.service';
import { DatePickerReviewService } from './date-picker.review.service';
import { EnumSelectMode, IDateOptions, ICalendarDay, IConfig } from '../date-picker.sheme';

@Injectable()

export class DatePickerStore {

    private now: Date = new Date();

    private confirm: Subject<any> = new Subject();

    private currentDate: BehaviorSubject<Date> = new BehaviorSubject(this.now);

    private monthes: BehaviorSubject<string[]> = new BehaviorSubject([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'Novembver',
        'December'
    ]);

    private days: BehaviorSubject<string[]> = new BehaviorSubject([
        'Mn',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ]);

    private selectedYear: BehaviorSubject<any> = new BehaviorSubject(this.now.getFullYear());

    private selectedMonth: BehaviorSubject<any> = new BehaviorSubject(this.now.getMonth());

    private selectedDate: BehaviorSubject<ICalendarDay[]> = new BehaviorSubject(<ICalendarDay[]>[]);

    private options: BehaviorSubject<IConfig> = new BehaviorSubject(<IConfig>{});

    constructor(
        private datePickerService: DatePickerService,
        private datePickerReviewService: DatePickerReviewService
    ) {}

    public confirmDate(date) {
        this.confirm.next(date);
    }

    public changeOptions(options: IDateOptions) {
        const config: IConfig = {
            autoClose: !!options.autoClose,
            isModeSingleDate: (options.selectMode && options.selectMode === EnumSelectMode.single),
            showWeeksNums: !!options.showWeeksNums
        };

        ['minDate', 'maxDate'].forEach((key) => {
            if (options[key] && this.datePickerReviewService.checkValidDate(options[key])) {
                config[key] = <ICalendarDay>{
                    day: options[key].getDate(),
                    month: options[key].getMonth(),
                    year: options[key].getFullYear()
                };
            }
        });

        this.options.next(config);
    }

    public changeSelectedDate(date: ICalendarDay[]) {
        this.selectedDate.next(date.sort(this.datePickerService.sortDates));
    }

    public changeYear(year) {
        this.selectedYear.next(year);
    }

    public changeMonth(month) {
        this.selectedMonth.next(month);
    }

    public get getConfirm(): Observable<any> {
        return this.confirm.asObservable();
    }

    public get getOptions(): Observable<IConfig> {
        return this.options.asObservable();
    }

    public get getSelectedDate(): Observable<ICalendarDay[]> {
        return this.selectedDate.asObservable();
    }

    public get getMonthes(): Observable<string[]> {
        return this.monthes.asObservable();
    }

    public get getDays(): Observable<string[]> {
        return this.days.asObservable();
    }

    public get getSelectedYear(): Observable<any> {
        return this.selectedYear.asObservable();
    }

    public get getSelectedMonth(): Observable<any> {
        return this.selectedMonth.asObservable();
    }

    public get getCurrentDate(): Observable<Date> {
        return this.currentDate.asObservable();
    }
}

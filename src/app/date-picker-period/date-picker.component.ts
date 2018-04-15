import {
    DatePickerService,
    ICalendarDay
} from './services/date-picker.service';
import {
    Component,
    forwardRef,
    OnInit
} from '@angular/core';
import { DatePickerReviewService } from './services/date-picker.review.service';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export interface IDateControl {
    min: Date;
    max: Date;
    isActive?: boolean;
}

@Component({
    selector: 'app-ghm-date-picker-period',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ]
})

export class DatePickerComponent implements OnInit, ControlValueAccessor {

    public selectedYear: number;

    public selectedMonth: number;

    public selectedDate: ICalendarDay[] = [];

    public isOpen = false;

    public date: Date;

    constructor(
        public datePickerService: DatePickerService,
        public reviewService: DatePickerReviewService
    ) {
    }

    public ngOnInit() {
        this.date = new Date();
        this.selectedYear = this.date.getFullYear();
        this.selectedMonth = this.date.getMonth();
    }

    public writeValue(control: IDateControl) {
        if (control && 'min' in control && 'max' in control) {
            this.selectedDate = Object.keys(control).map((item) => ({
                day: control[item].getDate(),
                month: control[item].getMonth(),
                year: control[item].getFullYear(),
                full: control[item]
            })).sort((prev: ICalendarDay, cur: ICalendarDay) =>
                (this.reviewService.isFirstValueSmaller(prev, cur) ? -1 : 1));
        }
    }

    public btnDisplayDate(): ICalendarDay[] {
        return (this.selectedDate.length === 2 && this.reviewService.isValuesEquals(this.selectedDate[0], this.selectedDate[1]))
            ? [this.selectedDate[0]]
            : this.selectedDate;
    }

    public propagateChange = (_: any) => {
    }

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {
    }

    public confirmDate() {
        if (this.selectedDate.length === 1) {
            this.isOpen = false;
            this.propagateChange({
                min: this.selectedDate[0].full,
                max: this.selectedDate[0].full,
                isActive: true,
            });
        } else if (this.selectedDate.length === 2) {
            this.isOpen = false;
            this.propagateChange(this.selectedDate.reduce((prev, cur): any => {
                if (this.reviewService.isFirstValueSmaller(prev, cur)) {
                    return ({min: prev.full, max: cur.full, isActive: true});
                } else {
                    return ({min: cur.full, max: prev.full, isActive: true});
                }
            }));
        }
    }

}

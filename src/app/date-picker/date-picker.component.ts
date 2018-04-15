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
    selector: 'app-ghm-date-picker',
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

    public selectedDate: ICalendarDay;

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

    public writeValue(control: Date) {
        control = !control
            ? new Date()
            : (typeof control === 'string' ? (new Date(control)) : control);
        this.selectedDate = {
            day: control.getDate(),
            month: control.getMonth(),
            year: control.getFullYear(),
            full: control
        };
    }

    public btnDisplayDate(): ICalendarDay {
        return this.selectedDate
            ? this.selectedDate
            : {
                day: this.date.getDate(),
                month: this.date.getMonth(),
                year: this.date.getFullYear(),
                full: this.date
            };
    }

    public propagateChange = (_: any) => {
    }

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {
    }

    public confirmDate() {
        if (this.selectedDate) {
            this.isOpen = false;
            this.propagateChange(this.selectedDate.full);
        }
    }

    public cancelDate() {
        this.selectedDate = null;
    }

}

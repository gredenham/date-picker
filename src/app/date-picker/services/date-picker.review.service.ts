import { ICalendarDay } from './date-picker.service';
import { Injectable } from '@angular/core';

@Injectable()

export class DatePickerReviewService {

    constructor() {}

    public isValuesEquals(a: ICalendarDay, b: ICalendarDay): boolean {
        if (!a || !b) {
            return false;
        }
        return ( a.day === b.day && a.year === b.year && a.month === b.month );
    }

    public isToday(date, now): boolean {
        return (date && date.month === now.getMonth()
            && date.year === now.getFullYear()
            && date.day === now.getDate());
    }

    public isSelected(date, selectedDate): boolean {
        return this.isValuesEquals(date, selectedDate);
    }

}

import { ICalendarDay } from './date-picker.service';
import { Injectable } from '@angular/core';

@Injectable()

export class DatePickerReviewService {

    constructor() {}

    private checkValidDate(date) {
        let isDate = Object.prototype.toString.call(date) === "[object Date]";
        let isDateValid = isDate && !isNaN(date.getTime());
        return isDateValid;
    }

    public checkControl(control) {
        let isControlValid = control && control.hasOwnProperty('min')
            && control.hasOwnProperty('max')
            && Object.values(control).every(this.checkValidDate);
        return isControlValid;
    }

    public isFirstValueSmaller(first: ICalendarDay, second: ICalendarDay) {
        return (first.year < second.year
            || (first.year === second.year && first.month < second.month)
            || (first.year === second.year && first.month === second.month
                && first.day < second.day));
    }

    public isValuesEquals(a: ICalendarDay, b: ICalendarDay) {
        if (!a || !b) {
            return false;
        }
        return ( a.day === b.day && a.year === b.year && a.month === b.month );
    }

    public isToday(date, now) {
        return (date && date.month === now.getMonth()
            && date.year === now.getFullYear()
            && date.day === now.getDate());
    }

    public isCoincide(date, selectedDate) {
        if (date && selectedDate.length === 2) {
            const max: any = selectedDate.reduce((prev: any, cur: any, index: any) =>
                ( this.isFirstValueSmaller(cur, prev) ) ? index - 1 : index
            );
            const min = ( max > 0 ) ? 0 : 1;
            return (this.isFirstValueSmaller(selectedDate[min], date)
                && this.isFirstValueSmaller(date, selectedDate[max]));
        } else {
            return false;
        }
    }

    public isSelected(date, selectedDate) {
        return !!( date && selectedDate.findIndex((item) => (this.isValuesEquals(date, item))) >= 0);
    }

}

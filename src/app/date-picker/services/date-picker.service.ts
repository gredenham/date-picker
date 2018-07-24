import { Injectable } from '@angular/core';
import { DatePickerReviewService } from './date-picker.review.service';

export interface ICalendarDay {
    day: number;
    month: number;
    year: number;
    full: Date;
}

@Injectable()

export class DatePickerService {

    public now: Date = new Date();

    constructor(private datePickerReviewService: DatePickerReviewService) {}

    public sortDates = (prev: ICalendarDay, cur: ICalendarDay) => {
        return (this.datePickerReviewService.isFirstValueSmaller(prev, cur) ? -1 : 1)
    };

    public getDaysArray(month, year): ICalendarDay[] {
        let mon = month;
        let d = new Date(year, mon);
        let resultArray = [];

        for (let i = 0; i < this.getDay(d); i++) {
            resultArray.push(null);
        }

        while (d.getMonth() === mon) {
            resultArray.push({
                year: d.getFullYear(),
                month: d.getMonth(),
                day: d.getDate(),
                full: new Date(d.getFullYear(), d.getMonth(), d.getDate())
            });
            d.setDate(d.getDate() + 1);
        }

        if (this.getDay(d) !== 0) {
            for (let i = this.getDay(d); i < 7; i++) {
                resultArray.push(null);
            }
        }

        return resultArray;
    }

    public getDay(date) {
        let day = date.getDay();
        if (day === 0) {
            day = 7;
        }
        return day - 1;
    }

}

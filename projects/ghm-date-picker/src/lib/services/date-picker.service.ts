import { Injectable } from '@angular/core';
import { DatePickerReviewService } from './date-picker.review.service';
import { ICalendarDay } from '../date-picker.sheme';

@Injectable()

export class DatePickerService {

    public now: Date = new Date();

    constructor(private datePickerReviewService: DatePickerReviewService) {}

    public sortDates = (prev: ICalendarDay, cur: ICalendarDay) => {
        return (this.datePickerReviewService.isFirstValueSmaller(prev, cur) ? -1 : 1);
    }

    public getWeeksArray(month, year) {
        const daysArray = this.getDaysArray(month, year);
        const daysArraySplitedByWeeks = this.splitTo(daysArray, 7);
        return daysArraySplitedByWeeks.map((daysByWeek) => {
            const notEmptyDay = daysByWeek.find((day: ICalendarDay) => day != null);
            return this.getWeekNum(notEmptyDay.full);
        });
    }

    public getDaysArray(month, year): ICalendarDay[] {
        const mon = month;
        const d = new Date(year, mon);
        const resultArray = [];

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

    private getWeekNum(date): number {
        if (!date) {
            return;
        }
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        const yearStart: any = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    }

    private splitTo(arr: any[], n: number) {
        return arr.reduce((p, c) => {
            if (p.length === 0 || p[p.length - 1].length === n) {
                p.push([]);
            }

            p[p.length - 1].push(c);

            return p;
        }, []);
    }
}

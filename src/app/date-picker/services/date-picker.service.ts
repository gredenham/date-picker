import { Injectable } from '@angular/core';

export interface ICalendarDay {
    day: number;
    month: number;
    year: number;
    full: Date;
}

@Injectable()

export class DatePickerService {

    public now: Date = new Date();

    constructor() {
    }

    public dayOfWeek() {
        return (['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']);
    }

    public getDaysArray(month, year): ICalendarDay[] {
        const mon = month;
        const d = new Date(year, mon);
        const resultArray = [];

        // заполнить первый ряд от понедельника
        // и до дня, с которого начинается месяц
        // * * * | 1  2  3  4
        for (let i = 0; i < this.getDay(d); i++) {
            resultArray.push(null);
        }

        // ячейки календаря с датами
        while (d.getMonth() === mon) {
            resultArray.push({
                year: d.getFullYear(),
                month: d.getMonth(),
                day: d.getDate(),
                full: new Date(d.getFullYear(), d.getMonth(), d.getDate())
            });
            d.setDate(d.getDate() + 1);
        }

        // добить таблицу пустыми ячейками, если нужно
        if (this.getDay(d) !== 0) {
            for (let i = this.getDay(d); i < 7; i++) {
                resultArray.push(null);
            }
        }

        return resultArray;
    }

    public getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
        let day = date.getDay();
        if (day === 0) {
            day = 7;
        }
        return day - 1;
    }

}

import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { DatePickerStore } from '../services/date-picker.store';

@Pipe({
    name: 'myDatePickerPipe'
})

export class DatePickerPipe implements PipeTransform {

    private monthes = {};

    constructor(public datePickerStore: DatePickerStore) {
        this.datePickerStore.getMonthes.subscribe((monthes) => this.monthes = monthes);
    }

    public transform(num: number): SafeHtml {
        return this.monthes[num];
    }
}

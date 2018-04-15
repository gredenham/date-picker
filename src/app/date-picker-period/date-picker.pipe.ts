import {
    Pipe,
    PipeTransform
} from '@angular/core';
import {
    DomSanitizer,
    SafeHtml
} from '@angular/platform-browser';

const monthes = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
};

@Pipe({
    name: 'myDatePickerPipe'
})

export class DatePickerPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) {
    }

    transform(num: number): SafeHtml {
        return monthes[num];
    }
}

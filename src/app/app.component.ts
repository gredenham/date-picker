import { Component } from '@angular/core';
import { IDateControl, IDateOptions, EnumSelectMode } from './date-picker/date-picker.sheme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public period: IDateControl = {
        min: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-10`),
        max: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-15`)
    };

    public datePickerOptions: IDateOptions = {
        minDate: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-5`),
        maxDate: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-20`),
        // selectMode: EnumSelectMode.period
    };

    public singleDate: Date = new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-12`);

    public datePickerSingleOptions: IDateOptions = {
        minDate: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-5`),
        selectMode: EnumSelectMode.single,
        autoClose: true
    };
}

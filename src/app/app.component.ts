import { Component } from '@angular/core';
import { IDateControl, IDateOptions } from './date-picker/date-picker.component';

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
        maxDate: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-20`)
    };
}

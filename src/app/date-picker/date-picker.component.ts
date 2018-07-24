import { DatePickerService } from './services/date-picker.service';
import { Component, forwardRef, OnInit } from '@angular/core';
import { DatePickerReviewService } from './services/date-picker.review.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerStore } from './services/date-picker.store';

export interface IDateControl {
    min: Date;
    max: Date;
    isActive?: boolean;
}

@Component({
    selector: 'gredenham-date-picker',
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

    public isOpen = false;

    constructor(
        public datePickerService: DatePickerService,
        public datePickerReviewService: DatePickerReviewService,
        private datePickerStore: DatePickerStore
    ) {}

    public ngOnInit() {}

    public writeValue(control: IDateControl) {
        if (this.datePickerReviewService.checkControl(control)) {

            this.datePickerStore.changeSelectedDate(
                    Object.values(control).map((item) => ({
                    day: item.getDate(),
                    month: item.getMonth(),
                    year: item.getFullYear(),
                    full: item
                }))
            );

        }
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

    public confirmChanges(selectedDate) {
        if (selectedDate.length === 1) {
            this.isOpen = false;
            this.propagateChange({
                min: selectedDate[0].full,
                max: selectedDate[0].full,
                isActive: true,
            });
        } else if (selectedDate.length === 2) {
            this.isOpen = false;
            let [min, max] = selectedDate.sort(this.datePickerService.sortDates);
            this.propagateChange({
                min: min.full,
                max: max.full,
                isActive: true
            });
        }
    }

}

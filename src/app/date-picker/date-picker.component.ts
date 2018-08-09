import { DatePickerService } from './services/date-picker.service';
import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { DatePickerReviewService } from './services/date-picker.review.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerStore } from './services/date-picker.store';
import { IDateOptions, IDateControl, ICalendarDay } from './date-picker.sheme';

@Component({
    selector: 'app-gredenham-date-picker',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
    providers: [
        DatePickerStore,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ]
})

export class DatePickerComponent implements OnInit, ControlValueAccessor {

    public isOpen = false;

    @Input() options: IDateOptions = {};

    private currentValue: ICalendarDay[] = [];

    constructor(
        public datePickerService: DatePickerService,
        public datePickerReviewService: DatePickerReviewService,
        private datePickerStore: DatePickerStore
    ) {}

    public ngOnInit() {
        this.datePickerStore.changeOptions(this.options);
        this.datePickerStore.getConfirm.subscribe((date) => {
            this.confirmChanges(date);
        });
    }

    public writeValue(control: IDateControl | Date) {
        if ((!this.options.selectMode || this.options.selectMode === 'period') && this.datePickerReviewService.checkControl(control)) {
            this.currentValue = this.parseControl(Object.values(control));
            this.datePickerStore.changeSelectedDate(<ICalendarDay[]>this.currentValue);
            return;
        }

        if (this.options.selectMode === 'single' && this.datePickerReviewService.checkValidDate(control)) {
            this.currentValue = this.parseControl([<Date>control]);
            this.datePickerStore.changeSelectedDate(<ICalendarDay[]>this.currentValue);
            return;
        }
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

    public confirmChanges(selectedDate) {
        if (this.options.selectMode === 'single') {
            this.isOpen = false;
            this.propagateChange(selectedDate[0].full);
            return;
        }

        if (selectedDate.length === 1) {
            this.isOpen = false;
            this.currentValue = selectedDate;
            this.propagateChange({
                min: selectedDate[0].full,
                max: selectedDate[0].full
            });
        } else if (selectedDate.length === 2) {
            this.isOpen = false;
            const [min, max] = selectedDate.sort(this.datePickerService.sortDates);
            this.currentValue = [min, max];
            this.propagateChange({
                min: min.full,
                max: max.full
            });
        }
    }

    public toggleOpen() {
        this.isOpen = !this.isOpen;
        if (!this.isOpen) {
            this.datePickerStore.changeSelectedDate(<ICalendarDay[]>this.currentValue);
        }
    }

    private parseControl(control: Date[]): ICalendarDay[] {
        return control.map((item: Date) => <ICalendarDay>({
            day: item.getDate(),
            month: item.getMonth(),
            year: item.getFullYear(),
            full: item
        }));
    }

}

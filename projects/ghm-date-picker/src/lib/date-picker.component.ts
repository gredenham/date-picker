import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  OnChanges,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
import { DatePickerService } from './services/date-picker.service';
import { DatePickerReviewService } from './services/date-picker.review.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerStore } from './services/date-picker.store';
import { IDateOptions, IDateControl, ICalendarDay } from './date-picker.sheme';

interface CustomMouseEvent extends MouseEvent {
    data?: {
        toggle: boolean;
    };
}

@Component({
    selector: 'ghm-date-picker',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
    providers: [
        DatePickerStore,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DatePickerComponent implements OnInit, ControlValueAccessor, OnChanges {

    public isOpen = false;

    @Input() options: IDateOptions = {};
    @Input() disable: boolean;

    @ViewChild('selectContainer') selectContainer: ElementRef;

    private currentValue: ICalendarDay[] = [];

    constructor(
        public datePickerService: DatePickerService,
        public datePickerReviewService: DatePickerReviewService,
        public datePickerStore: DatePickerStore,
    ) {}

    public ngOnInit() {
        this.datePickerStore.changeOptions(this.options);
        this.datePickerStore.getConfirm.subscribe((date) => {
            this.confirmChanges(date);
        });
    }

    public ngOnChanges() {
        this.datePickerStore.changeOptions(this.options);
    }

    public writeValue(control: IDateControl | Date) {
        if (
            (!this.options.selectMode || this.options.selectMode === 'period') &&
            control &&
            control['min'] == null &&
            control['max'] == null
        ) {
            this.currentValue = this.parseControl(Object.keys(control).map(key => control[key]));
            this.datePickerStore.changeSelectedDate(<ICalendarDay[]>this.currentValue);
            return;
        }
        if ((!this.options.selectMode || this.options.selectMode === 'period') && this.datePickerReviewService.checkControl(control)) {
            this.currentValue = this.parseControl(Object.keys(control).map(key => control[key]));
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

    public toggleOpen(event: MouseEvent) {
        event.preventDefault();
        if (this.disable) {
            return;
        }
        this.isOpen = !this.isOpen;
        if (!this.isOpen) {
            this.datePickerStore.changeSelectedDate(<ICalendarDay[]>this.currentValue);
        }
        this.setToggleEventData(event);
    }

    @HostListener('document:click', ['$event']) clickOut(e: CustomMouseEvent): void {
        const isToggleEvent = e.data != null && e.data.toggle;
        if (this.isOpen && !isToggleEvent &&
            !this.selectContainer.nativeElement.contains(e.target)) {
            this.isOpen = false;
            this.datePickerStore.changeSelectedDate(<ICalendarDay[]>this.currentValue);
        }
    }

    private setToggleEventData(event) {
        if (!event.data) {
            event.data = {
                toggle: true
            };
        } else {
            event.data.toggle = true;
        }
    }

    private parseControl(control: Date[]): ICalendarDay[] {
        return control.map((item: Date) => {
            if (item == null) {
              return <ICalendarDay>({
                day: null,
                month: null,
                year: null,
                full: null
              });
            }
            return <ICalendarDay>({
              day: item.getDate(),
              month: item.getMonth(),
              year: item.getFullYear(),
              full: item
            });
        });
    }

}

import {
    DatePickerService,
    ICalendarDay
} from './../services/date-picker.service';
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { DatePickerReviewService } from '../services/date-picker.review.service';

@Component({
    selector: 'app-date-picker-calendar',
    styleUrls: ['./date-picker-calendar.component.scss'],
    template: `
        <div *ngFor="let item of datePickerService.getDaysArray(selectedMonth, selectedYear)"
            class="day calendar-day"
            [ngClass]="{
                'clicked-day': reviewService.isSelected(item, selectedDate),
                'today-day': reviewService.isToday(item, date),
                'disabled-day': item === null
            }"
            (click)="selectDate(item)">
            {{ item ? item.day : '' }}
        </div>
    `
})

export class DatePickerCalendarComponent implements OnInit {

    @Input() public selectedYear: number;
    @Input() public selectedMonth: number;
    @Input() public selectedDate: ICalendarDay;
    @Output() public checkSelect: EventEmitter<any> = new EventEmitter();

    public date: Date;

    constructor(
        public ref: ChangeDetectorRef,
        public datePickerService: DatePickerService,
        public reviewService: DatePickerReviewService
    ) {
    }

    ngOnInit() {
        this.date = new Date();
        this.selectedDate = this.selectedDate = {
            day: this.date.getDate(),
            month: this.date.getMonth(),
            year: this.date.getFullYear(),
            full: this.date
        };
    }

    public selectDate(date) {
        this.checkSelect.emit(date);
        this.ref.detectChanges();
    }
}

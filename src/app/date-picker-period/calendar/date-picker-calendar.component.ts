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
                'coincide-day': reviewService.isCoincide(item, selectedDate),
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
    @Input() public selectedDate: ICalendarDay[] = [];
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
    }

    public selectDate(date) {
        const self = this;
        let result = this.selectedDate;

        function defineDate() {
            const index = result.findIndex((item) =>
                ( self.reviewService.isValuesEquals(date, item) )
            );
            if (index >= 0) {
                result.splice(index, 1);
            } else {
                if (result.length < 2) {
                    (result.length === 1 && self.reviewService.isFirstValueSmaller(date, result[0]))
                        ? result.unshift(date)
                        : result.push(date);
                } else if (result.length === 2) {
                    result = [];
                    defineDate();
                }
            }
        }

        if (date) {
            defineDate();
            this.checkSelect.emit(result.sort((prev: ICalendarDay, cur: ICalendarDay) =>
                this.reviewService.isFirstValueSmaller(prev, cur) ? -1 : 1));
            this.ref.detectChanges();
        }
    }
}

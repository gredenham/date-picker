import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

@Component({
    selector: 'app-date-picker-selector',
    styleUrls: ['./date-picker-selector.component.scss'],
    template: `
        <div class="btn-left" (click)="decrementMonth()"></div>
        <div class="title" (click)="isOpen = !isOpen">
            {{selectedMonth | myDatePickerPipe}},<span class="year">{{selectedYear}}</span>
        </div>
        <div class="btn-right" (click)="incrementMonth()"></div>


        <div class="month_list" *ngIf="isOpen">
            <div class="year_switch">
                <div (click)="decrementYear()" class="year_switch-btn-left">&#706;</div>
                <div class="year_switch-value">{{selectedYear}}</div>
                <div (click)="incrementYear()" class="year_switch-btn-right">&#707;</div>
            </div>
            <div (click)="isOpen = false; this.changeMonth.emit(month);" class="month_list-item" *ngFor="let month of monthArray">
                {{month | myDatePickerPipe}}
            </div>
        </div>
    `
})

export class DatePickerSelectorComponent {

    @Input() public selectedYear: number;
    @Input() public selectedMonth: number;
    @Output() public changeYear: EventEmitter<any> = new EventEmitter();
    @Output() public changeMonth: EventEmitter<any> = new EventEmitter();

    public isOpen = false;

    public monthArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    constructor() {
    }

    public incrementYear() {
        const year = this.selectedYear += 1;
        this.changeYear.emit(year);
    }

    public decrementYear() {
        const year = this.selectedYear -= 1;
        this.changeYear.emit(year);
    }

    public incrementMonth() {
        let month;
        let year;
        if (this.selectedMonth < 11) {
            month = this.selectedMonth += 1;
            year = this.selectedYear;
        } else {
            month = this.selectedMonth = 0;
            year = this.selectedYear += 1;
        }
        this.changeMonth.emit(month);
        this.changeYear.emit(year);
    }

    public decrementMonth() {
        let month;
        let year;
        if (this.selectedMonth > 0) {
            month = this.selectedMonth -= 1;
            year = this.selectedYear;
        } else {
            month = this.selectedMonth = 11;
            year = this.selectedYear -= 1;
        }
        this.changeMonth.emit(month);
        this.changeYear.emit(year);
    }
}

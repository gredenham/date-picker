import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerStore } from '../../services/date-picker.store';
import { ICalendarDay, IConfig } from '../../date-picker.sheme';

@Component({
    selector: 'ghm-date-picker-footer',
    styleUrls: ['./date-picker-footer.component.scss'],
    template: `
        <div *ngIf="!options.autoClose" class="bottom-btns">
            <div class="btn-cancel"
                [ngClass]="{'disabled-confirm': selectedDate.length === 0}"
                (click)="datePickerStore.changeSelectedDate([])">
                Reset
            </div>
            <div class="btn-ok"
                [ngClass]="{'disabled-confirm': selectedDate.length === 0}"
                (click)="datePickerStore.confirmDate(selectedDate)">
                OK
            </div>
        </div>
    `
})

export class DatePickerFooterComponent implements OnInit, OnDestroy {

    public selectedDate: ICalendarDay[];

    public options: IConfig;

    private ngUnsubscribe: Subject<void> = new Subject<void> ();

    constructor(
        public datePickerStore: DatePickerStore
    ) {
        this.selectedDate = [];
    }

    public ngOnInit() {
        combineLatest(
            this.datePickerStore.getSelectedDate,
            this.datePickerStore.getOptions
        ).pipe(
            takeUntil(this.ngUnsubscribe)
        ).subscribe(([date, options]) => {
            this.selectedDate = date;
            this.options = options;
        });
    }

    public ngOnDestroy() {
        this.unsubscribe();
    }

    private unsubscribe(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}

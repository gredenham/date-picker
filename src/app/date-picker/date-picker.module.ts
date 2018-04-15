import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerService } from './services/date-picker.service';
import { DatePickerPipe } from './date-picker.pipe';
import { DatePickerSelectorComponent } from './controlls/selector/date-picker-selector.component';
import { DatePickerReviewService } from './services/date-picker.review.service';
import { DatePickerCalendarComponent } from './calendar/date-picker-calendar.component';
import { DatePickerComponent } from './date-picker.component';

const DatePickerComponents = [
    DatePickerComponent,
    DatePickerSelectorComponent,
    DatePickerCalendarComponent,
    DatePickerPipe
];

@NgModule({
    exports: [...DatePickerComponents],
    declarations: [...DatePickerComponents],
    providers: [DatePickerService, DatePickerReviewService],
    imports: [CommonModule],
})

export class DatePickerModule {
}

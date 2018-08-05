import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerService } from './services/date-picker.service';
import { DatePickerPipe } from './pipes/date-picker.pipe';
import { DatePickerSelectorComponent } from './controlls/selector/date-picker-selector.component';
import { DatePickerReviewService } from './services/date-picker.review.service';
import { DatePickerCalendarComponent } from './calendar/date-picker-calendar.component';
import { DatePickerComponent } from './date-picker.component';
import { ObjecToArrayByKeysPipe } from './pipes/object-to-array-by-keys.pipe';
import { DatePickerFooterComponent } from './controlls/footer/date-picker-footer.component';
import { DatePickerDisplayComponent } from './controlls/display/date-picker-display.component';

const DatePickerComponents = [
    DatePickerComponent,
    DatePickerSelectorComponent,
    DatePickerCalendarComponent,
    DatePickerFooterComponent,
    DatePickerDisplayComponent,
    DatePickerPipe,
    ObjecToArrayByKeysPipe
];

const DatePickerServices = [
    DatePickerService,
    DatePickerReviewService
];

@NgModule({
    exports: [...DatePickerComponents],
    declarations: [...DatePickerComponents],
    providers: [...DatePickerServices],
    imports: [CommonModule],
})

export class GredenhamDatePickerModule {}

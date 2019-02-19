export interface IDateControl {
    min: Date;
    max: Date;
}

export enum EnumSelectMode {
    single = 'single',
    period = 'period'
}

export interface IDateOptions {
    minDate?: Date;
    maxDate?: Date;
    selectMode?: EnumSelectMode;
    autoClose?: boolean;
    showWeeksNums?: boolean;
}

export interface IConfig {
    minDate?: ICalendarDay;
    maxDate?: ICalendarDay;
    isModeSingleDate: boolean;
    autoClose: boolean;
    showWeeksNums?: boolean;
}

export interface ICalendarDay {
    day: number;
    month: number;
    year: number;
    full: Date;
}

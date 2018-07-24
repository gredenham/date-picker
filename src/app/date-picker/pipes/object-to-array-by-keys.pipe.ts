import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ObjecToArrayByKeysPipe'
})

export class ObjecToArrayByKeysPipe implements PipeTransform {

    public transform(data: any): any[] {
        return data ? (Object.keys(data).map((v) => Number(v))) : [];
    }
}

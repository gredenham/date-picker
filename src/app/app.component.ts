import { Component } from '@angular/core';

interface IPeriod {
  min: Date;
  max: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public period: IPeriod = {
      min: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-1`),
      max: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-20`)
  };

  public oneDay: Date = (new Date());
}

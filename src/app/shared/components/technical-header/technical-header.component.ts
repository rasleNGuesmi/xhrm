import { Component, Input } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-technical-header',
  templateUrl: './technical-header.component.html',
  styleUrls: ['./technical-header.component.scss']
})
export class TechnicalHeaderComponent {
  @Input()
  title: string = '';
  @Input()
  username: string|null = '';
  @Input()
  avatar: string = '';
  constructor(private translate: TranslateService) {
    this.translate = translate;
  }

  changeLang(event: any) {
    this.translate.use(event.target.value);
  }

}

import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponentComponent  {
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

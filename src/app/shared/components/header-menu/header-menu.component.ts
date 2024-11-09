import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  username: string = '';

  @Input()
  avatar: string = '';
  @Input() sidebarItems: any[];
  @Input() sideBarSettingsItems: any[];
  constructor(private translate: TranslateService) {
    this.translate = translate;
  }
  ngOnInit(): void {}

  changeLang(event: any) {
    this.translate.use(event.target.value);
  }
}

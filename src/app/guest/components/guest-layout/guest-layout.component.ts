import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.scss'],
})
export class GuestLayoutComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate = translate;
  }
  language: String = 'fr';
  ngOnInit(): void {}

  changeLang() {
    if (this.language == 'en') {
      this.translate.use('fr');
      this.language = 'fr';
    } else {
      this.translate.use('en');
      this.language = 'en';
    }
  }
}

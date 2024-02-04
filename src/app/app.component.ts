import { Component } from '@angular/core';
import {NavComponent} from "./nav/nav.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SessionComponent} from "./session/session.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    TranslateModule,
    SessionComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pos';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
    //uncomment this to use browser language
    const browserLang = translate.getBrowserLang();
    // translate.use(browserLang?.match(/en|fr/) ? browserLang : 'en');
  }
}

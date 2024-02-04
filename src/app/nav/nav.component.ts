import { Component } from '@angular/core';
import {Observable} from "rxjs";
import { map, shareReplay } from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {ConfigService} from "../services/config.service";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AsyncPipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ],
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {
  }

  isAuthenticated(): boolean {
    return true;
    // return localStorage.getItem('token') !== null;
  }

  logout() {
    // localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return true;
  //   const access_token = localStorage.getItem('token');
  //   if (this.configService.isNullOrEmptyOrUndefined(access_token)){
  //     return false;
  //   }
  //   const payLoad = JSON.parse(window.atob(access_token.split('.')[1]));
  //   const userRole = payLoad && payLoad.role && payLoad.role.name;
  //   return userRole === 'Admin';
  }
}

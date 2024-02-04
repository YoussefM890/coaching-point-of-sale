import {importProvidersFrom, NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app.config";
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideRouter} from "@angular/router";
import {routes} from "../../routes";
import {provideClientHydration} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"; // adjust this import according to your project structure

const translateServiceStub = {
  // Mock all functions and properties used by your component
  instant: (key: any) => key,
};
const mockDialogData = {
  employee: {}
  // Mock properties that your component expects
};
const mockDialogRef = {

}

@NgModule({
  providers: [
    provideNativeDateAdapter(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(),
    { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
    { provide: MatDialogRef, useValue: mockDialogRef },
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    )
  ]
})
export class SharedTestingModule { }

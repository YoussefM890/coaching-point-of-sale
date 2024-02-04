import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormField} from "../models/classes/formField";
import {TableColumn} from "../models/classes/tableColumn";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private fb: FormBuilder, private dialog: MatDialog) {
  }
  onValueChanged(form: FormGroup, formErrors: any, validationMessages: any): void {
    if (!form) return;

    for (const field in formErrors) {
      if (formErrors.hasOwnProperty(field)) {
        formErrors[field] = '';
        const control = form.get(field);

        if (control && control.touched && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onFilterValueChanged(form: FormGroup, filter: any, callBack? : () => void ): void {
    if (!form) {
      return;
    }
    filter.parseValuesFromForm(form.value);
    callBack();
  }
  createForm(fields: FormField[]): FormGroup {
    const group = this.fb.group({});
    fields.forEach((field) => {
      group.addControl(field.name, this.fb.control(field.initialValue || ''));
    });
    return group;
  }
  // openFullScreenDialog(component: any, data?: any): void {
  //   const dialogRef = this.dialog.open(component, {
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '100%',
  //     width: '100%',
  //     data: data // Optional data you can pass to the dialog component
  //   });
  // }
  }

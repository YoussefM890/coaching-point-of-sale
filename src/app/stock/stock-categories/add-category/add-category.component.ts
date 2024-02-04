import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {debounceTime, Subscription} from "rxjs";
import {ConfigService} from "../../../services/config.service";
import {CategoryFormErrors, CategoryValidationMessages} from "../../../models/form-validation/categoryFormValidation";
import {dummyCategories, dummyCategoryIcons} from "../../../models/dummyData";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogClose,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSlideToggle,
    MatSuffix,
    MatToolbar,
    MatTooltip,
    ReactiveFormsModule,
    TranslateModule,
    NgClass
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formErrors = CategoryFormErrors;
  validationMessages = CategoryValidationMessages;
  availableIcons = dummyCategoryIcons;
  selectedIcon: string = '';
  private valueChangeSubscription: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private configService : ConfigService,
              // private toastr: ToastrService,
              private dialogRef: MatDialogRef<AddCategoryComponent>) {
  }

  ngOnInit(): void {
    this.createForm(this.data);
  }
  createForm(data: any = null) {
    this.form = this.fb.group({
      name: [data ? data.category.name : null, [Validators.required]],
      description: [data ? data.category.description : null, [Validators.required]],
      icon: [data ? data.category.icon : null, [Validators.required]],
    });
    this.valueChangeSubscription = this.form.valueChanges.pipe(
      debounceTime(300))
      .subscribe((data) => {
      this.configService.onValueChanged(this.form, this.formErrors, this.validationMessages);
    });
  }
  addCategory() {
    this.dialogRef.close(this.form.value);
  }
  ngOnDestroy(): void {
    this.valueChangeSubscription.unsubscribe();
  }
  selectIcon(icon: string) {
    this.iconControl.setValue(icon);
  }
  get iconControl() {
    return this.form.get('icon');
  }

}

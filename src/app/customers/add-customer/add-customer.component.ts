import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConfigService} from "../../services/config.service";
import {debounceTime, Subscription} from "rxjs";
import {customerFormErrors, customerValidationMessages} from "../../models/form-validation/customerFormValidation";
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {TranslateModule} from "@ngx-translate/core";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {genders} from "../../models/enums/gender";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {dummyCustomers, dummyPricelists} from "../../models/dummyData";
import {Pricelist} from "../../models/classes/pricelist";

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose,
    MatToolbar,
    ReactiveFormsModule,
    TranslateModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent implements OnInit, OnDestroy{

  private valueChangeSubscription: Subscription;
  form: FormGroup;
  formErrors = customerFormErrors;
  validationMessages = customerValidationMessages;
  pricelists :Pricelist[] = dummyPricelists
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private configService: ConfigService,
              // private toastr: ToastrService,
              private dialogRef: MatDialogRef<AddCustomerComponent>) {
  }
  ngOnInit(): void {
    this.createForm(this.data);
  }

  createForm(data: any = null) {
    this.form = this.fb.group({
      name: [data?.name, Validators.required],
      email: [data?.email, Validators.required],
      // phone: [data?.phone, Validators.required],
      // address: [data?.address, Validators.required],
      pricelist_id: [data?.price_list_id ?? 0, Validators.required],
    });
    this.valueChangeSubscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.configService.onValueChanged(this.form, this.formErrors, this.validationMessages);
      });
  }

  addCustomer() {
    const value : any = {...this.form.value};
    value.id = dummyCustomers.length + 1;
    this.dialogRef.close(value);
  }
  ngOnDestroy() {
    this.valueChangeSubscription.unsubscribe();
  }

  protected readonly genders = genders;
}

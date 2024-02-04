import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ConfigService} from "../../services/config.service";
import {employeeFormErrors, employeeValidationMessages} from "../../models/form-validation/employeeFormValidation";
import {debounceTime, Subscription} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {deep_copy} from "../../models/functions";
import {contractTypes} from "../../models/enums/contractType";
import {genders} from "../../models/enums/gender";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogClose,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    TranslateModule,
    MatSlideToggleModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit, OnDestroy {

  private valueChangeSubscription: Subscription;
  protected readonly genders = genders;
  form: FormGroup
  formErrors = employeeFormErrors
  validationMessages = employeeValidationMessages

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private configService: ConfigService,
              // private toastr: ToastrService,
              private dialogRef: MatDialogRef<AddEmployeeComponent>) {
  }

  ngOnInit(): void {
    this.createForm(this.data);
  }

  createForm(data: any = null) {
    this.form = this.fb.group({
      number: [data ? data.employee.number : null, [Validators.required]],
      first_name: [data ? this.first_name : null, [Validators.required]],
      last_name: [data ? this.last_name : null, [Validators.required]],
      gender: [data ? data.employee.gender : null, [Validators.required]],
      phone: [data ? data.employee.phone : null, [Validators.required]],
      job_position: [data ? data.employee.job_position : null, [Validators.required]],
      birth_date: [data ? data.employee.birth_date : null, [Validators.required]],
      address: [data ? data.employee.address : null, [Validators.required]],
      contract_type: [data ? data.contract_type : contractTypes[0].value, [Validators.required]],
      cnss_registration_number: [data ? data.cnss_registration_number : null, [Validators.required]],
      is_active: [data ? data.employee.active : true, [Validators.required]]
    });
    this.valueChangeSubscription = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(data => {
      this.configService.onValueChanged(this.form, this.formErrors, this.validationMessages);
    });
  }

  addEmployee() {
    //close dialog and return the form value
    const value = deep_copy(this.form.value);
    value.name = value.first_name + ' ' + value.last_name;
    this.dialogRef.close(value);
    // this.employeeToAdd = this.configService.deep_copy(this.form.value);
    // this.employeeToAdd.company_id = this.data.company_id;
    // this.employeesService.addPrime(this.employeeToAdd).subscribe(
    //   (res: any) => {
    //     if (res.status === 201) {
    //       this.toastr.success('Prime créée avec succès');
    //       this.dialogRef.close();
    //     } else {
    //       this.toastr.error(res.message);
    //     }
    //
    //   },
    //   (err) => {
    //     this.toastr.error("Un problème est survenu. veuillez réessayer plus tard.");
    //   }
    // );
  }

  get first_name(): string {
    return this.data.employee.name.split()[0]
  }

  get last_name(): string {
    return this.data.employee.name.split()[1]
  }

  ngOnDestroy() {
    this.valueChangeSubscription.unsubscribe();
  }

  //TODO : Add form messages to i18n
  protected readonly contractTypes = contractTypes;
}

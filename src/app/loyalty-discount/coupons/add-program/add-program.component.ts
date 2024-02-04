import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {debounceTime, of, Subscription} from "rxjs";
import {ConfigService} from "../../../services/config.service";
import {ProgramType, programTypes} from "../../../models/enums/programType";
import {dummyProducts, dummyPrograms} from "../../../models/dummyData";
import {programFormErrors, programValidationMessages} from "../../../models/form-validation/programFormValidation";
import {Coupon} from "../../../models/classes/coupon";
import {generateRandomCode} from "../../../models/functions";
import {CouponStatus} from "../../../models/enums/couponStatus";
import {BuyXGetY} from "../../../models/classes/buyXGetY";
import {BuyXGetYStatus} from "../../../models/enums/buyXGetYStatus";
import {Program} from "../../../models/classes/program";
@Component({
  selector: 'app-add-program',
  standalone: true,
  imports: [
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
    TranslateModule
  ],
  templateUrl: './add-program.component.html',
  styleUrl: './add-program.component.scss'
})
export class AddProgramComponent implements OnInit, OnDestroy {
  form: FormGroup
  formErrors = programFormErrors
  validationMessages = programValidationMessages
  programTypes = programTypes
  products = dummyProducts
  private valueChangeSubscription: Subscription;
  protected readonly ProgramType = ProgramType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private configService: ConfigService,
              // private toastr: ToastrService,
              private dialogRef: MatDialogRef<AddProgramComponent>) {
  }

  ngOnInit(): void {
    this.createForm(this.data);
  }

  createForm(data: any = null) {
    this.form = this.fb.group({
      name: [data ? data.name : null, Validators.required],
      description: [data ? data.description : null, Validators.required],
      discount: [data ? data.discount : null, Validators.required],
      start_date: [data ? data.start_date : null, Validators.required],
      end_date: [data ? data.end_date : null, Validators.required],
      type: [data ? data.type : programTypes[0].value, Validators.required],
      count: [data ? data.count : null, Validators.required],
    });
    this.valueChangeSubscription = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.configService.onValueChanged(this.form, this.formErrors, this.validationMessages);
      });
    //on type change
    this.typeControl.valueChanges.subscribe((value: ProgramType) => {
      this.updateFormForType(value);
    });
  }

  updateFormForType(programType: ProgramType) {
    if (this.form.contains('discount')) {
      this.form.removeControl('discount');
    }
    if (this.form.contains('buy')) {
      this.form.removeControl('buy');
      this.form.removeControl('get');
    }
    if (programType === ProgramType.Coupon) {
      this.form.addControl('discount', this.fb.control(null, Validators.required));
    } else if (programType === ProgramType.BuyXGetY) {
      this.form.addControl('buy', this.fb.control(null, Validators.required));
      this.form.addControl('get', this.fb.control(null, Validators.required));
    }
  }

  addProgram() {
    console.log("working")
    const formValue = this.form.value;
    const items = [];
    const count = formValue.count;

    for (let i = 0; i < count; i++) {
      if (formValue.type === ProgramType.Coupon) {
        let coupon = new Coupon();
        coupon.code = generateRandomCode();
        coupon.discount = formValue.discount;
        coupon.status = CouponStatus.Active;
        items.push(coupon);
      } else if (formValue.type === ProgramType.BuyXGetY) {
        let buyXGetY = new BuyXGetY();
        buyXGetY.code = generateRandomCode();
        buyXGetY.buy = formValue.buy;
        buyXGetY.get = formValue.get;
        buyXGetY.status = BuyXGetYStatus.Active;
        items.push(buyXGetY);
      }
    }

    let newProgram = new Program();
    newProgram.id = dummyPrograms.length + 1;
    newProgram.name = formValue.name;
    newProgram.description = formValue.description;
    newProgram.start_date = formValue.start_date;
    newProgram.end_date = formValue.end_date;
    newProgram.type = formValue.type;
    newProgram.lines = items;

    this.dialogRef.close(newProgram)
  }

  get typeControl() {
    return this.form.get('type');
  }

  ngOnDestroy() {
    this.valueChangeSubscription.unsubscribe();
  }
}

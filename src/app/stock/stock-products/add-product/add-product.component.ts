import {Component, Inject, OnInit} from '@angular/core';
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
import {contractTypes} from "../../../models/enums/contractType";
import {ConfigService} from "../../../services/config.service";
import {productFormErrors, productValidationMessages} from "../../../models/form-validation/productFormValidation";
import {dummyCategories} from "../../../models/dummyData";

@Component({
  selector: 'app-add-product',
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
    TranslateModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{

  protected readonly contractTypes = contractTypes;
  form : FormGroup
  formErrors = productFormErrors
  validationMessages = productValidationMessages
  categories = dummyCategories
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private configService : ConfigService,
              // private toastr: ToastrService,
              private dialogRef: MatDialogRef<AddProductComponent>) {
  }
  ngOnInit() {
    this.createForm(this.data)
  }
  createForm(data:any = null){
    this.form = this.fb.group({
      name:[data ? data.product.name : null, [Validators.required]],
      description:[data ? data.product.description : null, [Validators.required]],
      category:[data ? data.product.category : this.categories[0].name, [Validators.required]],
      price : [data ? data.product.price : null, [Validators.required]],
      quantity : [data ? data.product.quantity : null, [Validators.required]],
      image : [data ? data.product.image_path : null, [Validators.required]]
    })
  }
  addProduct(){
    this.dialogRef.close(this.form.value)
  }
  get imageControl(){
    return this.form.get('image')

  }
  onImageSelected(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.imageControl.setValue(reader.result);
      reader.readAsDataURL(file);
    }
  }
}

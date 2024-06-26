import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatTooltip} from "@angular/material/tooltip";
import {ErrorWarning, ImportField} from "../../models/classes/ImportField";
import {Papa} from 'ngx-papaparse';
import {ImportEmployeesData} from "../../models/dialog-data-interfaces/importEmployeesData";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {errorFunctions, validatorFunctions} from "../../models/possible-fields/ImportEmployeeFields";
import {Validator} from "../../models/enums/Validator";
import {calculateSimilarity, mapArrayToKeyObjectPair, transposeMatrix} from "../../models/functions";

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatIconModule,
    MatSelect,
    MatOption,
    MatError,
    MatProgressSpinner,
    MatTooltip,
    TranslateModule
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss'
})
export class ImportComponent implements OnInit {
  file: File = null;
  loaded: boolean = true;
  warning: string = '';
  errors: string = '';
  matchedValuesChanged: boolean = true;
  matchingForm: FormGroup;
  possibleFields: ImportField[];
  possibleFieldToCsvIndexMap: any = {};
  csvFields: string[] = [];
  rows: [][] = [];
  @ViewChild('importTimesheetForm') importTimesheetFormDirective: any;
  @ViewChild('matchingForm') matchingFormDirective: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private papa: Papa,
              public dialogRef: MatDialogRef<ImportComponent>,
              public fb: FormBuilder,
  ) {
    //extract the value from data.possibleFields and ge
    this.possibleFields = data.possibleFields
  }

  ngOnInit() {
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
      this.prepare();
    } else {
      this.file = null;
    }
  }

  prepare() {
    if (this.file) {
      this.loaded = false;
      this.warning = null;
      this.papa.parse(this.file, {
        skipEmptyLines: 'greedy',
        complete: (res) => {
          this.csvFields = res.data[0];
          this.rows = res.data.slice(1);
          this.createMatchingForm()
          this.autoMatch();
          this.loaded = true;
        },
        error: (error) => {
          this.warning = `File parsing error: ${error.message}`;
          this.loaded = true;
        }
      });
    } else {
      // this.toastr.error('Merci de choisir un fichier!');
    }
  }

  upload(force_upload: boolean = false) {
    this.validateData();
    this.matchedValuesChanged = false;
    if (this.errors === '') {
      if (force_upload || this.warning === '') {
        this.dialogRef.close();
      }
    }
  }

  exportWarning() {
  }

  private createMatchingForm(): void {
    const group: any = {};
    this.csvFields.forEach(field => {
      group[field] = new FormControl(null)
    });
    this.matchingForm = this.fb.group(group);
    this.matchingForm.valueChanges.pipe().subscribe((data) => {
      this.onMatchingFormValueChanged(data);
    });
  }

  private onMatchingFormValueChanged(data?: ImportEmployeesData) {
    this.matchedValuesChanged = true;
    const used_values = Object.values(this.matchingForm.value).filter(o => o != null);
    this.possibleFields.forEach(field => {
      field.disabled = used_values.includes(field.value);
    });
    this.possibleFields.sort((a, b) => {
      if (a.disabled && !b.disabled) return 1;
      if (!a.disabled && b.disabled) return -1;
      return 0;
    });
  }

  private autoMatch() {
    const formValue = {...this.matchingForm.value};
    const edgesList = [];
    for (const csvField of this.csvFields) {
      for (const possibleField of this.possibleFields) {
        const similarity = calculateSimilarity(csvField.toLowerCase(), possibleField.viewValue.toLowerCase());
        // console.log(similarity, '('+csvField, possibleField.viewValue+')')
        if (similarity > 0.4) {
          edgesList.push([csvField, possibleField.value, similarity]);
        }
      }
    }
    edgesList.sort((a, b) => b[2] - a[2] );
    const connectionsA: { [key: string]: string } = {};
    const connectionsB: { [key: string]: string } = {};
    for (const edge of edgesList) {
      const [nodeA, nodeB, weight] = edge;
      if (!connectionsA[nodeA] && !connectionsB[nodeB]) {
        formValue[nodeA] = nodeB;
        connectionsA[nodeA] = nodeB;
        connectionsB[nodeB] = nodeA;
      }
    }

    this.matchingForm.patchValue(formValue);
    this.onMatchingFormValueChanged()
  }

  private validateData(): void {
    this.errors = '';
    this.warning = '';
    this.validateMatchingForm();
    const data = this.generateObject();
    const possibleFields  = mapArrayToKeyObjectPair(this.possibleFields, 'value')
    Object.entries(data).forEach(([possibleFieldValue, row]: [string, string[]]) => {
      const possibleField = possibleFields[possibleFieldValue]
      possibleField.validators.forEach((validator :any) => {  //TODO: replace any with Validator after removing the ErrorWarning enum
        row.forEach((value, rowIndex) => {
          const isValid = validatorFunctions[validator[0]](value);
          if (!isValid) {
            if (validator[1] === ErrorWarning.Error) {  //TODO : Same update this logic after removing the ErrorWarning enum
              this.errors += `Row ${rowIndex + 1}: ${errorFunctions[validator[0]](possibleField.viewValue)} \n`;
            } else {
              this.warning += `Row ${rowIndex + 1}: ${errorFunctions[validator[0]](possibleField.viewValue)} \n`;
            }
          }
        });
      });
    });
  }

  private validateMatchingForm(): void {
    const used_fields = Object.values(this.matchingForm.value).filter(o => o != null);
    const required_fields = this.possibleFields.filter(field => field.validators.some(validator => validator[0] === Validator.Required));
    required_fields.forEach(field => {
      if (!used_fields.includes(field.value)) {
        this.errors += `${field.viewValue} is required. \n`;
      }
    });
  }
  private generateObject(): { [key: string]: string[] } {
    const transposedRows = transposeMatrix(this.rows);
    const generatedObject = {};
    Object.entries(this.matchingForm.value).forEach(([key, value]: [string, string]) => {
      if (value) {
        generatedObject[value] = transposedRows[this.csvFields.indexOf(key)];
      }
    });
    return generatedObject;
  }
}

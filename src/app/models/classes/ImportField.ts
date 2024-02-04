import {Validator} from "../enums/Validator";

export class ImportField {
  value: string;
  viewValue: string;
  disabled: boolean = false;
  validators: Validator[] = [];
}

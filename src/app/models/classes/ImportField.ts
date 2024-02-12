import { Validator } from "../enums/Validator";

//TODO: this enum is temporary
export enum ErrorWarning {
  Error = 'error',
  Warning = 'warning',
}

export class ImportField {
  value: string;
  viewValue: string;
  disabled: boolean = false;
  validators: Array<[Validator, ErrorWarning]> = [];
}

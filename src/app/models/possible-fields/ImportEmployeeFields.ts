import {ImportField} from "../classes/ImportField";
import {createImportField} from "../functions";
import {Validator} from "../enums/Validator";

export const fields : Partial<ImportField>[] = [
  {
    value:'number',
    viewValue:'Number',
    validators: [Validator.Number, Validator.Required],
  },
  {
    value: 'name',
    viewValue: 'Name',
    validators: [Validator.Required],
  },
];

export const employeePossibleFields : ImportField[] = fields.map(config => createImportField(config));


export const validatorFunctions = {
  required: (value: any): boolean => {
      return  value !== null && value !== undefined && value !== '';
  },
  number: (value: any): boolean => {
    return  !isNaN(parseFloat(value)) && isFinite(value);
  },

  // ... more validators as needed
};
export const errorFunctions = {
  required:(viewValue:any) : string => viewValue +' field is required.',
  number:(viewValue:any) : string => viewValue +' field must be a number.',
}

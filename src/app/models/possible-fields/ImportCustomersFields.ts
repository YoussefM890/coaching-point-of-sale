import {ErrorWarning, ImportField} from "../classes/ImportField";
import {Validator} from "../enums/Validator";
import {createImportField} from "../functions";

export const fields : Partial<ImportField>[] = [
  {
    value: 'name',
    viewValue: 'Name',
    validators: [[Validator.Required,ErrorWarning.Error]],
  },
  {
    value:'email',
    viewValue:'Email',
    validators: [[Validator.Required,ErrorWarning.Error]], //TODO update the validator after removing the ErrorWarning enum
  },
  {
    value: 'pricelist',
    viewValue: 'Pricelist',
    validators: [[Validator.Required,ErrorWarning.Error]],
  }
];
export const customerPossibleFields : ImportField[] = fields.map(config => createImportField(config));

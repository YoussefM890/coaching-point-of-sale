import {PaginationFilter} from "./paginationFilter";
import {FormField} from "../classes/formField";
import {createFormField} from "../functions";

export class CustomerFilter extends PaginationFilter {
  name_substr?: string;
  constructor() {
    super();
    this.filter_fields = this.filter_fields.concat([
      'name_substr',
    ]);
  }
}
export class  CustomerFilterFormField extends FormField {
}
const fields: Partial<CustomerFilterFormField>[] = [
  {
    name: 'name_substr',
    placeholder: 'Name',
  },
];

export const customerFilterFormFields: CustomerFilterFormField[] = fields.map(config => createFormField(CustomerFilterFormField,config));

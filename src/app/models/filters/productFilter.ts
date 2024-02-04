import {PaginationFilter} from "./paginationFilter";
import {FormField} from "../classes/formField";
import {createFormField} from "../functions";

export class ProductFilter extends PaginationFilter {
    name_substr?: string;
    category_substr?: string;
    price_min?: number;
    price_max?: number;
    quantity_min?: number;
    quantity_max?: number;

    constructor() {
        super();
        this.filter_fields = this.filter_fields.concat([
          'name_substr',
          'category_substr',
          'price_min',
          'price_max',
          'quantity_min',
          'quantity_max',
        ]);
    }
}
export class   ProductFilterFormField extends FormField {
  override width: string = "15%"
}
const fields: Partial<ProductFilterFormField>[] = [
  {
    name: 'name_substr',
    placeholder: 'Name',
  },
  {
    name: 'category_substr',
    placeholder: 'Category',
  },
  {
    name: 'price_min',
    placeholder: 'Min Price',
    type: 'number',
  },
  {
    name: 'price_max',
    placeholder: 'Max Price',
    type: 'number',
  },
  {
    name: 'quantity_min',
    placeholder: 'Min Quantity',
    type: 'number',
  },
  {
    name: 'quantity_max',
    placeholder: 'Max Quantity',
    type: 'number',
  },
];

export const productFilterFormFields: ProductFilterFormField[] = fields.map(config => createFormField(ProductFilterFormField,config));

import {PaginationFilter} from "./paginationFilter";

export class CategoryFilter extends PaginationFilter {
  name_substr?:string;
  constructor() {
    super();
    this.filter_fields = this.filter_fields.concat([
      'name_substr',
    ]);
  }
}

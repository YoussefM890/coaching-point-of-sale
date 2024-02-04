import {PaginationFilter} from "./paginationFilter";

export class EmployeeFilter extends PaginationFilter {
    cin_substr?: string;
    name_substr?: string;

    constructor() {
        super();
        this.filter_fields = this.filter_fields.concat([
          'cin_substr',
          'name_substr',
        ]);
    }
}

import {PaginationFilter} from "./paginationFilter";

export class SessionFilter extends PaginationFilter {
    openedBy_substr?: string;
    status?: string;
    constructor() {
        super();
        this.filter_fields = this.filter_fields.concat([
            'openedBy_substr',
            'status',
        ]);
    }
}

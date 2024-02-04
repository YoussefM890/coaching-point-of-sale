import {isNullOrEmptyOrUndefined} from "../functions";


export class BaseFilter {
    filter_fields: string[];
    pagination_fields: string[];
    constructor() {
        this.filter_fields = [];
        this.pagination_fields = [];
    }

    getUrlEquivalent(): string {
        const params: string[] = [];
        const url_fields = [this.filter_fields, this.pagination_fields];
        for (const url_field of url_fields) {
            for (const key of url_field) {
                if (this[key]) {
                    params.push(`${key}=${this[key]}`);
                }
            }
        }

        return params ? '?' + params.join('&') : '';
    }

    isEmpty(): boolean {
        for (const key of this.filter_fields) {
            if (this[key] && !isNullOrEmptyOrUndefined(this[key])) {
                return false;
            }
        }
        return true;
    }

    parseValuesFromForm(form_values: any): void {
        for (const field in form_values) {
            this[field] = isNullOrEmptyOrUndefined(form_values[field]) ? null : form_values[field];
        }
    }
}

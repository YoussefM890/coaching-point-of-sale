import {TableColumn} from "../classes/tableColumn";
import {TableColumnType} from "../enums/tableColumnType";
import {CssClass} from "../enums/CssClass";
import {createTableColumn} from "../functions";

const fields:Partial<TableColumn>[] = [
  {
    value:'number',
    viewValue:'Number',
  },
  {
    value: 'name',
    viewValue: 'Name',
  },
  {
    value:'gender',
    viewValue : 'Gender',
  },
  {
    value:'phone',
    viewValue:'Phone',
  },
  {
    value:'job_position',
    viewValue:'Job Position',
  },
  {
    value: 'edit',
    viewValue: 'Edit',
    type: TableColumnType.Icon,
    onClickMethodName: "openEditEmployee",
    childClasses: [CssClass.EditIcon],
    icon  : 'edit',
  },
  {
    getValue: (arg) => arg ? 'Active' : 'Inactive',
    value: 'is_active',
    viewValue: 'Status',
    type: TableColumnType.Icon,
    childClasses: [CssClass.DeleteIcon],
    getIcon: (arg) => arg.is_active ? 'check' : 'close'
  }
];
export const employeeColumns : TableColumn[] = fields.map(config => createTableColumn(config));

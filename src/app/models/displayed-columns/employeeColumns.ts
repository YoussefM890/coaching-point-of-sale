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
    icon: 'edit',
    onClickMethodName: "openEditEmployee",
    childClasses: [CssClass.EditIcon]
  },
  {
    value: 'delete',
    viewValue: 'Delete',
    type: TableColumnType.Icon,
    icon: 'delete',
    onClickMethodName: "openDeleteEmployee",
    childClasses: [CssClass.DeleteIcon]
  }
];
export const employeeColumns : TableColumn[] = fields.map(config => createTableColumn(config));

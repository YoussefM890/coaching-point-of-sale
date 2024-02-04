import {TableColumn} from "../classes/tableColumn";
import {TableColumnType} from "../enums/tableColumnType";
import {CssClass} from "../enums/CssClass";
import {createTableColumn} from "../functions";


const fields:Partial<TableColumn>[] = [
  {
    value:'id',
    viewValue:'Session Id',
  },
  {
    value: 'employee_name',
    viewValue: 'Opened By',
  },
  {
    value: 'opened_at',
    viewValue: 'Opened At',
    type: TableColumnType.Date
  },
  {
    value: 'closed_at',
    viewValue: 'Closed At',
    type: TableColumnType.Date

  },
  {
    value: 'status',
    viewValue: 'Status',
  },
  {
    value: 'edit',
    viewValue: 'Edit',
    type: TableColumnType.Icon,
    icon: 'edit',
    onClickMethodName: "openEditSession",
    childClasses: [CssClass.EditIcon]
  },
  {
    value: 'delete',
    viewValue: 'Delete',
    type: TableColumnType.Icon,
    icon: 'delete',
    onClickMethodName: "openDeleteSession",
    childClasses: [CssClass.DeleteIcon]
  }
]
export const sessionColumns : TableColumn[] = fields.map(config => createTableColumn(config));

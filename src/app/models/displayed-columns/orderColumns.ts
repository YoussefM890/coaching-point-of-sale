import {TableColumn} from "../classes/tableColumn";
import {TableColumnType} from "../enums/tableColumnType";
import {createTableColumn} from "../functions";
import {CssClass} from "../enums/CssClass";

const fields:Partial<TableColumn>[] = [
  {
    value:'order_ref',
    viewValue:'Order Ref',
  },
  {
    value : 'session_id',
    viewValue: 'Session',
  },
  {
    value: 'date',
    viewValue: 'Date',
    type: TableColumnType.Date,
  },
  {
    value: 'receipt_number',
    viewValue: 'Receipt Number',
  },
  {
    value:'employee_name',
    viewValue:'Employee',
  },
  {
    value:'customer_name',
    viewValue:'Customer',
  },
  {
    value:'total',
    viewValue:'Total',
  },
  {
    value: 'edit',
    viewValue: 'Edit',
    type: TableColumnType.Icon,
    icon: 'edit',
    childClasses: [CssClass.EditIcon],
    onClickMethodName: "openEditOrder",
  },
  {
    value: 'delete',
    viewValue: 'Delete',
    type: TableColumnType.Icon,
    icon: 'delete',
    childClasses: [CssClass.DeleteIcon],
    onClickMethodName: "openDeleteOrder",
  }
]
export const orderColumns : TableColumn[] = fields.map(config => createTableColumn(config));

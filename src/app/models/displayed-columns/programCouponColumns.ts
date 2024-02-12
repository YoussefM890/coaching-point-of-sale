import {TableColumn} from "../classes/tableColumn";
import {createTableColumn} from "../functions";
import {TableColumnType} from "../enums/tableColumnType";
import {CssClass} from "../enums/CssClass";

const fields:Partial<TableColumn>[] = [
  {
    value:'code',
    viewValue:'Code',
  },
  {
    value: 'discount',
    viewValue: 'Discount',
  },
  {
    value: 'status',
    viewValue: 'Status',
  },
  {
    value: 'edit',
    viewValue: 'Send',
    type: TableColumnType.Icon,
    icon  :  'send',
    onClickMethodName: "openEditProgramLine",
    childClasses: [CssClass.EditIcon]
  },
  {
    value: 'delete',
    viewValue: 'Print',
    type: TableColumnType.Icon,
    icon  :  'local_printshop',
    onClickMethodName: "openDeleteProgramLine",
    childClasses: [CssClass.EditIcon]
  }
]
export const programCouponColumns : TableColumn[] = fields.map(config => createTableColumn(config));

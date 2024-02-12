import {TableColumn} from "../classes/tableColumn";
import {createTableColumn} from "../functions";
import {TableColumnType} from "../enums/tableColumnType";
import {CssClass} from "../enums/CssClass";

export const fields:Partial<TableColumn>[] = [
  {
    value:'code',
    viewValue:'Code',
  },
  {
    value: 'buy_name',
    viewValue: 'Buy',
  },
  {
    value: 'get_name',
    viewValue: 'Get',
  },
  {
    value: 'status',
    viewValue: 'Status',
  },
  {
    value: 'edit',
    viewValue: 'Send',
    type: TableColumnType.Icon,
    icon : 'send',
    onClickMethodName: "openEditProgramLine",
    childClasses: [CssClass.EditIcon]
  },
  {
    value: 'delete',
    viewValue: 'Print',
    type: TableColumnType.Icon,
    icon:  'local_printshop',
    onClickMethodName: "openDeleteProgramLine",
    childClasses: [CssClass.EditIcon]
  }
]
export const programBuyXGetYColumns : TableColumn[] = fields.map(config => createTableColumn(config));

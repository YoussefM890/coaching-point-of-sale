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
    value: 'buy',
    viewValue: 'Buy',
  },
  {
    value: 'get',
    viewValue: 'Get',
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
    onClickMethodName: "openEditProgramLine",
    childClasses: [CssClass.EditIcon]
  },
  {
    value: 'delete',
    viewValue: 'Delete',
    type: TableColumnType.Icon,
    icon: 'delete',
    onClickMethodName: "openDeleteProgramLine",
    childClasses: [CssClass.DeleteIcon]
  }
]
export const programBuyXGetYColumns : TableColumn[] = fields.map(config => createTableColumn(config));

import {TableColumn} from "../classes/tableColumn";
import {createTableColumn} from "../functions";
import {TableColumnType} from "../enums/tableColumnType";
import {CssClass} from "../enums/CssClass";

const fields:Partial<TableColumn>[] = [
  {
    value:'name',
    viewValue:'Name',
  },
  {
    value: 'email',
    viewValue: 'Email',
  },
  {
    value: 'edit',
    viewValue: 'Edit',
    type: TableColumnType.Icon,
    icon  : 'edit',
    onClickMethodName: "openEditCustomer",
    childClasses: [CssClass.EditIcon]
  },
  {
    value: 'delete',
    viewValue: 'Delete',
    type: TableColumnType.Icon,
    icon : 'delete',
    onClickMethodName: "openDeleteCustomer",
    childClasses: [CssClass.DeleteIcon]
  }
]
export const customerColumns : TableColumn[] = fields.map(config => createTableColumn(config));

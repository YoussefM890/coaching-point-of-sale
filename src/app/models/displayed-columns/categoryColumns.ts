import {TableColumn} from "../classes/tableColumn";
import {TableColumnType} from "../enums/tableColumnType";
import {createTableColumn} from "../functions";
import {CssClass} from "../enums/CssClass";

const fields:Partial<TableColumn>[] = [
  {
    value : 'name',
    viewValue : 'Category Name',
  },
  {
    value : 'description',
    viewValue : 'Description',
  },
  {
    value : 'icon',
    viewValue : 'Icon',
    type : TableColumnType.Icon,
  },
  {
    value : 'edit',
    viewValue : 'Edit',
    type : TableColumnType.Icon,
    getIcon: (arg) => 'edit',
    onClickMethodName : 'openEditCategory',
    childClasses : [CssClass.EditIcon]
  },
  {
    value : 'delete',
    viewValue : 'Delete',
    type : TableColumnType.Icon,
    getIcon: (arg) => 'delete',
    onClickMethodName : 'openDeleteCategory',
    childClasses : [CssClass.DeleteIcon]
  }
]
export const categoryColumns : TableColumn[] = fields.map(config => createTableColumn(config));

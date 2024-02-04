import {TableColumn} from "../classes/tableColumn";
import {createTableColumn} from "../functions";
import {TableColumnType} from "../enums/tableColumnType";
import {CssClass} from "../enums/CssClass";

export const fields:Partial<TableColumn>[] = [
  {
    value: 'product_name',
    viewValue: 'Product Name'
  },
  {
    value: 'price',
    viewValue: 'Price'
  },
  {
    value: 'min_quantity',
    viewValue: 'Minimum Quantity'
  },
  {
    value: 'start_date',
    viewValue: 'Start Date',
    type:TableColumnType.Date
  },
  {
    value: 'end_date',
    viewValue:'End Date',
    type:TableColumnType.Date
  },
  {
    value: 'edit',
    viewValue: 'Edit',
    type: TableColumnType.Icon,
    icon: 'edit',
    childClasses: [CssClass.EditIcon],
    onClickMethodName: "openEditPricelist",
  },
  {
    value: 'delete',
    viewValue: 'Delete',
    type: TableColumnType.Icon,
    icon: 'delete',
    childClasses: [CssClass.DeleteIcon],
    onClickMethodName: "openDeletePricelist",
  }
]
export const pricelistProductColumns : TableColumn[] = fields.map(config => createTableColumn(config));


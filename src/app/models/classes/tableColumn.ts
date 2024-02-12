import {TableColumnType} from "../enums/tableColumnType";
import {CssClass} from "../enums/CssClass";
export class TableColumn {
  value : string
  viewValue : string
  type : TableColumnType  = TableColumnType.Text
  icon? : string = null;
  useTranslation?: boolean = false;
  staticValue?: string = null;
  parentClasses: (CssClass | string)[] = [];
  childClasses: (CssClass | string)[] = [];
  onClickMethodName?: string = null;
  getValue?: (arg?: any) => string;
  getIcon?:(arg? : any) => string;
  onClick?:(arg?:any) => void = () => {};
}
export function getDisplayedColumns(columns : TableColumn[]) : string[] {
  return columns.map(col => col.value)
}
export function mapMethods(classInstance : any, columns : TableColumn[] = null){
  if (!columns) {
    columns = classInstance.columns;
  }
  columns.forEach(col => {
    if (col.onClickMethodName) {
      col.onClick = classInstance[col.onClickMethodName].bind(classInstance);
    }

  });
}

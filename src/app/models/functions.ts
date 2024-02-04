import {FormField} from "./classes/formField";
import {TableColumn} from "./classes/tableColumn";
import {dummyCategories, dummyProducts} from "./dummyData";
import {ImportField} from "./classes/ImportField";
export function createFormField<T extends FormField>(FormFieldType: new () => T, overrides: Partial<T> = {}): T {
  return { ...new FormFieldType(), ...overrides };
}
export function createTableColumn(overrides: Partial<TableColumn> = {}): TableColumn {
  return { ...new TableColumn(), ...overrides };
}
export function createImportField<T extends ImportField = ImportField>(
  overrides: Partial<T> = {},
  ImportFieldType: new () => T = ImportField as unknown as new () => T
): ImportField {
  return { ...new ImportFieldType(), ...overrides };
}


export function isNullOrEmptyOrUndefined(s: any): boolean {
  let ans = s === undefined || s === null;
  if (!ans && s.hasOwnProperty('length')) {
    ans = ans || s.length === 0;
  }
  return ans;
}
export function deep_copy(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}

export function generateRandomCode(): string {
  return Math.random().toString(16).substr(2, 4) + '-' +
    Math.random().toString(16).substr(2, 4) + '-' +
    Math.random().toString(16).substr(2, 4);
}
export function keyObjectPair<T extends object>(inputObject: T, specificKey: keyof T): {[key: string]: T} {
  if (specificKey in inputObject) {
    return { [inputObject[specificKey] as string]: inputObject };
  }
  throw new Error('The specific key does not exist in the object.');
}
export function mapArrayToKeyObjectPair<T extends object, K extends keyof T>(
  inputArray: T[],
  specificKey: K
): {[key: string]: T} {
  const result: {[key: string]: T} = {};
  inputArray.forEach(item => {
    if (specificKey in item) {
      const keyValue = String(item[specificKey]);
      result[keyValue] = item;
    } else {
      throw new Error(`The specific key ${String(specificKey)} does not exist on some items in the array.`);
    }
  });
  return result;
}
export function linkLists<T extends Record<string, any>, U extends Record<string, any>>(
  listToUpdate: T[],
  referenceList: U[],
  idPropertyInListToUpdate: keyof T,
  idPropertyInReferenceList: keyof U,
  targetPropertyInListToUpdate: keyof T,
  propertyFromReferenceList: keyof U
): T[] {
  // Create a copy of the list to update
  return listToUpdate.map(item => {
    const referenceItem = referenceList.find(
      refItem => refItem[idPropertyInReferenceList] as unknown === item[idPropertyInListToUpdate]
    );

    // Create a copy of the current item
    const newItem = { ...item };

    if (referenceItem) {
      newItem[targetPropertyInListToUpdate] = referenceItem[propertyFromReferenceList] as any;
    }

    return newItem;
  });
}
export function linkAndAggregate<T extends Record<string, any>, U extends Record<string, any>>(
  listX: T[],
  listY: U[],
  matchingPropertyX: keyof T,
  matchingPropertyY: keyof U,
  targetPropertyX: keyof T
): T[] {
  return listX.map(itemX => {
    const aggregatedItems = listY.filter(itemY => itemY[matchingPropertyY] as unknown === itemX[matchingPropertyX]);
    return { ...itemX, [targetPropertyX]: aggregatedItems };
  });
}







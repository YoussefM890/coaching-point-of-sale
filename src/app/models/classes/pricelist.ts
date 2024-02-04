import {PricelistLine} from "./pricelistLine";

export class Pricelist {
  id: number
  name: string
  description? : string
  lines? : PricelistLine[]
}

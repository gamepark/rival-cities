import { getEnumValues } from '@gamepark/rules-api'

export enum Product {
  Beer = 1,
  Leather,
  Cloth,
  Furniture
}

export const PRODUCTS_QUANTITY = 12

export const products = getEnumValues(Product)

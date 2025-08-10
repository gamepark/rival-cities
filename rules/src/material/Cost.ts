import { Product } from './Product'

export enum CostType {
  Product = 1,
  Products,
  AnyProducts,
  Letters
}

export type ProductCost = {
  type: CostType.Product
  product: Product
  amount: number
}

export type ProductsCost = {
  type: CostType.Products
  amount: Partial<Record<Product, number>>
}

export type AnyProductsCost = {
  type: CostType.AnyProducts
  amount: number
}

export type LettersCost = {
  type: CostType.Letters
  amount: number
}

export type Cost = ProductCost | ProductsCost | AnyProductsCost | LettersCost

export function cost(amount: number, product: Product): ProductCost
export function cost(amount: number): AnyProductsCost
export function cost(amount: number, product?: Product): ProductCost | AnyProductsCost {
  return product ? { type: CostType.Product, product, amount } : { type: CostType.AnyProducts, amount }
}

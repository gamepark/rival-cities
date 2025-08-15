/** @jsxImportSource @emotion/react */
import { Picture } from '@gamepark/react-game'
import { Cost, CostType } from '@gamepark/rival-cities/material/Cost'
import { Product } from '@gamepark/rival-cities/material/Product'
import { getEnumValues } from '@gamepark/rules-api'
import { getProductIcon } from '../../headers/HeaderIconsCss'
import Letter from '../../images/icons/Letter.png'
import ProductIcon from '../../images/icons/Product.png'

type Props = {
  cost: Cost
}

export function CostDisplay({ cost }: Props) {
  switch (cost.type) {
    case CostType.AnyProducts:
      return (
        <>
          {cost.amount} <Picture src={ProductIcon} />
        </>
      )
    case CostType.Product:
      return (
        <>
          {cost.amount} <Picture src={getProductIcon(cost.product)} />
        </>
      )
    case CostType.Products:
      return (
        <>
          {getEnumValues(Product)
            .filter((product) => cost.amount[product])
            .map((product) => (
              <CostDisplay key={product} cost={{ type: CostType.Product, amount: cost.amount[product]!, product }} />
            ))}
        </>
      )
    case CostType.Letters:
      return (
        <>
          {cost.amount} <Picture src={Letter} />
        </>
      )
  }
}

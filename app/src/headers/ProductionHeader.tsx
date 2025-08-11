/** @jsxImportSource @emotion/react */
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { ProductionRule } from '@gamepark/rival-cities/rules/actions/ProductionRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { getProductIcon } from './HeaderIconsCss'

export const ProductionHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  const { product, quantity } = new ProductionRule(rules.game).action

  if (activePlayer === me) {
    if (quantity) {
      return (
        <Trans
          defaults="header.production.you"
          components={{
            product: <Picture src={getProductIcon(product)} />
          }}
        />
      )
    } else {
      return (
        <Trans
          defaults="header.production.factory.you"
          components={{
            product: <Picture src={getProductIcon(product)} />,
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
  }

  return (
    <Trans
      defaults="header.production.player"
      values={{ player }}
      components={{
        product: <Picture src={getProductIcon(product)} />
      }}
    />
  )
}

/** @jsxImportSource @emotion/react */
import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeSpecialCardHistory = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const player = usePlayerName(move.location.player)
  const card = new RivalCitiesRules(context.game).material(MaterialType.SpecialActionCard).getItem(move.itemIndex)
  return (
    <Trans
      defaults="history.special.take"
      values={{ player }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.SpecialActionCard, card)} transient />
      }}
    />
  )
}

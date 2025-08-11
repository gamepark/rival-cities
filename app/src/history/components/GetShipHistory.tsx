/** @jsxImportSource @emotion/react */

import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { MaterialGame, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GetShipHistory = (props: MoveComponentProps<MoveItem>) => {
  const { context, move } = props
  const game: MaterialGame = context.game
  const actionPlayer = context.action.playerId
  const player = usePlayerName(actionPlayer)
  const shipCard = game.items[MaterialType.ShipCard]![move.itemIndex]

  return (
    <Trans
      defaults="history.get.ship"
      values={{ player }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.ShipCard, shipCard)} transient />
      }}
    />
  )
}

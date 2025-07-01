/** @jsxImportSource @emotion/react */

import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GetShipHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const shipCard = context.game.items[MaterialType.ShipCard][move.itemIndex]

  return (
    <Trans
      defaults="history.get.ship"
      values={{ player: name }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.ShipCard, shipCard)} transient />
      }}
    />
  )
}

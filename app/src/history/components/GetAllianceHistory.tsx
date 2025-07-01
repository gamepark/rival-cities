/** @jsxImportSource @emotion/react */

import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GetAllianceHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const allianceCard = context.game.items[MaterialType.AllianceCard][move.itemIndex]

  return (
    <Trans
      defaults="history.get.alliance"
      values={{ player: name, id: allianceCard.id }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.AllianceCard, allianceCard)} transient />
      }}
    />
  )
}

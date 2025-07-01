/** @jsxImportSource @emotion/react */

import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const WinLawsuitHistory = (props: MoveComponentProps) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const card = context.game.items[MaterialType.LawsuitCard][move.itemIndex]

  return (
    <Trans
      defaults="history.win.lawsuit"
      values={{ player: name }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.LawsuitCard, card)} transient />
      }}
    />
  )
}

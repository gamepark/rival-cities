/** @jsxImportSource @emotion/react */

import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { MaterialGame, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const WinLawsuitHistory = (props: MoveComponentProps<MoveItem>) => {
  const { context, move } = props
  const game: MaterialGame = context.game
  const actionPlayer = move.location.player
  const name = usePlayerName(actionPlayer)
  const card = game.items[MaterialType.LawsuitCard]![move.itemIndex]

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

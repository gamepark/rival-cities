/** @jsxImportSource @emotion/react */
import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MaterialGame, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const AdvanceInLawsuitHistory = (props: MoveComponentProps<MoveItem>) => {
  const { context, move } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const id = new RivalCitiesRules(context.game as MaterialGame).material(MaterialType.LawsuitPiece).getItem(move.location.parent!).location.x! + 1
  return <Trans defaults="history.advance.lawsuit" values={{ player: name, id }} />
}

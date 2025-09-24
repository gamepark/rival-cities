import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export function AdvanceLawsuitHistory({ move, context }: MaterialLogProps<CustomMove>) {
  const player = usePlayerName(context.action.playerId)
  const card = new RivalCitiesRules(context.game)
    .material(MaterialType.LawsuitCard)
    .parent(move.data as number)
    .getItem()
  return (
    <Trans
      i18nKey="history.lawsuit.advance"
      values={{ player, id: move.data }}
      components={{ card: <PlayMoveButton move={displayMaterialHelp(MaterialType.LawsuitCard, card)} transient /> }}
    />
  )
}

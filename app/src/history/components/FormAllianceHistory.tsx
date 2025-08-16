/** @jsxImportSource @emotion/react */
import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const FormAllianceHistory = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const { t } = useTranslation()
  const player = usePlayerName(context.action.playerId)
  const card = new RivalCitiesRules(context.game).material(MaterialType.AllianceCard).getItem<Alliance>(move.itemIndex)
  return (
    <Trans
      defaults="history.alliance.form"
      values={{ player, alliance: t(`help.card.alliance.${card.id}`) }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.AllianceCard, card)} transient />
      }}
    />
  )
}

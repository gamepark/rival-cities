import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export function KeepAllianceHistory({ move, context }: MaterialLogProps<CustomMove>) {
  const { t } = useTranslation()
  const player = usePlayerName(context.action.playerId)
  const card = new RivalCitiesRules(context.game).material(MaterialType.AllianceCard).id(move.data).getItem<Alliance>()
  return (
    <Trans
      i18nKey="history.alliance.keep"
      values={{ player, alliance: t(`help.card.alliance.${move.data}`) }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.AllianceCard, card)} transient />
      }}
    />
  )
}

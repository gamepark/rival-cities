/** @jsxImportSource @emotion/react */
import { MaterialLogProps, Picture, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { specialActionCardPlaces } from '@gamepark/rival-cities/constantes'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import InkJar from '../../images/tokens/InkJar.png'
import { historyIcon } from './historyCss'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export function MoveInkJarHistory({ move, context }: MaterialLogProps<MoveItem>) {
  const player = usePlayerName(context.action.playerId)
  const rules = new RivalCitiesRules(context.game)
  const origin = rules.material(MaterialType.InkJar).getItem()!.location.id as number
  const destination = move.location.id as number
  const distance = (20 + destination - origin) % 20
  const cardType = specialActionCardPlaces.includes(destination) ? MaterialType.SpecialActionCard : MaterialType.BasicActionCard
  const card = rules.material(cardType).location(LocationType.ActionCardSpace).locationId(destination).getItem()
  return (
    <Trans
      defaults="history.move-ink-jar"
      values={{ player, distance }}
      components={{
        inkJar: <Picture css={historyIcon} src={InkJar} />,
        card: <PlayMoveButton move={displayMaterialHelp(cardType, card)} transient />
      }}
    />
  )
}

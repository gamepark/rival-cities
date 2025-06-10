/** @jsxImportSource @emotion/react */

import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { BasicActionCard } from '@gamepark/rival-cities/material/BasicActionCard'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { BasicActionCard1Header } from './basicActions/BasicActionCard1Header'
import { BasicActionCard2Header } from './basicActions/BasicActionCard2Header'
import { BasicActionCard3Header } from './basicActions/BasicActionCard3Header'
import { BasicActionCard4Header } from './basicActions/BasicActionCard4Header'
import { BasicActionCard5Header } from './basicActions/BasicActionCard5Header'
import { BasicActionCard6Header } from './basicActions/BasicActionCard6Header'

export const BasicActionHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  const inkjarLocationId: number = rules.material(MaterialType.InkJar).location(LocationType.InkJarPiste).getItem()?.location.id

  const cardInInkjarPlace = (): BasicActionCard => {
    return rules
      .material(MaterialType.BasicActionCard)
      .location(LocationType.CardPiste)
      .filter((it) => it.location.id === inkjarLocationId)
      .getItem()?.id
  }

  switch (cardInInkjarPlace()) {
    case BasicActionCard.BasicAction1:
      return <BasicActionCard1Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction2:
      return <BasicActionCard2Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction3:
      return <BasicActionCard3Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction4:
      return <BasicActionCard4Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction5:
      return <BasicActionCard5Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction6:
      return <BasicActionCard6Header player={name} itsMe={itsMe} />
    default:
      throw new Error(`BasicActionCard ${cardInInkjarPlace()} is not implemented`)
  }
}

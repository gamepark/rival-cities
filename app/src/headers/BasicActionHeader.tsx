/** @jsxImportSource @emotion/react */

import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { BasicActionCard } from '@gamepark/rival-cities/material/BasicActionCard'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { BasicActionCard0Header } from './basicActions/BasicActionCard0Header'
import { BasicActionCard10Header } from './basicActions/BasicActionCard10Header'
import { BasicActionCard11Header } from './basicActions/BasicActionCard11Header'
import { BasicActionCard12Header } from './basicActions/BasicActionCard12Header'
import { BasicActionCard13Header } from './basicActions/BasicActionCard13Header'
import { BasicActionCard14Header } from './basicActions/BasicActionCard14Header'
import { BasicActionCard15Header } from './basicActions/BasicActionCard15Header'
import { BasicActionCard1Header } from './basicActions/BasicActionCard1Header'
import { BasicActionCard2Header } from './basicActions/BasicActionCard2Header'
import { BasicActionCard3Header } from './basicActions/BasicActionCard3Header'
import { BasicActionCard4Header } from './basicActions/BasicActionCard4Header'
import { BasicActionCard5Header } from './basicActions/BasicActionCard5Header'
import { BasicActionCard6Header } from './basicActions/BasicActionCard6Header'
import { BasicActionCard7Header } from './basicActions/BasicActionCard7Header'
import { BasicActionCard8Header } from './basicActions/BasicActionCard8Header'
import { BasicActionCard9Header } from './basicActions/BasicActionCard9Header'

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

  if(inkjarLocationId === 0) {
    return <BasicActionCard0Header player={name} itsMe={itsMe} />
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
    case BasicActionCard.BasicAction7:
      return <BasicActionCard7Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction8:
      return <BasicActionCard8Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction9:
      return <BasicActionCard9Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction10:
      return <BasicActionCard10Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction11:
      return <BasicActionCard11Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction12:
      return <BasicActionCard12Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction13:
      return <BasicActionCard13Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction14:
      return <BasicActionCard14Header player={name} itsMe={itsMe} />
    case BasicActionCard.BasicAction15:
      return <BasicActionCard15Header player={name} itsMe={itsMe} />
    default:
      throw new Error(`BasicActionCard ${cardInInkjarPlace()} is not implemented`)
  }
}

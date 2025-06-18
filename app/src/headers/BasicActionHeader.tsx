/** @jsxImportSource @emotion/react */

import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { BasicActionCard } from '@gamepark/rival-cities/material/BasicActionCard'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { MemoryType } from '@gamepark/rival-cities/rules/MemoryType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const BasicActionHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const inkjarLocationId: number = rules.material(MaterialType.InkJar).location(LocationType.InkJarPiste).getItem()?.location.id
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))

  if(inkjarLocationId === 0) {
    return <Trans
    defaults={`header.basic.action.card.0.you`}
    components={{
      pass: <PlayMoveButton move={pass} />
    }}
  />
  }

  const cardInInkjarPlace = (): BasicActionCard => {
    return rules
      .material(MaterialType.BasicActionCard)
      .location(LocationType.CardPiste)
      .filter((it) => it.location.id === inkjarLocationId)
      .getItem()?.id
  }
  
  const productChoosen = rules.remind(MemoryType.ProductChoosen)
    const isDonationInProgress = rules.remind(MemoryType.IsDonationInProgress)

  if (itsMe) {
      if (isDonationInProgress) {
        return (
          <Trans
            defaults="header.donation.in.progress.you"
            components={{
              pass: <PlayMoveButton move={pass} />
            }}
          />
        )
      }

    if(productChoosen) {
      return (
        <Trans
          defaults="header.production.factory.you"
          values={{ product: productChoosen }}
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }

    return (
      <Trans
        defaults={`header.basic.action.card.${cardInInkjarPlace()}.you`}
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults={`header.basic.action.card.${cardInInkjarPlace()}.player`} values={{ player: name }} />
}

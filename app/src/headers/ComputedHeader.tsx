/** @jsxImportSource @emotion/react */

import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Action, ComputedAction, ProductionAction } from '@gamepark/rival-cities/material/Actions/Actions'
import { ActionType } from '@gamepark/rival-cities/material/Actions/ActionType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { MemoryType } from '@gamepark/rival-cities/rules/MemoryType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ComputedHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  const productChosen = rules.remind(MemoryType.ProductChosen)
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

    if (productChosen) {
      const currentAction = rules.remind<Action[]>(MemoryType.Actions) ?? []
      let productionAction
      if (currentAction.length > 0) {
        const currentActionElement = currentAction[0] as ComputedAction
        productionAction = currentActionElement.actions?.find((action: Action) => action.type === ActionType.Production) as ProductionAction
      }
      return (
        <Trans
          defaults="header.production.factory.you"
          values={{ product: productionAction ? productionAction.productType : productChosen }}
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
    return (
      <Trans
        defaults={`header.computed.you`}
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults={`header.computed.player`} values={{ player: name }} />
}

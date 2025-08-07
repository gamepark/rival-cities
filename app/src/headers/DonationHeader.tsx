/** @jsxImportSource @emotion/react */

import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { DonationActionRule } from '@gamepark/rival-cities/rules/actions/DonationActionRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Star from '../images/icons/Star.png'
import { getProductIcon, iconCss } from './HeaderIconsCss'

export const DonationHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const donate = useLegalMove(isMoveItemType(MaterialType.Product))
  const action = new DonationActionRule(rules.game).action
  const cost = action.nbProduct
  const gain = action.nbStars
  const count = action.nbTimes

  if (itsMe) {
    return (
      <Trans
        defaults="header.donation.you"
        values={{ cost, gain, count }}
        components={{
          donate: <PlayMoveButton move={donate} />,
          item: <Picture src={getProductIcon(action.productType)} css={iconCss} />,
          star: <Picture src={Star} css={iconCss} />,
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return (
    <Trans
      defaults="header.donation.player"
      values={{ player: name, cost, gain, count }}
      components={{
        item: <Picture src={getProductIcon(action.productType)} css={iconCss} />,
        star: <Picture src={Star} css={iconCss} />
      }}
    />
  )
}

/** @jsxImportSource @emotion/react */

import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { DonationActionRule } from '@gamepark/rival-cities/rules/actions/DonationActionRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { MemoryType } from '@gamepark/rival-cities/rules/MemoryType'
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
  const donate = useLegalMove(isMoveItemType(MaterialType.StarToken))
  const action = new DonationActionRule(rules.game).action
  const cost = action.nbProduct
  const gain = action.nbStars
  const count = rules.remind<number>(MemoryType.Count)

  if (itsMe) {
    if (count) {
      return (
        <Trans
          defaults="header.donation.pay.you"
          values={{ count }}
          components={{
            product: <Picture src={getProductIcon()} css={iconCss} />
          }}
        />
      )
    } else {
      return (
        <Trans
          defaults="header.donation.you"
          values={{ cost, gain, count: action.nbTimes }}
          components={{
            donate: <PlayMoveButton move={donate} />,
            item: <Picture src={getProductIcon(action.productType)} css={iconCss} />,
            star: <Picture src={Star} css={iconCss} />,
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    }
  }
  if (count) {
    return (
      <Trans
        defaults="header.donation.pay.player"
        values={{ player, count }}
        components={{
          product: <Picture src={getProductIcon()} css={iconCss} />
        }}
      />
    )
  } else {
    return (
      <Trans
        defaults="header.donation.player"
        values={{ player: name, cost, gain, count: action.nbTimes }}
        components={{
          item: <Picture src={getProductIcon(action.productType)} css={iconCss} />,
          star: <Picture src={Star} css={iconCss} />
        }}
      />
    )
  }
}

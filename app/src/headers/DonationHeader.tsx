/** @jsxImportSource @emotion/react */

import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { DonationRule } from '@gamepark/rival-cities/rules/actions/DonationRule'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { Memory } from '@gamepark/rival-cities/rules/Memory'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Star from '../images/icons/Star.png'
import { getProductIcon, iconCss } from './HeaderIconsCss'

export const DonationHeader = () => {
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const donate = useLegalMove(isMoveItemType(MaterialType.StarToken))
  const { cost, product, stars, times } = new DonationRule(rules.game).action
  const count = rules.remind<number>(Memory.Count)

  if (activePlayer === me) {
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
          values={{ cost, stars, times }}
          components={{
            donate: <PlayMoveButton move={donate} />,
            item: <Picture src={getProductIcon(product)} css={iconCss} />,
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
        values={{ player, cost, stars, times }}
        components={{
          item: <Picture src={getProductIcon(product)} css={iconCss} />,
          star: <Picture src={Star} css={iconCss} />
        }}
      />
    )
  }
}

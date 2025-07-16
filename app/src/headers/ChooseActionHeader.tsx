/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Letter from '../images/tokens/LetterFront.jpg'

export const ChooseActionHeader = () => {
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const playBasicAction = useLegalMove((move) => isCustomMoveType(CustomMoveType.PlaysInkjarCard)(move))
  const useLetter = useLegalMove((move) => isMoveItemType(MaterialType.Letter)(move) && move.location.type === LocationType.LetterDeck)
  const takeCard = useLegalMove((move) => isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.PlayerSpecialActionCardsHand)

  if (itsMe) {
    if (useLetter) {
      if(takeCard) {
        return (
          <Trans
            defaults="header.choose.action.letter.take.you"
            components={{
              basic: <PlayMoveButton move={playBasicAction} />,
              useLetter: <PlayMoveButton move={useLetter} />,
              letter: <img src={Letter} alt="letter" css={image} />,
              take: <PlayMoveButton move={takeCard} />
            }}
          />
        )
      }
      return (
        <Trans
          defaults="header.choose.action.letter.you"
          components={{
            basic: <PlayMoveButton move={playBasicAction} />,
            useLetter: <PlayMoveButton move={useLetter} />,
            letter: <img src={Letter} alt="letter" css={image} />
          }}
        />
      )
    }
    if(takeCard) {
      return (
        <Trans
          defaults="header.choose.action.take.you"
          components={{
            basic: <PlayMoveButton move={playBasicAction} />,
            take: <PlayMoveButton move={takeCard} />
          }}
        />
      )
    }
    return (
      <Trans
        defaults="header.choose.action.you"
        components={{
          basic: <PlayMoveButton move={playBasicAction} />
        }}
      />
    )
  }

  return <Trans defaults="header.choose.action.player" values={{ player: name }} />
}

const image = css`
  width: 1em;
  border-radius: 0.1em;
  transform: rotateZ(-13deg);
`

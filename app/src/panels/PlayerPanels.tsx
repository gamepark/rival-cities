import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { City } from '@gamepark/rival-cities/City'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { createPortal } from 'react-dom'
import Star from '../images/icons/Star.png'

export const PlayerPanels = () => {
  const players = usePlayers<City>({ sortFromMe: true })
  const rules = useRules<RivalCitiesRules>()!
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => {
        const counters = [
          {
            image: Star,
            value: rules.getScore(player.id) ?? 0
          }
        ]
        return <StyledPlayerPanel key={player.id} player={player} css={panelPosition(player.id)} activeRing counters={counters} />
      })}
    </>,
    root
  )
}

const panelPosition = (player: number) => {
  if (player === 1) {
    return css`
      position: absolute;
      left: 1em;
      top: 8.5em;
      width: 28em;
      background: linear-gradient(135deg, white 0%, #3b4e6e 80%);
    `
  }
  return css`
    position: absolute;
    right: 1em;
    top: 8.5em;
    width: 28em;
    background: linear-gradient(135deg, white 0%, #8d433a 80%);
  `
}

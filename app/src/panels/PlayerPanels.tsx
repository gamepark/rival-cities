/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { City } from '@gamepark/rival-cities/City'
import Altona from '../images/panels/altona.png'
import Hamburg from '../images/panels/hambourg.png'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers<City>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => (
        <StyledPlayerPanel key={player.id} backgroundImage={backgroundImage[player.id]} player={player} css={panelPosition(player.id)} activeRing />
      ))}
    </>,
    root
  )
}

const backgroundImage: Record<City, string> = {
  [City.Altona]: Altona,
  [City.Hamburg]: Hamburg
}

const panelPosition = (player: number) => {
  if (player === 1) {
    return css`
      position: absolute;
      left: 1em;
      top: 8.5em;
      width: 28em;
    `
  }
  return css`
    position: absolute;
    right: 1em;
    top: 8.5em;
    width: 28em;
  `
}

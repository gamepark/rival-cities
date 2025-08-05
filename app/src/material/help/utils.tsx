import { css } from '@emotion/react'
import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { ShipCard } from '@gamepark/rival-cities/material/ShipCard'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const components = {
  bold: <strong />,
  underline: <u />
}

export const allianceBtn = (id: Alliance) => <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.AllianceCard, { id })} transient />
export const shipBtn = (id: ShipCard) => <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ShipCard, { id })} transient />

export const note = css`
  border: 1px solid black;
  padding: 1em;
  background: rgba(179, 179, 179, 0.2);
  border-radius: 5px;
`

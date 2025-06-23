import { PlayMoveButton, linkButtonCss } from "@gamepark/react-game";
import { MaterialType } from "@gamepark/rival-cities/material/MaterialType";
import { MaterialMoveBuilder } from "@gamepark/rules-api";
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp
import { AllianceCard } from "@gamepark/rival-cities/material/AllianceCard";
import { css } from "@emotion/react";
import { ShipCard } from "@gamepark/rival-cities/material/ShipCard";

export const components = {
  bold: <strong />,
  underline: <u />
}

export const allianceBtn = (id: AllianceCard) => <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.AllianceCard, { id })} transient />
export const shipBtn = (id: ShipCard) => <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ShipCard, { id })} transient />

export const note = css`
  border: 1px solid black;
  padding: 1em;
  background: rgba(179, 179, 179, 0.2);
  border-radius: 5px;
`
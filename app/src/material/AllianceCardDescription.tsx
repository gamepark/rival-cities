/** @jsxImportSource @emotion/react */
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { AllianceCard } from '@gamepark/rival-cities/material/AllianceCard'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType, isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import AllianceAmsterdam from '../images/cards/alliance/en/AllianceAmsterdam.jpg'
import AllianceBruxelles from '../images/cards/alliance/en/AllianceBruxelles.jpg'
import AllianceGdansk from '../images/cards/alliance/en/AllianceGdansk.jpg'
import AllianceKjjobenhavn from '../images/cards/alliance/en/AllianceKjjobenhavn.jpg'
import AllianceLeHavre from '../images/cards/alliance/en/AllianceLeHavre.jpg'
import AllianceLondon from '../images/cards/alliance/en/AllianceLondon.jpg'
import AllianceNovgorod from '../images/cards/alliance/en/AllianceNovgorod.jpg'
import AllianceOslo from '../images/cards/alliance/en/AllianceOslo.jpg'
import AllianceBack from '../images/cards/alliance/AllianceBack.jpg'

export class AllianceCardDescription extends CardDescription {
  width = 6.75
  height = 4.35

  menuAlwaysVisible = true

  backImage = AllianceBack

  images = {
    [AllianceCard.AllianceAmsterdam]: AllianceAmsterdam,
    [AllianceCard.AllianceBruxelles]: AllianceBruxelles,
    [AllianceCard.AllianceGdansk]: AllianceGdansk,
    [AllianceCard.AllianceKjjobenhavn]: AllianceKjjobenhavn,
    [AllianceCard.AllianceLeHavre]: AllianceLeHavre,
    [AllianceCard.AllianceLondon]: AllianceLondon,
    [AllianceCard.AllianceNovgorod]: AllianceNovgorod,
    [AllianceCard.AllianceOslo]: AllianceOslo
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.AllianceCard)(move) && move.itemIndex === context.index && move.location.player === context.player
  }

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]){
    const pay = legalMoves.find((move) => isCustomMoveType(CustomMoveType.PayForAlliance)(move) && move.data.pay.id === item.id)

    if (pay && item.location.type === LocationType.PlayerAllianceCards && item.location.player === context.player) {
      return (
        <ItemMenuButton angle={50} radius={4} move={pay}>
          <FontAwesomeIcon icon={faMoneyCheckDollar} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }
}

export const allianceCardDescription = new AllianceCardDescription()
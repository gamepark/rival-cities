/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { Alliance } from '@gamepark/rival-cities/material/Alliance'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { Product } from '@gamepark/rival-cities/material/Product'
import { Ship } from '@gamepark/rival-cities/material/Ship'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType, isMoveItemType, isStartPlayerTurn, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Decision from '../images/icons/decision.png'
import Lawsuit from '../images/icons/Lawsuit.png'
import Letter from '../images/icons/Letter.png'
import Prestige from '../images/tokens/PrestigeMarker.png'
import { offSeasonOverviewDescription } from '../material/OffSeasonOverviewDescription'
import { me, opponent, TutorialSetup } from './TutorialSetup'

const image = css`
  width: 1.5em;
  margin: 0 0.1em;
  border-radius: 0.2em;
`

const BaseComponents = {
  bold: <strong />,
  italic: <em />,
  letter: <img src={Letter} alt="letter" css={image} />,
  balance: <img src={Lawsuit} alt="lawsuit" css={image} />,
  decision: <img src={Decision} alt="decision" css={image} />,
  prestige: <img src={Prestige} alt="prestige" css={image} />
}

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 2

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Peter',
      avatar: {
        topType: 'NoHair',
        accessoriesType: 'Prescription02',
        facialHairType: 'Blank',
        clotheType: 'BlazerShirt',
        eyeType: 'Default',
        eyebrowType: 'Default',
        mouthType: 'Default',
        skinColor: 'Light'
      }
    }
  ]

  options = {
    firstPlay: true,
    players: [{ id: me }, { id: opponent }]
  }
  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.1" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.2" components={BaseComponents} />
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Product).location(LocationType.ProductSupply)],
        scale: 0.8
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.3" components={BaseComponents} />
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Product).location(LocationType.ProductSupply),
          this.material(game, MaterialType.Product).location(LocationType.PlayerProducts).player(me)
        ],
        scale: 0.5
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Product)(move) && move.location.id === Product.Furniture
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Product)(move) && move.location.id === Product.Furniture
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.4" components={BaseComponents} />,
        position: { x: 0, y: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.InkJar).location(LocationType.InkSpace)],
        scale: 0.8
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.5" components={BaseComponents} />,
        position: { x: 0, y: 30 }
      },
      focus: () => ({
        locations: [
          {
            type: LocationType.InkSpace,
            id: 1
          },
          {
            type: LocationType.InkSpace,
            id: 2
          }
        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.6" components={BaseComponents} />,
        position: { x: -30, y: 0 }
      },
      focus: () => ({
        locations: [
          {
            type: LocationType.InkSpace,
            id: 3
          },
          {
            type: LocationType.InkSpace,
            id: 4
          }
        ],
        scale: 0.4
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.7" components={BaseComponents} />
      },
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.InkJar)(move) && move.location.id === 1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.8" components={BaseComponents} />,
        position: { x: 0, y: 20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.InkJar).location(LocationType.InkSpace),
          this.material(game, MaterialType.BasicActionCard).location((loc) => loc.type === LocationType.ActionCardSpace && loc.id === 1)
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.9" components={BaseComponents} />
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Product).location(LocationType.ProductSupply),
          this.material(game, MaterialType.Product).location(LocationType.PlayerProducts).player(me)
        ],
        scale: 0.5
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Product)(move) && move.location.id === Product.Beer
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.10" components={BaseComponents} />
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Factory).location(LocationType.PlayerFactories).player(me)],
        scale: 0.5
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Product)(move) && move.location.id === Product.Beer
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.11" components={BaseComponents} />
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.Factory).location(LocationType.PlayerFactories).player(me)],
        staticItems: {
          [MaterialType.OffSeasonOverview]: [offSeasonOverviewDescription.staticItem]
        },
        scale: 0.5
      })
    },
    {
      move: {
        auto: true,
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.12" components={BaseComponents} />
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.InkJar)(move) && move.location.id === 3
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.13" components={BaseComponents} />,
        position: { x: 0, y: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.InkJar).location(LocationType.InkSpace),
          this.material(game, MaterialType.BasicActionCard).location((loc) => loc.type === LocationType.ActionCardSpace && loc.id === 3)
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.14" components={BaseComponents} />,
        position: { x: 0, y: -20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.AllianceCard).location(LocationType.AllianceSpace)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.15" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.16" components={BaseComponents} />
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove, game: MaterialGame) =>
          isMoveItemType(MaterialType.AllianceCard)(move) &&
          this.material(game, MaterialType.AllianceCard).index(move.itemIndex).getItem()?.id === Alliance.Oslo
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.17" components={BaseComponents} />,
        position: { x: -15, y: 0 }
      },
      focus: () => ({
        locations: [
          {
            type: LocationType.InkSpace,
            id: 5
          }
        ],
        scale: 0.1
      }),
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.InkJar)(move) && move.location.id === 5
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.18" components={BaseComponents} />,
        position: { x: -20, y: 0 }
      },
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Factory)(move)
      }
    },
    {
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Product)(move) && move.location.id === Product.Beer
      }
    },
    {
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Product)(move) && move.location.id === Product.Beer
      }
    },
    {
      move: {
        auto: true,
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.19" components={BaseComponents} />
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.InkJar)(move) && move.location.id === 6
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Product)(move) && move.location.id === Product.Furniture
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.Product)(move) && move.location.id === Product.Furniture
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.20" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.21" components={BaseComponents} />
      },
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.InkJar)(move) && move.location.id === 8,
        interrupt: () => true
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.22" components={BaseComponents} />
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpecialActionCard).location((loc) => loc.type === LocationType.ActionCardSpace && loc.id === 8)],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.23" components={BaseComponents} />
      },
      move: {}
    },
    {
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.SpecialActionCard)(move) && move.location.type === LocationType.PlayerHand
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.24" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.25" components={BaseComponents} />
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.InkJar)(move) && move.location.id === 9
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        interrupt: () => true,
        filter: (move: MaterialMove, game: MaterialGame) =>
          isMoveItemType(MaterialType.ShipCard)(move) && this.material(game, MaterialType.ShipCard).index(move.itemIndex).getItem()?.id === Ship.Ship1
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.26" components={BaseComponents} />,
        position: { x: -20, y: 0 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.ShipCard).location(LocationType.PlayerShipCards).player(opponent)],
        scale: 0.5
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.27" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.28" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.29" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.30" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.31" components={BaseComponents} />
      }
    },
    {
      move: {
        player: opponent,
        auto: true,
        filter: (move: MaterialMove) => isStartPlayerTurn(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.32" components={BaseComponents} />
      },
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.InkJar)(move) && move.location.id === 11
      }
    },
    {
      move: {
        auto: true,
        filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.PlayInkJarCard)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.33" components={BaseComponents} />
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.BasicActionCard).location((loc) => loc.type === LocationType.ActionCardSpace && loc.id === 11)]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.34" components={BaseComponents} />,
        position: { x: 0, y: 20 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.LawsuitCard).location(LocationType.LawsuitSpace)],
        margin: { bottom: 10 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.35" components={BaseComponents} />,
        position: { x: 0, y: 20 }
      },
      move: {
        filter: (move: MaterialMove) => isMoveItemType(MaterialType.LawsuitMarker)(move) && move.location.parent === 0
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.36" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.37" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.38" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.39" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.40" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.41" components={BaseComponents} />
      }
    }
  ]
}

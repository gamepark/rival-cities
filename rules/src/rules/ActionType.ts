import { MaterialGame, PlayerTurnRule } from '@gamepark/rules-api'
import { AdvanceLawsuitActionRule } from './actions/AdvanceLawsuitActionRule'
import { BuildFactoryActionRule } from './actions/BuildFactoryActionRule'
import { CourtRulingActionRule } from './actions/CourtRulingActionRule'
import { Donation1ClothFor1starActionRule } from './actions/Donation1ClothFor1starActionRule'
import { Donation1LeatherFor1star2TimesActionRule } from './actions/Donation1LeatherFor1star2TimesActionRule'
import { Donation2furnituresFor3StarsActionRule } from './actions/Donation2furnituresFor3StarsActionRule'
import { Donation3BeerFor1Star2TimesActionRule } from './actions/Donation3BeerFor1Star2TimesActionRule'
import { Donation3BeerFor1StarActionRule } from './actions/Donation3BeerFor1StarActionRule'
import { DonationActionRule } from './actions/DonationActionRule'
import { Draw2SpecialActionCardActionRule } from './actions/Draw2SpecialActionCardActionRule'
import { DrawSpecialActionCardActionRule } from './actions/DrawSpecialActionCardActionRule'
import { EarnPrestigeActionRule } from './actions/EarnPrestigeActionRule'
import { FormAllianceActionRule } from './actions/FormAllianceActionRule'
import { Gain2LetterActionRule } from './actions/Gain2LettersActionRule'
import { GainLetterActionRule } from './actions/GainLetterActionRule'
import { Gift2TimeActionRule } from './actions/Gift2TimeActionRule'
import { GiftActionRule } from './actions/GiftActionRule'
import { GiftBeer2TimesActionRule } from './actions/GiftBeer2TimesActionRule'
import { GiftBeerActionRule } from './actions/GiftBeerActionRule'
import { GiftClothesActionRule } from './actions/GiftClothesActionRule'
import { GiftFurnitureActionRule } from './actions/GiftFurnitureActionRule'
import { OpponentEarnPrestigeActionRule } from './actions/OpponentEarnPrestigeActionRule'
import { Piracy3TimesActionRule } from './actions/Piracy3TimesActionRule'
import { PiracyActionRule } from './actions/PiracyActionRule'
import { ProductionActionRule } from './actions/ProductionActionRule'
import { ProductionFurnitureActionRule } from './actions/ProductionFurnitureActionRule'
import { ProductSwapActionRule } from './actions/ProductSwapActionRule'
import { PurchaseShipActionRule } from './actions/PurchaseShipActionRule'
import { Return3FactoryActionRule } from './actions/Return3FactoryActionRule'

export enum ActionType {
  Production = 1,
  AdvanceLawsuit,
  BuildFactory,
  Donation,
  DrawSpecialActionCard,
  Draw2SpecialActionCard,
  EarnPrestige,
  FormAlliance,
  GainLetter,
  Gain2Letter,
  Gift,
  Gift2Time,
  ProductSwap,
  PurchaseShip,
  CourtRuling,
  Return3Factory,
  Piracy,
  Piracy3times,
  OpponentEarnPrestige,
  GiftClothes,
  GiftBeer,
  GiftBeer2Time,
  Donation2furnituresFor3Stars,
  Donation1ClothFor1star,
  ProductionFurniture,
  GiftFurniture,
  Donation1LeatherFor1star2Times,
  Donation3BeerFor1Star,
  Donation3BeerFor1Star2Times
}

export const actionRules: Record<ActionType, (game: MaterialGame) => PlayerTurnRule> = {
  [ActionType.Production]: (game) => new ProductionActionRule(game),
  [ActionType.AdvanceLawsuit]: (game) => new AdvanceLawsuitActionRule(game),
  [ActionType.BuildFactory]: (game) => new BuildFactoryActionRule(game),
  [ActionType.Donation]: (game) => new DonationActionRule(game),
  [ActionType.DrawSpecialActionCard]: (game) => new DrawSpecialActionCardActionRule(game),
  [ActionType.Draw2SpecialActionCard]: (game) => new Draw2SpecialActionCardActionRule(game),
  [ActionType.EarnPrestige]: (game) => new EarnPrestigeActionRule(game),
  [ActionType.FormAlliance]: (game) => new FormAllianceActionRule(game),
  [ActionType.GainLetter]: (game) => new GainLetterActionRule(game),
  [ActionType.Gain2Letter]: (game) => new Gain2LetterActionRule(game),
  [ActionType.Gift]: (game) => new GiftActionRule(game),
  [ActionType.Gift2Time]: (game) => new Gift2TimeActionRule(game),
  [ActionType.ProductSwap]: (game) => new ProductSwapActionRule(game),
  [ActionType.PurchaseShip]: (game) => new PurchaseShipActionRule(game),
  [ActionType.CourtRuling]: (game) => new CourtRulingActionRule(game),
  [ActionType.Return3Factory]: (game) => new Return3FactoryActionRule(game),
  [ActionType.Piracy]: (game) => new PiracyActionRule(game),
  [ActionType.Piracy3times]: (game) => new Piracy3TimesActionRule(game),
  [ActionType.OpponentEarnPrestige]: (game) => new OpponentEarnPrestigeActionRule(game),
  [ActionType.GiftClothes]: (game) => new GiftClothesActionRule(game),
  [ActionType.GiftBeer]: (game) => new GiftBeerActionRule(game),
  [ActionType.GiftBeer2Time]: (game) => new GiftBeer2TimesActionRule(game),
  [ActionType.Donation2furnituresFor3Stars]: (game) => new Donation2furnituresFor3StarsActionRule(game),
  [ActionType.Donation1ClothFor1star]: (game) => new Donation1ClothFor1starActionRule(game),
  [ActionType.ProductionFurniture]: (game) => new ProductionFurnitureActionRule(game),
  [ActionType.GiftFurniture]: (game) => new GiftFurnitureActionRule(game),
  [ActionType.Donation1LeatherFor1star2Times]: (game) => new Donation1LeatherFor1star2TimesActionRule(game),
  [ActionType.Donation3BeerFor1Star]: (game) => new Donation3BeerFor1StarActionRule(game),
  [ActionType.Donation3BeerFor1Star2Times]: (game) => new Donation3BeerFor1Star2TimesActionRule(game)
}

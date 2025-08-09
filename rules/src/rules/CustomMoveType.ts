export enum CustomMoveType {
  Pass = 1,
  EndAction,
  PlaysInkjarCard,
  ResolveLawsuit,
  SpendLetterToSwapProduct,
  PayForAlliance,
  ConfirmEndTurn,
  TriggerAllianceEffect,
  TriggerShipEffect,
  ProductForgo // When you cannot gain a product because the stock is empty and opponent does not have more than you
}

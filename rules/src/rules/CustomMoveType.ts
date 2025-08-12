export enum CustomMoveType {
  Pass = 1,
  PlayInkJarCard,
  ResolveLawsuit,
  SpendLetterToSwapProduct,
  ChooseAlliance,
  TriggerAllianceEffect,
  TriggerShipEffect,
  ProductForgo, // When you cannot gain a product because the stock is empty and opponent does not have more than you
  LetterForgo
}

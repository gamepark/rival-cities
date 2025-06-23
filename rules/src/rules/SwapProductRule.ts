import { ProductSwapActionRule } from './actions/ProductSwapActionRule'

export class SwapProductRule extends ProductSwapActionRule {
  nbSwaps = 1

  next() {
    return this.computedActionHelper.removeActionAndnext()
  }
}

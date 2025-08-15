/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, PlayMoveButton, useLegalMove, usePlayerId, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function LetterHelp({ item, closeDialog }: MaterialHelpProps) {
  const { t } = useTranslation()
  const me = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const isPlayerLetter = item.location?.player === me
  const spendLetterToSwapProduct = useLegalMove(isCustomMoveType(CustomMoveType.SpendLetterToSwapProduct))

  return (
    <>
      <h2>{t('help.letter')}</h2>
      <p>
        <Trans defaults="help.letter.descr" components={components} />
      </p>
      <ul>
        <li>{t('help.letter.use.2')}</li>
        <li>{t('help.letter.use.3')}</li>
        <li>{t('help.letter.use.1')}</li>
      </ul>
      {spendLetterToSwapProduct && isPlayerLetter && activePlayer === me && (
        <p>
          <Trans
            defaults="help.letter.spendLetterToSwapProduct"
            components={{
              ...components,
              spendLetterToSwapProduct: <PlayMoveButton move={spendLetterToSwapProduct} onPlay={closeDialog} />
            }}
          />
        </p>
      )}
    </>
  )
}

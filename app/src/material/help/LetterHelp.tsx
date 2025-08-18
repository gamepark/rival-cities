/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, PlayMoveButton, useLegalMove, usePlayerId } from '@gamepark/react-game'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function LetterHelp({ item, closeDialog }: MaterialHelpProps) {
  const { t } = useTranslation()
  const me = usePlayerId()
  const isPlayerLetter = item.location?.player === me
  const spendLetterToSwapProduct = useLegalMove(isCustomMoveType(CustomMoveType.SpendLetterToSwapProduct))

  return (
    <>
      <h2>{t('help.letter')}</h2>
      <p>
        <Trans defaults="help.letter.text" components={components} />
      </p>
      <ul>
        <li>{t('help.letter.use.1')}</li>
        <li>{t('help.letter.use.2')}</li>
        <li>{t('help.letter.use.3')}</li>
        <li>{t('help.letter.use.4')}</li>
      </ul>
      {spendLetterToSwapProduct && isPlayerLetter && (
        <p>
          <PlayMoveButton move={spendLetterToSwapProduct} onPlay={closeDialog}>
            {t('button.letter.swap')}
          </PlayMoveButton>
        </p>
      )}
    </>
  )
}

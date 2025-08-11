/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, PlayMoveButton, useLegalMove, usePlayerId, useRules } from '@gamepark/react-game'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { CustomMoveType } from '@gamepark/rival-cities/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export const LetterHelp: FC<MaterialHelpProps> = ({ item, closeDialog }) => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const rules = useRules<RivalCitiesRules>()!
  const activePlayer = rules.getActivePlayer()
  const itsMe = player && activePlayer === player
  const isPlayerLetter = item.location?.player === player
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
      {spendLetterToSwapProduct && isPlayerLetter && itsMe && (
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

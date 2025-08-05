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
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const isPlayerLetter = item.location?.player === player
  const takeLetterToSwapProduct = useLegalMove(isCustomMoveType(CustomMoveType.TakeLetterToSwapProduct))

  return (
    <>
      <h2>{t(`help.letter`)}</h2>
      <p>
        <Trans defaults={`help.Letter.descr`} components={components} />
      </p>
      <ul>
        <li>{t(`help.Letter.use.2`)}</li>
        <li>{t(`help.Letter.use.3`)}</li>
        <li>{t(`help.Letter.use.1`)}</li>
      </ul>
      {takeLetterToSwapProduct && isPlayerLetter && itsMe && (
        <p>
          <Trans
            defaults={`help.Letter.takeLetterToSwapProduct`}
            components={{
              ...components,
              takeLetterToSwapProduct: <PlayMoveButton move={takeLetterToSwapProduct} onPlay={closeDialog} />
            }}
          />
        </p>
      )}
    </>
  )
}

/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function ProductHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`product.${item.id}`)}</h2>
      <p>
        <Trans defaults="product.text" components={components} />
      </p>
    </>
  )
}

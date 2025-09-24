import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function StarTokenHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()!
  return (
    <>
      <h2>{t('help.star')}</h2>
      {item.location?.type === LocationType.StarTokenSupply && (
        <p>
          <Trans
            i18nKey="help.star.supply"
            values={{ count: rules.material(MaterialType.StarToken).location(LocationType.StarTokenSupply).getQuantity() }}
            components={components}
          />
        </p>
      )}
      <p>
        <Trans i18nKey="help.star.text" components={components} />
      </p>
    </>
  )
}

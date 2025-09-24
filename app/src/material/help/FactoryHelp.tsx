import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rival-cities/material/LocationType'
import { MaterialType } from '@gamepark/rival-cities/material/MaterialType'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function FactoryHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()
  const rules = useRules<RivalCitiesRules>()!
  return (
    <>
      <h2>{t('help.factory')}</h2>
      {item.location?.type === LocationType.FactorySupply && (
        <p>
          <Trans
            i18nKey="help.factory.supply"
            values={{ count: rules.material(MaterialType.Factory).location(LocationType.FactorySupply).getQuantity() }}
            components={components}
          />
        </p>
      )}
      <p>
        <Trans i18nKey="help.factory.text" components={components} />
      </p>
    </>
  )
}

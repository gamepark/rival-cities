import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Lawsuit, lawsuitData } from '@gamepark/rival-cities/material/Lawsuit'
import { Trans, useTranslation } from 'react-i18next'
import LawsuitIcon from '../../images/icons/Lawsuit.png'
import Star from '../../images/icons/Star.png'
import { ActionHelp } from './ActionsHelp'
import { CostDisplay } from './CostDisplay'
import { components, note } from './utils'

export function LawsuitCardHelp({ item }: MaterialHelpProps) {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.card.lawsuit')}</h2>
      <p>
        <Trans i18nKey="help.card.lawsuit.text" components={{ ...components, lawsuit: <Picture src={LawsuitIcon} />, star: <Picture src={Star} /> }} />
      </p>
      {item.id && <LawsuitDetailHelp lawsuit={item.id} />}
      <p css={note}>
        <Trans i18nKey="help.card.lawsuit.win" components={components} />
      </p>
    </>
  )
}

export function LawsuitDetailHelp({ lawsuit }: { lawsuit: Lawsuit }) {
  const { t } = useTranslation()
  const { cost, advanceBonus, winBonus, nbStars } = lawsuitData[lawsuit]
  return (
    <>
      <p>
        <strong>
          <Trans i18nKey="help.lawsuit.price" components={{ lawsuit: <Picture src={LawsuitIcon} /> }} />
        </strong>{' '}
        <CostDisplay cost={cost} />
      </p>

      <p>
        <strong>
          <Trans i18nKey="help.lawsuit.action.advance" components={{ lawsuit: <Picture src={LawsuitIcon} /> }} />
        </strong>
      </p>
      <>
        {advanceBonus.map((action, index) => (
          <ActionHelp key={index} action={action} />
        ))}
      </>
      <p>
        <strong>{t('help.lawsuit.action.win')}</strong>
      </p>
      <>
        {winBonus.map((action, index) => (
          <ActionHelp key={index} action={action} />
        ))}
      </>
      <p>
        <Trans i18nKey="help.card.stars" values={{ stars: nbStars }} components={{ star: <Picture src={Star} /> }} />
      </p>
    </>
  )
}

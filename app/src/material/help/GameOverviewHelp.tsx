import { css } from '@emotion/react'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function GameOverviewHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.game.overview')}</h2>
      <TurnOverviewHelp />
      <h3>{t('help.game.overview.instant.win')}</h3>
      <ul>
        <li>
          <Trans i18nKey="help.game.overview.instant.win.1" components={components} />
        </li>
        <p css={or}>{t('or')}</p>
        <li>
          <Trans i18nKey="help.game.overview.instant.win.2" components={components} />
        </li>
        <p css={or}>{t('or')}</p>
        <li>
          <Trans i18nKey="help.game.overview.instant.win.3" components={components} />
        </li>
        <p css={or}>{t('or')}</p>
        <li>
          <Trans i18nKey="help.game.overview.instant.win.4" components={components} />
        </li>
      </ul>
      <h3>{t('help.game.overview.end')}</h3>
      <p>
        <Trans i18nKey="help.game.overview.end.descr" components={components} />
      </p>
      <ul>
        <li>
          <Trans i18nKey="help.game.overview.end.1" components={components} />
        </li>
        <p css={or}>{t('or')}</p>
        <li>
          <Trans i18nKey="help.game.overview.end.2" components={components} />
        </li>
        <p css={or}>{t('or')}</p>
        <li>
          <Trans i18nKey="help.game.overview.end.3" components={components} />
        </li>
        <p css={or}>{t('or')}</p>
        <li>
          <Trans i18nKey="help.game.overview.end.4" components={components} />
        </li>
      </ul>
      <p>
        <Trans i18nKey="help.game.overview.score.descr" components={components} />
      </p>
      <ul>
        <li>
          <Trans i18nKey="help.game.overview.score.1" components={components} />
        </li>
        <li>
          <Trans i18nKey="help.game.overview.score.2" components={components} />
        </li>
        <li>
          <Trans i18nKey="help.game.overview.score.3" components={components} />
        </li>
      </ul>
      <p>
        <Trans i18nKey="help.game.overview.score.win" components={components} />
      </p>
    </>
  )
}

export function TurnOverviewHelp() {
  return (
    <>
      <p>
        <Trans i18nKey="help.game.overview.1" components={components} />
      </p>
      <p>
        <Trans i18nKey="help.game.overview.2" components={components} />
      </p>
      <p>
        <Trans i18nKey="help.game.overview.choice" components={components} />
      </p>
      <ol>
        <li>
          <p>
            <Trans i18nKey="help.action.choice.1" components={components} />
          </p>
        </li>
        <li>
          <p>
            <Trans i18nKey="help.action.choice.2" components={components} />
          </p>
        </li>
        <li>
          <p>
            <Trans i18nKey="help.action.choice.3" components={components} />
          </p>
        </li>
        <li>
          <p>
            <Trans i18nKey="help.action.choice.4" components={components} />
          </p>
        </li>
      </ol>
    </>
  )
}

const or = css`
  margin: 0;
`

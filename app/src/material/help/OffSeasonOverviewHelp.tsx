/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function OffSeasonOverviewHelp() {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.off.season.overview')}</h2>
      <p>
        <Trans defaults="help.off.season.overview.descr" components={components} />
      </p>
      <ol>
        <li>
          <p>
            <Trans defaults="help.off.season.overview.action.1" components={components} />
          </p>
        </li>
        <li>
          <p>
            <Trans defaults="help.off.season.overview.action.2" components={components} />
          </p>
        </li>
        <li>
          <p>
            <Trans defaults="help.off.season.overview.action.3" components={components} />
          </p>
        </li>
        <li>
          <p>
            <Trans defaults="help.off.season.overview.action.4" components={components} />
          </p>
          <ul>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.4.1" components={components} />
              </p>
            </li>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.4.2" components={components} />
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Trans defaults="help.off.season.overview.action.5" components={components} />
          </p>
          <ul>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.5.1" components={components} />
              </p>
            </li>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.5.2" components={components} />
              </p>
            </li>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.5.3" components={components} />
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Trans defaults="help.off.season.overview.action.6" components={components} />
          </p>
        </li>
        <li>
          <p>
            <Trans defaults="help.off.season.overview.action.7" components={components} />
          </p>
        </li>
        <li>
          <p>
            <Trans defaults="help.off.season.overview.action.8" components={components} />
          </p>
          <ul>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.8.1" components={components} />
              </p>
            </li>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.8.2" components={components} />
              </p>
            </li>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.8.3" components={components} />
              </p>
            </li>
            <li>
              <p>
                <Trans defaults="help.off.season.overview.action.8.4" components={components} />
              </p>
            </li>
          </ul>
        </li>
      </ol>
      <p>
        <Trans defaults="help.off.season.overview.descr.end" components={components} />
      </p>
    </>
  )
}

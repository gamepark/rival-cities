import { useTranslation } from 'react-i18next'

export const ChooseActionHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.rule.choose.action')}</h2>
      <p>{t('help.rule.choose.action.descr')}</p>
      <ul>
        <li>{t('help.rule.choose.action.option.a')}</li>
        <li>{t('help.rule.choose.action.option.b')}</li>
        <li>{t('help.rule.choose.action.option.c')}</li>
        <li>{t('help.rule.choose.action.option.d')}</li>
      </ul>
    </>
  )
}

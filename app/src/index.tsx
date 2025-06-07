/** @jsxImportSource @emotion/react */
import { RivalCitiesOptionsSpec } from '@gamepark/rival-cities/RivalCitiesOptions'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { RivalCitiesSetup } from '@gamepark/rival-cities/RivalCitiesSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material, MaterialI18n } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="rival-cities"
      Rules={RivalCitiesRules}
      optionsSpec={RivalCitiesOptionsSpec}
      GameSetup={RivalCitiesSetup}
      material={Material}
      materialI18n={MaterialI18n}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)

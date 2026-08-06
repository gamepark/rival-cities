import { GameProvider } from '@gamepark/react-game'
import { RivalCitiesOptionsSpecV2 } from '@gamepark/rival-cities/RivalCitiesOptions'
import { RivalCitiesRules } from '@gamepark/rival-cities/RivalCitiesRules'
import { RivalCitiesSetup } from '@gamepark/rival-cities/RivalCitiesSetup'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { RulesHelp } from './dialogs/RulesHelp.ts'
import { RivalCitiesLogs } from './history/RivalCitiesLogs.tsx'
import { Locators } from './locators/Locators'
import { Material, MaterialI18n } from './material/Material'
import { Tutorial } from './tutorial/Tutorial.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="rival-cities"
      Rules={RivalCitiesRules}
      optionsSpec={RivalCitiesOptionsSpecV2}
      GameSetup={RivalCitiesSetup}
      material={Material}
      materialI18n={MaterialI18n}
      locators={Locators}
      rulesHelp={RulesHelp}
      logs={new RivalCitiesLogs()}
      tutorial={new Tutorial()}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>
)

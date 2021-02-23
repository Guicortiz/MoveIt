// Aula 01 - Codigo para o desafio, #rumoaoproximonivel
import { ExperienceBar } from './components/ExperienceBar/'
import './styles/global.css'

function App() {
  return (
    <div className="container">
      <ExperienceBar
        level={1}
        startxp={0}
        endxp={1000}
        xp={400}
      />
    </div>
  );
}

export default App;

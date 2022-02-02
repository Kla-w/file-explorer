import { CurrentPathProvider } from './context/current-path'
import { Explorer } from './Explorer'
import { NavBar } from './NavBar'

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  return (
    <CurrentPathProvider>
      <>
        <NavBar />
        <main className="w-full h-full">
          <Explorer />
        </main>
      </>
    </CurrentPathProvider>
  )
}

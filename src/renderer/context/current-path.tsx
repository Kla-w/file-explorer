import React, { useEffect, useMemo, useState } from 'react'
import os from 'os'
import path from 'path'

interface CurrentPathContext {
  currentPath: string
  goTo: (path: string) => void
  goToParent: () => void
  goBack: () => void
  goForward: () => void
  canGoBack: boolean
  canGoForward: boolean
}

const CurrentPathContext = React.createContext<CurrentPathContext>({
  currentPath: '',
  /* eslint-disable @typescript-eslint/no-empty-function */
  goTo: () => {},
  goToParent: () => {},
  goBack: () => {},
  goForward: () => {},
  canGoBack: false,
  canGoForward: false,
  /* eslint-enable @typescript-eslint/no-empty-function */
})

export function useCurrentPath() {
  return React.useContext(CurrentPathContext)
}

export const CurrentPathProvider: React.FC = ({ children }) => {
  const [navigationHeap, setNavigationHeap] = useState<Array<string>>([os.homedir()])
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentPath = useMemo(() => navigationHeap[currentIndex], [currentIndex, navigationHeap])
  const canGoBack = useMemo(() => currentIndex > 0, [currentIndex])
  const canGoForward = useMemo(
    () => currentIndex < navigationHeap.length - 1,
    [currentIndex, navigationHeap]
  )

  const goTo = (to: string) => {
    setNavigationHeap(navigationHeap.slice(0, currentIndex + 1).concat(to))
    setCurrentIndex(currentIndex + 1)
  }

  const goToParent = () => goTo(path.dirname(currentPath))

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const goForward = () => {
    if (currentIndex < navigationHeap.length - 1) setCurrentIndex(currentIndex + 1)
  }

  useEffect(() => {
    document.addEventListener('mouseup', (e) => {
      console.log(e.buttons)
    })
  })

  return (
    <CurrentPathContext.Provider
      value={{ currentPath, goTo, goToParent, goBack, goForward, canGoForward, canGoBack }}
    >
      {children}
    </CurrentPathContext.Provider>
  )
}

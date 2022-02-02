import { useEffect, useState } from 'react'
import { useCurrentPath } from './context/current-path'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/outline'
import path from 'path'

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const { currentPath, goBack, goForward, goToParent, goTo, canGoBack, canGoForward } =
    useCurrentPath()

  useEffect(() => setEditedPath(currentPath), [currentPath])

  const [editedPath, setEditedPath] = useState(currentPath)

  return (
    <nav className="sticky top-0 inset-x-0 h-20 bg-blue-100 flex flex-row items-center justify-start p-4">
      <button
        className="disabled:opacity-25 disabled:pointer-events-none p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-300 hover:bg-opacity-30 rounded-lg mr-2"
        onClick={goBack}
        disabled={!canGoBack}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        className="disabled:opacity-25 disabled:pointer-events-none p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-300 hover:bg-opacity-30 rounded-lg mr-2"
        onClick={goForward}
        disabled={!canGoForward}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
      <button
        className="disabled:opacity-25 disabled:pointer-events-none p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-300 hover:bg-opacity-30 rounded-lg mr-2"
        onClick={goToParent}
      >
        <ChevronUpIcon className="h-5 w-5" />
      </button>
      <input
        className="p-2 flex-grow"
        value={editedPath}
        onChange={(e) => setEditedPath(e.target.value)}
        onBlur={() => setEditedPath(currentPath)}
        onKeyPress={(e) => {
          e.key === 'Enter' && goTo(editedPath)
        }}
      />
    </nav>
  )
}

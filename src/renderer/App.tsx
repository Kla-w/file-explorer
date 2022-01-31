import fs from 'fs'
import os from 'os'
import path from 'path'
import { useEffect, useState } from 'react'

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [currentPath, setCurrentPath] = useState(os.homedir())
  const [selected, setSelected] = useState<undefined | string>(undefined)

  const [files, setFiles] = useState<{ name: string; stats: fs.Stats; hidden: boolean }[]>([])

  useEffect(() => {
    fs.readdir(currentPath, async (err: any, files: string[]) => {
      console.log(err)

      const promises = files.map(async (file) => ({
        name: file,
        stats: fs.statSync(path.join(currentPath, file)),
        hidden: file.startsWith('.'),
      }))
      const stats = await Promise.all(promises)
      console.log(stats)
      setFiles(stats)
    })
  }, [currentPath])

  return (
    <div onClick={() => setSelected(undefined)}>
      <ul className="flex flex-row flex-wrap p-4">
        {files
          .filter((f) => !f.hidden)
          .map((file) => (
            <li
              key={file.name}
              className="group"
              onClick={(e) => {
                e.stopPropagation()
                setSelected(file.name)
              }}
            >
              <div
                className={`overflow-auto ${
                  file.name === selected ? 'bg-blue-50' : 'group-hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col justify-start items-center w-14 m-4 select-none">
                  <img
                    className="object-contain h-12"
                    src={file.stats.isDirectory() ? 'assets/folder.svg' : 'assets/file.svg'}
                  />
                  <div className="flex-shrink-0 [overflow-wrap:anywhere]">{file.name}</div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

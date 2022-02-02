import { useEffect, useState } from 'react'
import fs from 'fs'
import path from 'path'
import { useCurrentPath } from './context/current-path'
import ProgressBar from '@badrap/bar-of-progress'

interface ExplorerProps {}

export const Explorer: React.FC<ExplorerProps> = () => {
  const [selected, setSelected] = useState<undefined | string>(undefined)

  const { currentPath, goTo } = useCurrentPath()

  const [files, setFiles] = useState<
    { name: string; extension: string; stats: fs.Stats; hidden: boolean }[]
  >([])
  const [progress, setProgress] = useState(new ProgressBar({ delay: 0 }))

  useEffect(() => {
    let finished = false
    progress.start()

    const checkFinished = () => {
      if (finished) progress.finish()
      else setTimeout(checkFinished, 100)
    }

    setTimeout(checkFinished, 100)

    fs.readdir(currentPath, async (err: any, files: string[]) => {
      if (err) console.error(err)

      const promises = files.map(async (file) => {
        const extension = path.extname(file)
        const name = path.basename(file, extension)
        return {
          name,
          extension,
          stats: fs.statSync(path.join(currentPath, file)),
          hidden: file.startsWith('.'),
        }
      })
      const stats = await Promise.all(promises)
      console.log(stats)
      setFiles(stats)
      finished = true
    })
  }, [currentPath, progress])

  return (
    <div onClick={() => setSelected(undefined)} className="w-full h-full overflow-auto">
      <ul className="flex flex-row flex-wrap p-4">
        {files
          .filter((f) => !f.hidden)
          .map((file) => (
            <li
              key={file.name + file.extension}
              className="group"
              onClick={(e) => {
                e.stopPropagation()
                if (e.detail === 1) {
                  setSelected(file.name)
                } else if (e.detail == 2) {
                  goTo(path.join(currentPath, file.name))
                }
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
                    draggable={false}
                    src={file.stats.isDirectory() ? 'assets/folder.svg' : 'assets/file.svg'}
                  />
                  <div className="flex-shrink-0 [overflow-wrap:anywhere] block overflow-hidden line-clamp-2">
                    {file.name}
                    {file.extension}
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

'use client'
import React, { useState } from 'react'

import Taskbar from '../components/Taskbar'
import DraggableWindow from '../components/DraggableWindow'
import AboutApp from '../components/Apps/AboutApp'
import DesktopIcon from '../components/DesktopIcon'
import ProjectsApp from '../components/Apps/ProjectsApp'

export default function Page() {
  const [openApps, setOpenApps] = useState<string[]>([])

  const apps = [
    {
      id: 'projects',
      title: 'Projects',
      icon: '/globe.svg',
      component: <ProjectsApp />,
    },
    {
      id: 'about',
      title: 'About Me',
      icon: '/globe.svg',
      component: <AboutApp />,
    }
  ]

  const handleOpenApp = (id: string) => {
    if (!openApps.includes(id)) setOpenApps([...openApps, id])
  }

  const handleCloseApp = (id: string) => {
    setOpenApps(openApps.filter(a => a !== id))
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white relative overflow-hidden flex flex-col">
      <div className="flex-1 relative p-6 grid grid-cols-6 gap-6 content-start">
        {apps.map(app => (
          <DesktopIcon key={app.id} icon={app.icon} title={app.title} onDoubleClick={() => handleOpenApp(app.id)} />
        ))}

        {openApps.map(id => {
          const app = apps.find(a => a.id === id)
          if (!app) return null
          return (
            <DraggableWindow key={app.id} title={app.title} onClose={() => handleCloseApp(app.id)}>
              {app.component}
            </DraggableWindow>
          )
        })}
      </div>


      <Taskbar apps={apps} openApps={openApps} onAppClick={handleOpenApp} />
    </div>
  )
}

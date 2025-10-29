'use client'
import React from 'react'
import Clock from './Clock'

interface TaskbarProps {
  apps: { id: string; title: string; icon: string }[]
  openApps: string[]
  onAppClick: (id: string) => void
}

export default function Taskbar({ apps, openApps, onAppClick }: TaskbarProps) {
  return (
    <div className="h-12 bg-gray-900 border-t border-gray-700 flex items-center justify-between px-4 fixed bottom-0 left-0 right-0">
      <button className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 flex items-center gap-2">
        <img src="/next.svg" alt="logo" className="w-5 h-5" />
        <span className="text-sm">Start</span>
      </button>

      <div className="flex gap-2">
        {openApps.map(id => {
          const app = apps.find(a => a.id === id)
          if (!app) return null
          return (
            <button
              key={id}
              onClick={() => onAppClick(id)}
              className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 text-sm flex items-center gap-1"
            >
              <img src={app.icon} alt={app.title} className="w-4 h-4" />
              {app.title}
            </button>
          )
        })}
      </div>

      <Clock />
    </div>
  )
}

'use client'
import React from 'react'
import DesktopIcon from '../DesktopIcon'

export default function ProjectsApp() {
  return (
    <div className="grid grid-cols-3 gap-4 items-start">
        <DesktopIcon
          icon={'/next.svg'}
          title={'PeakyParty.exe'}
          onDoubleClick={() => {
            throw new Error('Function not implemented.')
          }}
        />
        <DesktopIcon
          icon={'/next.svg'}
          title={'PeakyParty.INFO'}
          onDoubleClick={() => {
            throw new Error('Function not implemented.')
          }}
        />
        <DesktopIcon
          icon={'/next.svg'}
          title={'Fitness App.exe'}
          onDoubleClick={() => {
            throw new Error('Function not implemented.')
          }}
        />
        <DesktopIcon
          icon={'/next.svg'}
          title={'Fitness App.INFO'}
          onDoubleClick={() => {
            throw new Error('Function not implemented.')
          }}
        />
    </div>
  )
}

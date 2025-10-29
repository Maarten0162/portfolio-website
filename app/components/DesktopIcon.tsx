'use client'
import React from 'react'

interface DesktopIconProps {
  icon: string
  title: string
  onDoubleClick: () => void
}

export default function DesktopIcon({ icon, title, onDoubleClick }: DesktopIconProps) {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center text-center cursor-pointer hover:opacity-80"
    >
      <img src={icon} alt={title} className="w-16 mb-1" />
      <p className="text-sm">{title}</p>
    </div>
  )
}

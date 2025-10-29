'use client'
import React, { useRef } from 'react'
import Draggable from 'react-draggable'

interface DraggableWindowProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export default function DraggableWindow({ title, onClose, children }: DraggableWindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header">
      <div
        ref={nodeRef}
        className="absolute top-24 left-24 w-96 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
      >
        <div className="window-header flex justify-between items-center bg-gray-700 p-2 rounded-t-lg cursor-move">
          <p className="text-sm">{title}</p>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </Draggable>
  )
}

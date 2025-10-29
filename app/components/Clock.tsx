import React from 'react'
import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState<string>('')
  
    useEffect(() => {
      const update = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      update()
      const interval = setInterval(update, 1000)
      return () => clearInterval(interval)
    }, [])
  
    return <div className="text-sm text-gray-300">{time}</div>
}

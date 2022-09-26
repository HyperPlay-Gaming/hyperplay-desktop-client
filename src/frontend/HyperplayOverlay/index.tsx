import React, { useEffect, useState } from 'react'
import './index.css'

const HyperplayOverlay = function () {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => {
      clearInterval(interval)
    }
  })
  return (
    <div>
      <div>
        <div>{time.toLocaleTimeString()}</div>
        <div>Ctrl + Tab to return to the game</div>
        <div className="caption">
          <button id="button">intercept</button>
          <label id="label">hello hello</label>
          <br />
          <input type="text" />
        </div>
      </div>
    </div>
  )
}

export default HyperplayOverlay

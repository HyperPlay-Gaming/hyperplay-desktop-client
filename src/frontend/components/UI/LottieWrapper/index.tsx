import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

interface LottieProps {
  animationData: any
  width: number
  height: number
}

export default function LottieWrapper({
  animationData,
  width,
  height
}: LottieProps) {
  const element = useRef<HTMLDivElement>(null)
  const lottieInstance = useRef<any>()

  useEffect(() => {
    if (element.current) {
      try {
        lottieInstance.current = lottie.loadAnimation({
          animationData,
          container: element.current
        })
      } catch (err) {
        console.log(`error ${err}`)
      }
    }
    return () => {
      lottieInstance.current?.destroy()
    }
  }, [animationData])

  return <div style={{ width, height }} ref={element}></div>
}

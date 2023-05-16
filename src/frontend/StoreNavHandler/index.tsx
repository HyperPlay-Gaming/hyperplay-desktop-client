import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StoreNavHandler() {
  const navigate = useNavigate()
  function handleNavToEpic(_e: Electron.IpcRendererEvent, url: string) {
    if (url.startsWith('https://store.epicgames.com/'))
      navigate(`/store-page/?store-url=${url}`)
  }
  useEffect(() => {
    const rmHandleNavToEpic = window.api.handleNavToEpicAndOpen(handleNavToEpic)
    return () => {
      rmHandleNavToEpic()
    }
  })
  return <></>
}

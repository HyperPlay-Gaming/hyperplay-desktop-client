import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function NavigateListener() {
  const navigate = useNavigate()

  useEffect(() => {
    const rmHandleNavigate = window.api.handleNavigate((event, route) => {
      navigate(route)
    })

    return () => {
      rmHandleNavigate()
    }
  }, [])

  return <></>
}

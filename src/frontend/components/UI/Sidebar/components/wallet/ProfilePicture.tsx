import React from 'react'
import { Disconnected } from 'frontend/assets/hyperplay'
import Blockies from 'react-blockies'

export interface ProfilePictureProps {
  address: string
  isConnected: boolean
}

const iconScale = 4
const className = 'Sidebar__itemIcon'

const ProfilePicture = ({ isConnected, address }: ProfilePictureProps) => {
  if (!isConnected) {
    return <Disconnected className="Sidebar__itemIcon disconnectedImg" />
  }

  const element = document.querySelector(className)

  const itemIconWidth = element
    ? (parseInt(getComputedStyle(element).width) * 34) / 24
    : 34

  const style = {
    size: itemIconWidth / iconScale,
    color: getCssProp('--primary'),
    spotColor: getCssProp('--tertiary'),
    bgColor: getCssProp('--secondary'),
    scale: iconScale
  }

  return (
    <div className={className}>
      <Blockies seed={address} {...style} className="identicon" />
    </div>
  )
}

export default ProfilePicture

const getCssProp = (key: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(key)

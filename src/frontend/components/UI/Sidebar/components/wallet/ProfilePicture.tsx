import React from 'react'
import { Disconnected } from 'frontend/assets/hyperplay'
import Blockies from 'react-blockies'
import styles from './index.module.scss'

export interface ProfilePictureProps {
  address: string
  isConnected: boolean
}

const iconScale = 4

const ProfilePicture = ({ isConnected, address }: ProfilePictureProps) => {
  if (!isConnected) {
    return <Disconnected className={styles.disconnectedImg} />
  }

  const itemIconWidth = 40

  const style = {
    size: itemIconWidth / iconScale,
    color: getCssProp('--primary'),
    spotColor: getCssProp('--tertiary'),
    bgColor: getCssProp('--secondary'),
    scale: iconScale
  }

  return (
    <div>
      <Blockies seed={address} {...style} className={styles.identicon} />
    </div>
  )
}

export default ProfilePicture

const getCssProp = (key: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(key)

import React from 'react'
import { CachedImage } from 'frontend/components/UI'

import './index.css'
import fallbackImage from 'frontend/assets/fallback_card.jpg'
import steamFallBackImage from 'frontend/assets/steam-fallback-card.png'

type Props = {
  art_square: string
  store: string
}

export function getImageFormattingForArtSquare({ art_square, store }: Props) {
  const isSteam = store === 'steam'
  if (art_square === 'fallback' || !art_square)
    return {
      src: isSteam ? steamFallBackImage : fallbackImage,
      fallback: fallbackImage
    }
  if (store === 'legendary') {
    return {
      src: `${art_square}?h=800&resize=1&w=600`,
      fallback: `${art_square}?h=400&resize=1&w=300`
    }
  } else {
    return { src: art_square, fallback: 'fallback' }
  }
}

function GamePicture(props: Props) {
  const { src, fallback } = getImageFormattingForArtSquare(props)

  return (
    <div className="gamePicture">
      <CachedImage
        alt="cover-art"
        className="gameImg"
        src={src}
        fallback={fallback}
      />
    </div>
  )
}

export default GamePicture

import { Runner, WikiInfo } from 'common/types'
import React, { useContext, useEffect, useState } from 'react'
import GameScore from './components/GameScore'
import Crossover from './components/Crossover'
import './index.scss'
import ContextProvider from 'frontend/state/ContextProvider'
import { Dialog, DialogHeader } from '../Dialog'
import { DialogContent } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  title: string
  setShouldShow: (value: boolean) => void
  runner: Runner
  appName: string
}

export function WikiGameInfo({ title, appName, runner, setShouldShow }: Props) {
  const [wikiGameInfo, setWikiGameInfo] = useState<WikiInfo | null>(null)
  const { platform } = useContext(ContextProvider)
  const isMac = platform === 'darwin'
  const { t } = useTranslation()

  useEffect(() => {
    window.api
      .getWikiGameInfo(title, appName, runner)
      .then((info: WikiInfo) => {
        if (info && (info.applegamingwiki || info.pcgamingwiki)) {
          setWikiGameInfo(info)
        }
      })
  }, [title, appName])

  return (
    <div className="wikigameinfoWrapper">
      <Dialog showCloseButton onClose={() => setShouldShow(false)}>
        <DialogHeader onClose={() => setShouldShow(false)}>
          <></>
        </DialogHeader>
        <DialogContent className="gameExtraDialog">
          {!wikiGameInfo && (
            <p>
              {t('wiki_info.not_found', "We couldn't find extra information.")}
            </p>
          )}
          {wikiGameInfo?.pcgamingwiki && (
            <GameScore info={wikiGameInfo.pcgamingwiki} title={title} />
          )}
          {isMac && wikiGameInfo?.applegamingwiki && (
            <Crossover info={wikiGameInfo.applegamingwiki} title={title} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

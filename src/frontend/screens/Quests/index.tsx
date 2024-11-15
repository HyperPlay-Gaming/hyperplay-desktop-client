import React, { useEffect } from 'react'
import { QuestsSummaryTableWrapper } from './components/QuestsSummaryTableWrapper'
import styles from './index.module.scss'
import { Alert, Background } from '@hyperplay/ui'
import classNames from 'classnames'
import useAuthSession from 'frontend/hooks/useAuthSession'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import QuestDetails from 'frontend/components/UI/QuestDetails'
import { fetchEpicListing, getGameInfo } from 'frontend/helpers'
import { useMutation } from '@tanstack/react-query'
import { Runner } from 'common/types'
import { Quest } from '@hyperplay/utils'
import { QuestRewardClaimedToast } from 'frontend/components/UI/QuestRewardClaimedToast'

export function QuestsPage() {
  const navigate = useNavigate()
  const { questId = null } = useParams()
  const selectedQuestId = questId === null ? questId : parseInt(questId)
  const { isSignedIn } = useAuthSession()
  const { t } = useTranslation()

  useEffect(() => {
    window.api.trackScreen('Quests Page')
  }, [])

  let alertComponent = null
  const showAlert = !isSignedIn
  let contentWithAlertClass = styles['no-alert']
  if (showAlert) {
    contentWithAlertClass = styles['with-alert']
    alertComponent = (
      <Alert
        className={styles.alert}
        message={t(
          'quests.playstreak.signInWarning.client',
          'You are currently not logged in, play streak progress will not be tracked. Please login to HyperPlay via the top-right dropdown to track progress.'
        )}
        variant="warning"
      />
    )
  }

  const navigateToGame = useMutation({
    mutationFn: async (quest: Quest) => {
      const { appName: epicAppName, epicListingUrl } = await fetchEpicListing(
        quest.project_id
      )

      let runner: Runner = 'hyperplay'
      let storeRedirectUrl = 'https://store.epicgames.com/'
      let name = quest.project_id
      if (epicListingUrl) {
        storeRedirectUrl = epicListingUrl
        runner = 'legendary'
        if (epicAppName) {
          name = epicAppName
        }
      }

      if (quest.quest_external_game !== null) {
        runner = quest.quest_external_game.runner
        storeRedirectUrl = quest.quest_external_game.store_redirect_url
      } // check for gameinfo to see if it is on the library
      return getGameInfo(name, runner)
        .then((res) => {
          if (!res) {
            throw new Error('Game not found in library')
          }

          return navigate(`/gamepage/${runner}/${name}`, {
            state: { gameInfo: res, fromQuests: true }
          })
        })
        .catch(async () => {
          // if hyperplay game, add to library and navigate to game page
          if (runner === 'hyperplay') {
            await window.api.addHyperplayGame(name)
            const gameInfo = await getGameInfo(name, runner)

            return navigate(`/gamepage/hyperplay/${name}`, {
              state: { gameInfo, fromQuests: true }
            })
          }
          // if epic game, open in epic store
          return navigate(`/store-page?store-url=${storeRedirectUrl}`)
        })
    },
    onError: (error, variable) => {
      window.api.logError(
        `Error navigating to ${variable} game: ${error.message}`
      )
    }
  })

  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div
        className={classNames(
          'contentContainer',
          contentWithAlertClass,
          styles.root
        )}
      >
        {alertComponent}
        <QuestRewardClaimedToast className={styles.toast} />
        <QuestsSummaryTableWrapper selectedQuestId={selectedQuestId} />
        <QuestDetails
          className={styles.detailsWrapper}
          questId={selectedQuestId}
          isQuestsPage={true}
          onPlayClick={(quest) => {
            navigateToGame.mutate(quest)
          }}
        />
      </div>
    </>
  )
}

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextInputWithIconField from '../TextInputWithIconField'
import { useTranslation } from 'react-i18next'
import { faBackspace, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { Button, LoadingSpinner } from '@hyperplay/ui'
import { useMutation } from '@tanstack/react-query'
import styles from './index.module.scss'

export function ImportGameFolder() {
  const { t } = useTranslation()
  const [gameFolderToImport, setGameFolderToImport] = useState('')

  const importGameFolderMutation = useMutation({
    mutationFn: async (gameFolder: string) => {
      const result = await window.api.importGameFolder(gameFolder)
      return result
    }
  })

  async function handleSelectGameFolder() {
    return window.api
      .openDialog({
        buttonLabel: t('box.choose'),
        properties: ['openDirectory'],
        title: t(
          'import-game-folder.dialog.title',
          'Select Game Folder to Import'
        )
      })
      .then((path) => setGameFolderToImport(path || ''))
  }

  if (
    importGameFolderMutation.isError &&
    importGameFolderMutation?.error?.message
  ) {
    console.error(importGameFolderMutation.error.message)
  }

  if (importGameFolderMutation.isSuccess && importGameFolderMutation?.data) {
    console.log(importGameFolderMutation.data)
  }

  return (
    <TextInputWithIconField
      htmlId="setting-import-game-folder"
      label={t('import-game-folder.label', 'Import Game Folder')}
      placeholder={t(
        'import-game-folder.placeholder',
        'Choose the game folder to import'
      )}
      value={gameFolderToImport.replaceAll("'", '')}
      onChange={(event) => setGameFolderToImport(event.target.value)}
      icon={
        !gameFolderToImport.length ? (
          <FontAwesomeIcon
            icon={faFolderOpen}
            style={{
              color: gameFolderToImport.length ? 'transparent' : 'currentColor'
            }}
          />
        ) : (
          <FontAwesomeIcon
            style={{ color: 'currentColor' }}
            icon={faBackspace}
          />
        )
      }
      onIconClick={
        !gameFolderToImport.length
          ? async () => handleSelectGameFolder()
          : () => setGameFolderToImport('')
      }
      afterInput={
        <div className={styles.afterInputContainer}>
          {importGameFolderMutation.isPending ? (
            <LoadingSpinner />
          ) : (
            <Button
              type="tertiary"
              onClick={async () =>
                importGameFolderMutation.mutate(gameFolderToImport)
              }
            >
              {t('import-game-folder.cta', 'Import Game Folder')}
            </Button>
          )}
          {importGameFolderMutation.isError ? (
            <div className={styles.errorMessage}>
              {t(
                'import-game-folder.error',
                'There was an error during import. Please see the logs for more details.'
              )}
            </div>
          ) : null}
          {importGameFolderMutation.isSuccess ? (
            <div className={styles.successMessage}>
              {t('import-game-folder.success', 'Successfully imported games!')}
            </div>
          ) : null}
        </div>
      }
    />
  )
}

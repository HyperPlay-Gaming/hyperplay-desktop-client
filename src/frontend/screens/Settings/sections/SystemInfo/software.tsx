import React from 'react'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import { ReactComponent as HyperPlayIcon } from 'frontend/assets/hyperplay/hyperplay_logo_white.svg'

import type { SystemInformation } from 'backend/utils/systeminfo'
import { useTranslation } from 'react-i18next'

interface Props {
  software: SystemInformation['softwareInUse']
}

function SoftwareInfo({ software }: Props) {
  const { t } = useTranslation()

  const { appVersion, legendaryVersion, gogdlVersion } = software

  return (
    <Paper sx={{ padding: 1 }} square>
      <Typography variant="h6">HyperPlay</Typography>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <HyperPlayIcon className="app-icon" />
        </Grid>
        <Grid
          item
          xs={10}
          margin={'auto'}
          paddingLeft={'var(--space-xs-fixed)'}
        >
          {t('settings.systemInformation.version', 'Version: {{appVersion}}', {
            appVersion
          })}
          <br />
          {t(
            'settings.systemInformation.legendaryVersion',
            'Legendary: {{legendaryVersion}}',
            { legendaryVersion }
          )}
          <br />
          {t(
            'settings.systemInformation.gogdlVersion',
            'Gogdl: {{gogdlVersion}}',
            {
              gogdlVersion
            }
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default React.memo(SoftwareInfo)

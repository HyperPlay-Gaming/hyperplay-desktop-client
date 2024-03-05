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

  const { appVersion, legendaryVersion, gogdlVersion, nileVersion } =
    software

  return (
    <Paper sx={{ padding: 1 }} square>
      <Typography variant="h6">
        {t('settings.systemInformation.software', 'Software:')}
      </Typography>
      <Grid container>
        <Grid item xs={2}>
          <HyperPlayIcon className="app-icon" />
        </Grid>
        <Grid item xs={10}>
          {t(
            'settings.systemInformation.appVersion',
            'AppVersion: {{appVersion}}',
            {
              appVersion
            }
          )}
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
          <br />
          {t(
            'settings.systemInformation.nileVersion',
            'Nile: {{nileVersion}}',
            {
              nileVersion
            }
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default React.memo(SoftwareInfo)

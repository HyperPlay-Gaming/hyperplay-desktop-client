import React from 'react'

import type { SystemInformation } from 'backend/utils/systeminfo'
import { useTranslation } from 'react-i18next'
import { Progress } from '@mantine/core'

interface Props {
  memory: SystemInformation['memory']
}

function MemoryProgress({ memory }: Props) {
  const { total, used, totalFormatted, usedFormatted } = memory
  const { t } = useTranslation()

  const memoryUsedInPercent = (used / total) * 100

  return (
    <div>
      <h6 className="memorytitle">
        {t('settings.systemInformation.memory', 'Memory:')}
      </h6>
      <Progress variant="determinate" value={memoryUsedInPercent} />
      <div>
        {t(
          'settings.systemInformation.memoryStats',
          '{{percentUsed}}% used ({{usedGib}} / {{totalGib}}',
          {
            percentUsed: Math.round(memoryUsedInPercent),
            usedGib: usedFormatted,
            totalGib: totalFormatted
          }
        )}
      </div>
    </div>
  )
}

export default React.memo(MemoryProgress)

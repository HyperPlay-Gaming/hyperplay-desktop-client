import React from 'react'

import type { SystemInformation } from 'backend/utils/systeminfo'
import { useTranslation } from 'react-i18next'
import VendorLogo from './vendorLogo'

function CPUCard({ cpu }: { cpu: SystemInformation['CPU'] }) {
  const { model, cores } = cpu
  const { t } = useTranslation()

  return (
    <div>
      <h6>{t('settings.systemInformation.cpu', 'CPU:')}</h6>
      <div className="gridItemContainer">
        <div>
          <VendorLogo model={model} />
        </div>
        <div>
          {t(
            'settings.systemInformation.cpuDescription',
            '{{numOfCores}}x {{modelName}}',
            { numOfCores: cores, modelName: model }
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(CPUCard)

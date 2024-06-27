import React from 'react'
import { useTranslation } from 'react-i18next'

import VendorLogo from './vendorLogo'

import type { SystemInformation } from 'backend/utils/systeminfo'

interface GPUCardProps {
  gpu: SystemInformation['GPUs'][number]
  gpuNumber: number
  showNumber: boolean
}

function GPUCard({ gpu, gpuNumber, showNumber }: GPUCardProps) {
  const {
    vendorString,
    deviceString,
    deviceId,
    vendorId,
    subdeviceId,
    subvendorId,
    driverVersion
  } = gpu
  const { t } = useTranslation()

  const headingText = showNumber
    ? t('settings.systemInformation.gpuWithNumber', 'GPU {{number}}:', {
        number: gpuNumber + 1
      })
    : t('settings.systemInformation.gpu', 'GPU:')

  return (
    <div>
      <h6>{headingText}</h6>
      <div className="gridItemContainer">
        <div>
          <VendorLogo model={vendorString} />
        </div>
        <div>
          {deviceString}
          <br />
          DID={deviceId} VID={vendorId}, DSID={subdeviceId} VSID={subvendorId}
          <br />
          {t(
            'settings.systemInformation.gpuDriver',
            'Driver: {{driverVersion}}',
            { driverVersion }
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(GPUCard)

import React, { useEffect } from 'react'
import { OnboardingModalConfig } from '../types'
import { wait } from '../../../../backend/proxy/commonProxyTypes'
import './index.css'
import { SuccessIcon } from 'frontend/assets/hyperplay'

interface SuccessParams {
  setOnboardingModalParams: React.Dispatch<Partial<OnboardingModalConfig>>
  disableOnboarding: () => void
}

const Success: React.FC<SuccessParams> = function (props) {
  useEffect(() => {
    wait(4000).then(() => {
      props.disableOnboarding()
    })
    props.setOnboardingModalParams({
      title: 'SUCCESS',
      enableBackButton: false,
      enableCloseButton: true
    })
  }, [])
  return (
    <div>
      <div className="content-sm text-secondary successSubtext">
        Your wallet is now connected! You&apos;re ready to game.{' '}
      </div>
      <div className="successImgContainer">
        <SuccessIcon className="successImg" />
      </div>
    </div>
  )
}

export default Success

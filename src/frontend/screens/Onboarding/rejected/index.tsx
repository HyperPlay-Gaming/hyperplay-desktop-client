import './index.css'
import React, { useEffect } from 'react'
import { OnboardingModalConfig } from '../types'
import YesNoActionButtons from '../components/yesNoActionButtons'

interface RejectedProps {
  setOnboardingModalParams: React.Dispatch<Partial<OnboardingModalConfig>>
  disableOnboarding: () => void
  onRetryClick: () => void
}

const Rejected: React.FC<RejectedProps> = function (props) {
  useEffect(() => {
    props.setOnboardingModalParams({
      title: 'OOPS!',
      enableBackButton: true,
      enableCloseButton: true
    })
  }, [])
  return (
    <div>
      <div className="content-sm text-secondary rejectedSubtext">
        You cancelled the connection request on your wallet. Please retry
        connecting to proceed.
      </div>
      <div className="rejectedImgContainer">
        <img
          src="/src/frontend/assets/hyperplay/rejected.svg"
          className="rejectedImg"
        ></img>
      </div>
      <YesNoActionButtons
        yesText="CONNECT"
        noText="CANCEL"
        onYes={props.onRetryClick}
        onNo={props.disableOnboarding}
      />
    </div>
  )
}

export default Rejected

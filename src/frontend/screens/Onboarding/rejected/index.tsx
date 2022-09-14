import './index.css'
import React, { useEffect } from 'react'
import { OnboardingModalConfig } from '../types'

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
      <img
        src="/src/frontend/assets/hyperplay/rejected.svg"
        className="rejectedImg"
      ></img>
      <p className="rejectedSubtext">
        You cancelled the connection request on your wallet. Please retry
        connecting to proceed.
      </p>
      <div className="actionButtonsContainer">
        <button
          onClick={() => props.disableOnboarding()}
          className="rejectedCancelButton"
        >
          CANCEL
        </button>
        <button
          onClick={() => props.onRetryClick()}
          className="rejectedRetryButton"
        >
          RETRY
        </button>
      </div>
    </div>
  )
}

export default Rejected

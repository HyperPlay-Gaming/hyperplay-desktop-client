import {
  PROVIDERS,
  UrisReturn,
  IMobileRegistryEntryWithQrLink,
  WalletConnectedType,
  ConnectionRequestRejectedType
} from 'common/types/proxy-types'
import React, { Reducer, useEffect, useReducer } from 'react'
import './index.css'
import Scan from './scan'
import { ONBOARDING_CONTENT, OnboardingModalConfig } from './types'
import Welcome from './welcome'
import { toString, QRCodeToStringOptions } from 'qrcode'
import { WrapRendererCallback } from 'common/types'
import Success from './success'
import Rejected from './rejected'
import Download from './download'

interface OnboardingProps {
  disableOnboarding: () => void
}

interface ContentParams {
  content: ONBOARDING_CONTENT
  qrCodeSvg: string
  providerImgUrl: string
}

const Onboarding: React.FC<OnboardingProps> = function (props) {
  const contentParamsInit: ContentParams = {
    content: ONBOARDING_CONTENT.WELCOME,
    qrCodeSvg: '',
    providerImgUrl: ''
  }
  const [contentParams, setContentParams] = useReducer<
    Reducer<ContentParams, Partial<ContentParams>>
  >((state, newState) => ({ ...state, ...newState }), contentParamsInit)

  async function handleProviderClicked(provider: PROVIDERS) {
    const uris: UrisReturn = await window.api.getConnectionUris(provider)
    const qrCodeLink: IMobileRegistryEntryWithQrLink = uris.metamask
    console.log(qrCodeLink)
    const qrCode = qrCodeLink.qrCodeLink
    const options: QRCodeToStringOptions = {
      type: 'svg',
      color: { light: '#121212', dark: '#ffffffff' }
    }
    const qrCodeSvgUpdated = await toString(qrCode, options)
    setContentParams({
      content: ONBOARDING_CONTENT.SCAN,
      qrCodeSvg: qrCodeSvgUpdated,
      providerImgUrl: qrCodeLink.logo
    })
  }

  const handleConnected: WrapRendererCallback<WalletConnectedType> = (
    e,
    accounts
  ) => {
    console.log('connected with accounts = ', accounts)
    setContentParams({
      content: ONBOARDING_CONTENT.SUCCESS
    })
  }

  const handleRejected: WrapRendererCallback<ConnectionRequestRejectedType> = (
    e
  ) => {
    console.log('rejected with ', e)
    setContentParams({
      content: ONBOARDING_CONTENT.REJECTED
    })
  }

  useEffect(() => {
    const removeConnectedListener = window.api.handleConnected(handleConnected)
    const removeRejectedListener =
      window.api.handleConnectionRequestRejected(handleRejected)
    return () => {
      removeConnectedListener()
      removeRejectedListener()
    }
  })

  const onboardingParamsInit: OnboardingModalConfig = {
    title: 'WELCOME TO HYPERPLAY',
    enableBackButton: false,
    enableCloseButton: true
  }

  const [onboardingParams, setOnboardingParams] = useReducer<
    Reducer<OnboardingModalConfig, Partial<OnboardingModalConfig>>
  >((state, newState) => ({ ...state, ...newState }), onboardingParamsInit)

  function renderContent(param: ONBOARDING_CONTENT) {
    switch (param) {
      case ONBOARDING_CONTENT.WELCOME:
        return (
          <Welcome
            setOnboardingModalParams={setOnboardingParams}
            disableOnboarding={props.disableOnboarding}
            handleProviderClicked={async (prov: PROVIDERS) =>
              handleProviderClicked(prov)
            }
            downloadMetaMaskClicked={() =>
              setContentParams({
                content: ONBOARDING_CONTENT.DOWNLOAD
              })
            }
          />
        )
      case ONBOARDING_CONTENT.SCAN:
        return (
          <Scan
            providerImg={contentParams.providerImgUrl}
            qrCodeSvg={contentParams.qrCodeSvg}
            setOnboardingModalParams={setOnboardingParams}
          ></Scan>
        )
      case ONBOARDING_CONTENT.SUCCESS:
        return (
          <Success
            setOnboardingModalParams={setOnboardingParams}
            disableOnboarding={props.disableOnboarding}
          ></Success>
        )
      case ONBOARDING_CONTENT.REJECTED:
        return (
          <Rejected
            setOnboardingModalParams={setOnboardingParams}
            disableOnboarding={props.disableOnboarding}
            onRetryClick={() =>
              setContentParams({
                content: ONBOARDING_CONTENT.WELCOME
              })
            }
          ></Rejected>
        )
      case ONBOARDING_CONTENT.DOWNLOAD:
        return (
          <Download
            setOnboardingModalParams={setOnboardingParams}
            disableOnboarding={props.disableOnboarding}
            onRetryClick={() =>
              setContentParams({
                content: ONBOARDING_CONTENT.WELCOME
              })
            }
          ></Download>
        )
      default:
        return (
          <Welcome
            setOnboardingModalParams={setOnboardingParams}
            disableOnboarding={props.disableOnboarding}
            handleProviderClicked={async (prov: PROVIDERS) =>
              handleProviderClicked(prov)
            }
            downloadMetaMaskClicked={() =>
              setContentParams({
                content: ONBOARDING_CONTENT.DOWNLOAD
              })
            }
          />
        )
    }
  }
  return (
    <div className="blurBackground">
      <div className="welcomeModal">
        <div className="welcomeTitleFrame">
          <button
            className={
              onboardingParams.enableBackButton
                ? 'backArrow'
                : 'backArrow disableButton'
            }
            onClick={() =>
              setContentParams({ content: ONBOARDING_CONTENT.WELCOME })
            }
          >
            <img src="/src/frontend/assets/hyperplay/back_arrow.svg"></img>
          </button>
          <h1 className="welcomeTitle">{onboardingParams.title}</h1>
          <button
            className={
              onboardingParams.enableCloseButton
                ? 'closeButton'
                : 'closeButton disableButton'
            }
            onClick={() => props.disableOnboarding()}
          >
            <img src="/src/frontend/assets/hyperplay/close_x.svg"></img>
          </button>
        </div>
        <div className="contentContainer">
          {renderContent(contentParams.content)}
        </div>
      </div>
    </div>
  )
}

export default Onboarding

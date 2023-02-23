import {
  UrisReturn,
  IMobileRegistryEntryWithQrLink,
  WalletConnectedType,
  ConnectionRequestRejectedType
} from 'backend/hyperplay-proxy-server/commonProxyTypes'
import { PROVIDERS } from 'common/types/proxy-types'
import React, { Reducer, useEffect, useReducer, useContext } from 'react'
import './index.css'
import Scan from './scan'
import { ONBOARDING_CONTENT, OnboardingModalConfig } from './types'
import Welcome from './welcome'
import { toString, QRCodeToStringOptions } from 'qrcode'
import { WrapRendererCallback } from 'common/types'
import Success from './success'
import Rejected from './rejected'
import Download from './download'
import { BackArrow, CloseX } from 'frontend/assets/hyperplay'
import { MetaMaskImportOptions } from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import ImportMetaMask from './import'
import ContextProvider from 'frontend/state/ContextProvider'

interface OnboardingProps {
  disableOnboarding: () => void
}

interface ContentParams {
  content: ONBOARDING_CONTENT
  qrCodeSvg: string
  providerImgUrl: string
  mmImportPaths?: MetaMaskImportOptions
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

  const { setShowMetaMaskBrowserSidebarLinks } = useContext(ContextProvider)

  async function handleProviderClicked(provider: PROVIDERS) {
    setShowMetaMaskBrowserSidebarLinks(false)
    const uris: UrisReturn = await window.api.getConnectionUris(provider)
    const qrCodeLink: IMobileRegistryEntryWithQrLink = uris.metamask
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

  async function connectMetaMaskExtension(){
    setShowMetaMaskBrowserSidebarLinks(true)
    await window.api.getConnectionUris(PROVIDERS.METAMASK_EXTENSION)
    props.disableOnboarding()
  }

  async function handleMmExtensionProviderClicked() {
    const metamaskIsInitialized = await window.api.isExtensionInitialized()
    const importOptions = await window.api.getMetaMaskImportOptions()

    if (metamaskIsInitialized) {
      connectMetaMaskExtension()
    }
    else{
      setContentParams({
        content: ONBOARDING_CONTENT.IMPORT,
        mmImportPaths: importOptions
      })
    }
  }

  async function handleImportMmExtensionClicked(dbPath?: string | null){
    if (dbPath === null) {
      window.api.createNewMetaMaskWallet()
    }
    else{
      const success = await window.api.importMetaMask(dbPath)
      if (!success) {
        console.error('There was a problem importing MetaMask!')
        return
      }
      connectMetaMaskExtension()
    }
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

  const { content } = contentParams

  // Track the screen view once each time the view changes
  useEffect(() => {
    window.api.trackScreen('Onboarding', { view: content })
  }, [content])

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

  function getWelcomeElement(){
    
    return (<Welcome
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
    handleMmExtensionProviderClicked={handleMmExtensionProviderClicked}
  />)
  }

  function renderContent(param: ONBOARDING_CONTENT) {
    switch (param) {
      case ONBOARDING_CONTENT.WELCOME:
        return getWelcomeElement()
      case ONBOARDING_CONTENT.IMPORT:
        return (
          <ImportMetaMask
            importOptions={contentParams.mmImportPaths!}
            handleImportMmExtensionClicked={handleImportMmExtensionClicked}
            setOnboardingModalParams={setOnboardingParams}
            disableOnboarding={props.disableOnboarding}
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
        return getWelcomeElement()
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
            <BackArrow />
          </button>
          <h6 className="welcomeTitle">{onboardingParams.title}</h6>
          <button
            className={
              onboardingParams.enableCloseButton
                ? 'closeButton'
                : 'closeButton disableButton'
            }
            onClick={() => props.disableOnboarding()}
          >
            <CloseX />
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

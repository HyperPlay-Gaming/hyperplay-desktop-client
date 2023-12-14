import React, { useEffect, useState } from 'react'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'
import { LDEnv } from 'common/types'

type Props = {
  children: React.ReactNode
}

const LDProvider = ({ children }: Props): React.ReactElement => {
  const [ldConfig, setLDConfig] = useState<LDEnv>({
    envId: '',
    ldUser: {
      kind: 'user',
      key: ''
    }
  })
  const [provider, setProvider] = useState<React.ReactElement>(<></>)

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await window.api.getLDEnvConfig()
      setLDConfig(config)
    }

    fetchConfig()
  }, [])

  useEffect(() => {
    if (!ldConfig.envId) {
      return
    }
    const fetchProvider = async () => {
      const AsyncLDProvider = await asyncWithLDProvider({
        clientSideID: ldConfig.envId,
        context: ldConfig.ldUser
      })

      setProvider(<AsyncLDProvider>{children}</AsyncLDProvider>)
    }
    fetchProvider()
  }, [ldConfig])

  return provider
}

export default LDProvider

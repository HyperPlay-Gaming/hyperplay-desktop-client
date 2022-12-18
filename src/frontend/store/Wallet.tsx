import React, { useEffect } from 'react'

import { atom, useSetAtom } from 'jotai'

export const addressAtom = atom<null | string>(null)

export const isConnected = atom((get) => !!get(addressAtom))

export default function WalletStoreController() {
  const setAddress = useSetAtom(addressAtom)

  useEffect(() => {
    window.api.handleAccountsChanged((_e, accounts: string[]) => {
      setAddress(accounts[0])
    })

    window.api.handleDisconnected(() => {
      setAddress(null)
    })
  })

  return <></>
}

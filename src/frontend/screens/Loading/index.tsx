import React, { useEffect } from 'react'

import { UpdateComponentBase } from 'frontend/components/UI/UpdateComponent'

const Loading = function () {
  useEffect(() => {
    window.api.loadingScreenReady()
  })

  return <UpdateComponentBase message="Loading" />
}

export default Loading

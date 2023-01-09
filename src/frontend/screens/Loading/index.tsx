import React, { useEffect } from 'react'

import { UpdateComponentBase } from 'frontend/components/UI/UpdateComponent'

const Loading = function () {
  useEffect(() => {
    window.api.loadingScreenReady()
  })

  return <UpdateComponentBase />
}

export default Loading

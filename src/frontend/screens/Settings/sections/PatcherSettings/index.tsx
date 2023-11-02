import { Group } from '@mantine/core'
import { Button } from '@hyperplay/ui'
import React from 'react'

export default function GamesSettings() {
  return (
    <div>
      <Group>
        <Button onClick={window.api.downloadIPDT}>
          Download ipdt
        </Button>
      </Group>
    </div>
  )
}

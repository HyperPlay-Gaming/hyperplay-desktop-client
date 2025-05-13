## Loading a Flag

### Electron example


    const showAmazonStore = ldMainClient.variation('amazon-store', false)

    if (showAmazonStore) {
        logInfo('Showing Amazon Store', LogPrefix.Backend)
    } else {
        logInfo('Not showing Amazon Store', LogPrefix.Backend)
    }


### React example

      const flags = useFlags()
      // OR
      const ldClient = useLDClient()


      // use flags if we know the key for it
      if (flags.amazonStore) {
        console.log('amazon store flag is true')
      }

      // get all flags for the SDK (React SDK needs to be enabled in LD for it to show)
      const allFlags = ldClient.allFlags()

      // pass the flag and a default value if it wasn't found
      const showAmazonStore = ldClient.variation('amazon-store', false)

      if (showAmazonStore) {
        console.log('amazon store flag is true')
      }
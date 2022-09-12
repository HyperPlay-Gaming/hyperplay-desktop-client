import { IAppEntry } from '@walletconnect/types'

interface IAppRegistryWithExtraFields {
  [id: string]: IAppEntry & {
    description: string
    versions: Array<string>
    app_type: string
  }
}

interface Registry {
  listings: IAppRegistryWithExtraFields
  count: number
}
// the following rule is necessary as wallet connect library type uses string
// but the registry contains explicit null values
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const registryCache: Registry = {
  listings: {
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369': {
      id: '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
      name: 'Rainbow',
      description:
        'Rainbow is a fun, simple, and secure way to get started with crypto and explore the new world of Ethereum',
      homepage: 'https://rainbow.me/',
      chains: ['eip155:1', 'eip155:10', 'eip155:137', 'eip155:42161'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '6089655c-cb7e-414b-f742-01fdc154be00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/6089655c-cb7e-414b-f742-01fdc154be00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/6089655c-cb7e-414b-f742-01fdc154be00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/6089655c-cb7e-414b-f742-01fdc154be00'
      },
      app: {
        browser: null as any as any,
        ios: 'https://apps.apple.com/app/rainbow-ethereum-wallet/id1457119021',
        android: 'https://play.google.com/store/apps/details?id=me.rainbow',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'rainbow:', universal: 'https://rnbwapp.com' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Rainbow',
        colors: { primary: '#001e59', secondary: null as any }
      }
    },
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0': {
      id: '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
      name: 'Trust Wallet',
      description: '',
      homepage: 'https://trustwallet.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '0528ee7e-16d1-4089-21e3-bbfb41933100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/0528ee7e-16d1-4089-21e3-bbfb41933100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/0528ee7e-16d1-4089-21e3-bbfb41933100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/0528ee7e-16d1-4089-21e3-bbfb41933100'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/apple-store/id1288339409',
        android:
          'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'trust:', universal: 'https://link.trustwallet.com' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Trust',
        colors: { primary: '#3375bb', secondary: '' }
      }
    },
    cf21952a9bc8108bf13b12c92443751e2cc388d27008be4201b92bbc6d83dd46: {
      id: 'cf21952a9bc8108bf13b12c92443751e2cc388d27008be4201b92bbc6d83dd46',
      name: 'Argent',
      description: '',
      homepage: 'https://argent.xyz/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ce5fbfe8-13b5-4f5f-184a-34f6ee7a3d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ce5fbfe8-13b5-4f5f-184a-34f6ee7a3d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ce5fbfe8-13b5-4f5f-184a-34f6ee7a3d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ce5fbfe8-13b5-4f5f-184a-34f6ee7a3d00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/argent/id1358741926',
        android:
          'https://play.google.com/store/apps/details?id=im.argent.contractwalletclient',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'argent://app', universal: 'https://argent.link/app' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Argent',
        colors: { primary: '#ff875b', secondary: '' }
      }
    },
    c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96: {
      id: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      name: 'MetaMask',
      description:
        'Whether you are an experienced user or brand new to blockchain, MetaMask helps you connect to the decentralized web: a new internet.',
      homepage: 'https://metamask.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '5195e9db-94d8-4579-6f11-ef553be95100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/5195e9db-94d8-4579-6f11-ef553be95100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/5195e9db-94d8-4579-6f11-ef553be95100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/5195e9db-94d8-4579-6f11-ef553be95100'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
        android: 'https://play.google.com/store/apps/details?id=io.metamask',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'metamask:', universal: 'https://metamask.app.link' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'MetaMask',
        colors: { primary: '#ffffff', secondary: null as any }
      }
    },
    '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f': {
      id: '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
      name: 'Gnosis Safe Multisig',
      description: null as any,
      homepage: 'https://gnosis-safe.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '0b7e0f05-0a5b-4f3c-315d-59c1c4c22c00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/0b7e0f05-0a5b-4f3c-315d-59c1c4c22c00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/0b7e0f05-0a5b-4f3c-315d-59c1c4c22c00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/0b7e0f05-0a5b-4f3c-315d-59c1c4c22c00'
      },
      app: {
        browser: 'https://gnosis-safe.io/app/',
        ios: 'https://apps.apple.com/app/id1515759131',
        android: 'https://play.google.com/store/apps/details?id=io.gnosis.safe',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'gnosissafe:', universal: 'https://gnosis-safe.io/' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Gnosis Safe',
        colors: { primary: '#091828', secondary: '#fff' }
      }
    },
    f2436c67184f158d1beda5df53298ee84abfc367581e4505134b5bcf5f46697d: {
      id: 'f2436c67184f158d1beda5df53298ee84abfc367581e4505134b5bcf5f46697d',
      name: 'Crypto.com | DeFi Wallet',
      description:
        'A non-custodial wallet that gives you access to a full suite of DeFi services in one place.',
      homepage: 'https://crypto.com/',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '7c5ff577-a68d-49c5-02cd-3d83637b0b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7c5ff577-a68d-49c5-02cd-3d83637b0b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7c5ff577-a68d-49c5-02cd-3d83637b0b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7c5ff577-a68d-49c5-02cd-3d83637b0b00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/id1262148500',
        android:
          'https://play.google.com/store/apps/details?id=co.mona.android',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'cryptowallet:',
        universal: 'https://wallet.crypto.com'
      },
      desktop: { native: 'cryptowallet:', universal: null as any },
      metadata: {
        shortName: 'Crypto.com',
        colors: { primary: '#1199fa', secondary: null as any }
      }
    },
    '0b58bf037bf943e934706796fb017d59eace1dadcbc1d9fe24d9b46629e5985c': {
      id: '0b58bf037bf943e934706796fb017d59eace1dadcbc1d9fe24d9b46629e5985c',
      name: 'Pillar',
      description: '',
      homepage: 'https://pillarproject.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '0eb8230d-ce4c-42fb-2a57-a84a6eb7ea00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/0eb8230d-ce4c-42fb-2a57-a84a6eb7ea00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/0eb8230d-ce4c-42fb-2a57-a84a6eb7ea00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/0eb8230d-ce4c-42fb-2a57-a84a6eb7ea00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/apple-store/id1346582238',
        android:
          'https://play.google.com/store/apps/details?id=com.pillarproject.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'pillarwallet:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Pillar',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '9d373b43ad4d2cf190fb1a774ec964a1addf406d6fd24af94ab7596e58c291b2': {
      id: '9d373b43ad4d2cf190fb1a774ec964a1addf406d6fd24af94ab7596e58c291b2',
      name: 'imToken',
      description: '',
      homepage: 'https://token.im/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '1991f85d-43d4-4165-3502-cd6ef8312b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/1991f85d-43d4-4165-3502-cd6ef8312b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/1991f85d-43d4-4165-3502-cd6ef8312b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/1991f85d-43d4-4165-3502-cd6ef8312b00'
      },
      app: {
        browser: '',
        ios: 'https://itunes.apple.com/us/app/imtoken2/id1384798940',
        android: 'https://play.google.com/store/apps/details?id=im.token.app',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'imtokenv2:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'imToken',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    dceb063851b1833cbb209e3717a0a0b06bf3fb500fe9db8cd3a553e4b1d02137: {
      id: 'dceb063851b1833cbb209e3717a0a0b06bf3fb500fe9db8cd3a553e4b1d02137',
      name: 'ONTO',
      description: '',
      homepage: 'https://onto.app/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd22b2a4b-5562-49ba-506b-6d5986914600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d22b2a4b-5562-49ba-506b-6d5986914600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d22b2a4b-5562-49ba-506b-6d5986914600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d22b2a4b-5562-49ba-506b-6d5986914600'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/onto-an-ontology-dapp/id1436009823',
        android:
          'https://play.google.com/store/apps/details?id=com.github.ontio.onto',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'ontoprovider:', universal: 'https://onto.app' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'ONTO',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '74f8092562bd79675e276d8b2062a83601a4106d30202f2d509195e30e19673d': {
      id: '74f8092562bd79675e276d8b2062a83601a4106d30202f2d509195e30e19673d',
      name: 'Spot',
      description:
        'Spot is a mobile & secure non-custodial wallet for Ethereum, Solana, Bitcoin, Tezos & NFTs. Access web3 & DeFi with WalletConnect.',
      homepage: 'https://www.spot-wallet.com/',
      chains: ['eip155:1'],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: '7d90b813-c44e-41c2-a105-d20b26c71000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7d90b813-c44e-41c2-a105-d20b26c71000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7d90b813-c44e-41c2-a105-d20b26c71000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7d90b813-c44e-41c2-a105-d20b26c71000'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/buy-bitcoin-spot-wallet-app/id1390560448',
        android: 'https://play.google.com/store/apps/details?id=com.spot.spot',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'spot:', universal: 'https://spot.so/' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Spot',
        colors: { primary: '#29C0FF', secondary: '#29C0FF' }
      }
    },
    afbd95522f4041c71dd4f1a065f971fd32372865b416f95a0b1db759ae33f2a7: {
      id: 'afbd95522f4041c71dd4f1a065f971fd32372865b416f95a0b1db759ae33f2a7',
      name: 'Omni',
      description: 'Multi chain, self custodial DeFi wallet',
      homepage: 'https://omni.app',
      chains: [],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: '2cd67b4c-282b-4809-e7c0-a88cd5116f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2cd67b4c-282b-4809-e7c0-a88cd5116f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2cd67b4c-282b-4809-e7c0-a88cd5116f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2cd67b4c-282b-4809-e7c0-a88cd5116f00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/de/app/steakwallet/id1569375204?l=en',
        android:
          'https://play.google.com/store/apps/details?id=fi.steakwallet.app',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'omni', universal: 'https://links.omni.app' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Omni',
        colors: { primary: '#FFFFFF', secondary: '#000000' }
      }
    },
    '20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66': {
      id: '20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66',
      name: 'TokenPocket',
      description:
        'TokenPocket is a secure and powerful multi-chain wallet for managing BTC, ETH, BSC, TRON, Polygon, HECO, Solana, EOS, Cosmos and so on.',
      homepage: 'https://tokenpocket.pro/',
      chains: [
        'eip155:1',
        'eip155:10',
        'eip155:56',
        'eip155:66',
        'eip155:100',
        'eip155:137',
        'eip155:170',
        'eip155:250',
        'eip155:321',
        'eip155:1284',
        'eip155:1285',
        'eip155:8217',
        'eip155:42161',
        'eip155:43114',
        'eip155:1666600000'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'f3119826-4ef5-4d31-4789-d4ae5c18e400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f3119826-4ef5-4d31-4789-d4ae5c18e400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f3119826-4ef5-4d31-4789-d4ae5c18e400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f3119826-4ef5-4d31-4789-d4ae5c18e400'
      },
      app: {
        browser:
          'https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii',
        ios: 'https://apps.apple.com/us/app/tokenpocket-trusted-wallet/id1436028697',
        android:
          'https://play.google.com/store/apps/details?id=vip.mytokenpocket',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'tpoutside:', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'TokenPocket',
        colors: { primary: '#2982fe', secondary: '' }
      }
    },
    '7674bb4e353bf52886768a3ddc2a4562ce2f4191c80831291218ebd90f5f5e26': {
      id: '7674bb4e353bf52886768a3ddc2a4562ce2f4191c80831291218ebd90f5f5e26',
      name: 'MathWallet',
      description: 'The Multichain Wallet for Web3',
      homepage: 'https://mathwallet.org/',
      chains: [
        'eip155:1',
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'polkadot:b0a8d493285c2df73290dfb7e61f870f',
        'cosmos:cosmoshub-4',
        'cosmos:irishub-1'
      ],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: '26a8f588-3231-4411-60ce-5bb6b805a700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/26a8f588-3231-4411-60ce-5bb6b805a700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/26a8f588-3231-4411-60ce-5bb6b805a700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/26a8f588-3231-4411-60ce-5bb6b805a700'
      },
      app: {
        browser:
          'https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc',
        ios: 'https://apps.apple.com/us/app/mathwallet5/id1582612388',
        android:
          'https://play.google.com/store/apps/details?id=com.mathwallet.android',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'mathwallet:',
        universal: 'https://www.mathwallet.org'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'MathWallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    ccb714920401f7d008dbe11281ae70e3a4bfb621763b187b9e4a3ce1ab8faa3b: {
      id: 'ccb714920401f7d008dbe11281ae70e3a4bfb621763b187b9e4a3ce1ab8faa3b',
      name: 'BitPay',
      description: '',
      homepage: 'https://bitpay.com',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '97d4429f-eaf0-4302-87f5-9d26d46fe700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/97d4429f-eaf0-4302-87f5-9d26d46fe700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/97d4429f-eaf0-4302-87f5-9d26d46fe700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/97d4429f-eaf0-4302-87f5-9d26d46fe700'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/bitpay-buy-crypto/id1149581638',
        android:
          'https://play.google.com/store/apps/details?id=com.bitpay.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: {
        native: 'bitpay:',
        universal: 'https://link.bitpay.com/wallet'
      },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'BitPay',
        colors: { primary: '#1a3c8b', secondary: '' }
      }
    },
    '83f26999937cbc2e2014655796da4b05f77c1de9413a0ee6d0c6178ebcfc3168': {
      id: '83f26999937cbc2e2014655796da4b05f77c1de9413a0ee6d0c6178ebcfc3168',
      name: 'WallETH',
      description: '',
      homepage: 'https://walleth.org/',
      chains: [
        'eip155:1',
        'eip155:100',
        'eip155:3',
        'eip155:4',
        'eip155:5',
        'eip155:10',
        'eip155:77'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '8b59dafd-9150-46be-9793-34e6d3298100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/8b59dafd-9150-46be-9793-34e6d3298100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/8b59dafd-9150-46be-9793-34e6d3298100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/8b59dafd-9150-46be-9793-34e6d3298100'
      },
      app: {
        browser: '',
        ios: '',
        android: 'https://play.google.com/store/apps/details?id=org.walleth',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'WallETH', colors: { primary: '', secondary: '' } }
    },
    '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927': {
      id: '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927',
      name: 'Ledger Live',
      description:
        "Web3 Wallet from the company that produced the world's most secure crypto hardware device.",
      homepage: 'https://www.ledger.com/ledger-live',
      chains: ['eip155:1', 'eip155:56', 'eip155:137', 'eip155:4'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a7f416de-aa03-4c5e-3280-ab49269aef00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a7f416de-aa03-4c5e-3280-ab49269aef00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a7f416de-aa03-4c5e-3280-ab49269aef00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a7f416de-aa03-4c5e-3280-ab49269aef00'
      },
      app: {
        browser: 'https://www.ledger.com/ledger-live/download',
        ios: 'https://itunes.apple.com/app/id1361671700',
        android:
          'https://play.google.com/store/apps/details?id=com.ledger.live',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'ledgerlive:', universal: '' },
      desktop: { native: 'ledgerlive:', universal: '' },
      metadata: {
        shortName: 'Ledger',
        colors: { primary: '#000000', secondary: '#FF5300' }
      }
    },
    '71dad538ba02a9b321041d388f9c1efe14e0d1915a2ea80a90405d2f6b67a33d': {
      id: '71dad538ba02a9b321041d388f9c1efe14e0d1915a2ea80a90405d2f6b67a33d',
      name: 'Authereum',
      description: '',
      homepage: 'https://authereum.org',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'deb6ec25-fcec-4b1b-c536-df3b4fb92b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/deb6ec25-fcec-4b1b-c536-df3b4fb92b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/deb6ec25-fcec-4b1b-c536-df3b4fb92b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/deb6ec25-fcec-4b1b-c536-df3b4fb92b00'
      },
      app: {
        browser: 'https://authereum.com/i/account',
        ios: '',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Authereum',
        colors: { primary: '', secondary: '' }
      }
    },
    '2863183c3299d820fb9a4cb8aab4a34f50380c9992e8be871fd60a62e8d36481': {
      id: '2863183c3299d820fb9a4cb8aab4a34f50380c9992e8be871fd60a62e8d36481',
      name: '1inch Wallet',
      description: '',
      homepage: 'https://1inch.io/wallet/',
      chains: ['eip155:1', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'dce1ee99-403f-44a9-9f94-20de30616500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/dce1ee99-403f-44a9-9f94-20de30616500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/dce1ee99-403f-44a9-9f94-20de30616500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/dce1ee99-403f-44a9-9f94-20de30616500'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/1inch-defi-wallet/id1546049391',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '1inch:', universal: 'https://wallet.1inch.io' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: '1inch',
        colors: { primary: '#1f242e', secondary: '' }
      }
    },
    '797c615e2c556b610c048eb35535f212c0dd58de5d03e763120e90a7d1350a77': {
      id: '797c615e2c556b610c048eb35535f212c0dd58de5d03e763120e90a7d1350a77',
      name: 'Huobi Wallet',
      description: '',
      homepage: 'https://huobiwallet.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '5a96d19c-93d3-4e6a-624a-16f52773d000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/5a96d19c-93d3-4e6a-624a-16f52773d000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/5a96d19c-93d3-4e6a-624a-16f52773d000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/5a96d19c-93d3-4e6a-624a-16f52773d000'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/id1433883012',
        android:
          'https://play.google.com/store/apps/details?id=com.huobionchainwallet.gp',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'huobiwallet:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Huobi',
        colors: { primary: '#2d67f8', secondary: '' }
      }
    },
    efba9ae0a9e0fdd9e3e055ddf3c8e75f294babb8aea3499456eff27f771fda61: {
      id: 'efba9ae0a9e0fdd9e3e055ddf3c8e75f294babb8aea3499456eff27f771fda61',
      name: 'Eidoo',
      description: '',
      homepage: 'https://eidoo.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ef5b8bcf-00d5-457d-e161-9911e4788700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ef5b8bcf-00d5-457d-e161-9911e4788700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ef5b8bcf-00d5-457d-e161-9911e4788700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ef5b8bcf-00d5-457d-e161-9911e4788700'
      },
      app: {
        browser: '',
        ios: 'https://itunes.apple.com/app/apple-store/id1279896253',
        android:
          'https://play.google.com/store/apps/details?id=io.eidoo.wallet.prodnet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'eidoo:', universal: 'https://eidoo.io/crypto-wallet' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Eidoo',
        colors: { primary: '#37b39e', secondary: '' }
      }
    },
    '61f6e716826ae8455ad16abc5ec31e4fd5d6d2675f0ce2dee3336335431f720e': {
      id: '61f6e716826ae8455ad16abc5ec31e4fd5d6d2675f0ce2dee3336335431f720e',
      name: 'MYKEY',
      description: '',
      homepage: 'https://mykey.org',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'df0306ae-f33c-454f-8679-39aed351c800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/df0306ae-f33c-454f-8679-39aed351c800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/df0306ae-f33c-454f-8679-39aed351c800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/df0306ae-f33c-454f-8679-39aed351c800'
      },
      app: {
        browser: '',
        ios: 'https://itunes.apple.com/app/id1458318224',
        android: 'https://play.google.com/store/apps/details?id=com.mykey.id',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'mykeywalletconnect:', universal: 'https://mykey.org' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'MYKEY',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    c36c969aefd9d2e8ce6c1b90da90c0970699aee14b07c7a84b1124873d84c53d: {
      id: 'c36c969aefd9d2e8ce6c1b90da90c0970699aee14b07c7a84b1124873d84c53d',
      name: 'Loopring Wallet',
      description: '',
      homepage: 'https://loopring.io',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '2972bbf8-0891-414a-f63c-8d3bcf661d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2972bbf8-0891-414a-f63c-8d3bcf661d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2972bbf8-0891-414a-f63c-8d3bcf661d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2972bbf8-0891-414a-f63c-8d3bcf661d00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/loopring-smart-wallet/id1550921126',
        android:
          'https://play.google.com/store/apps/details?id=loopring.defi.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Loopring',
        colors: { primary: '', secondary: '' }
      }
    },
    '6bb4596640ce9f8c02fbaa83e3685425455a0917d025608b4abc53bfe55887c6': {
      id: '6bb4596640ce9f8c02fbaa83e3685425455a0917d025608b4abc53bfe55887c6',
      name: 'TrustVault',
      description: '',
      homepage: 'https://trustology.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'fc5e0354-cc1e-490d-fb62-477e83148000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/fc5e0354-cc1e-490d-fb62-477e83148000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/fc5e0354-cc1e-490d-fb62-477e83148000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/fc5e0354-cc1e-490d-fb62-477e83148000'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/apple-store/id1455959680',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'TrustVault',
        colors: { primary: '', secondary: '' }
      }
    },
    '185850e869e40f4e6c59b5b3f60b7e63a72e88b09e2a43a40b1fd0f237e49e9a': {
      id: '185850e869e40f4e6c59b5b3f60b7e63a72e88b09e2a43a40b1fd0f237e49e9a',
      name: 'Atomic',
      description: '',
      homepage: 'https://atomicwallet.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'adb1ed3f-722c-48a0-441f-c75038a9a300',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/adb1ed3f-722c-48a0-441f-c75038a9a300',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/adb1ed3f-722c-48a0-441f-c75038a9a300',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/adb1ed3f-722c-48a0-441f-c75038a9a300'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/atomic-wallet/id1478257827',
        android:
          'https://play.google.com/store/apps/details?id=io.atomicwallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Atomic', colors: { primary: '', secondary: '' } }
    },
    b021913ba555948a1c81eb3d89b372be46f8354e926679de648e4fa2938bed3e: {
      id: 'b021913ba555948a1c81eb3d89b372be46f8354e926679de648e4fa2938bed3e',
      name: 'Coin98',
      description: '',
      homepage: 'https://coin98.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'dee547be-936a-4c92-9e3f-7a2350a62e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/dee547be-936a-4c92-9e3f-7a2350a62e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/dee547be-936a-4c92-9e3f-7a2350a62e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/dee547be-936a-4c92-9e3f-7a2350a62e00'
      },
      app: {
        browser: '',
        ios: 'https://ios.coin98.com/',
        android:
          'https://play.google.com/store/apps/details?id=coin98.crypto.finance.media',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'coin98:', universal: 'https://coin98.com' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Coin98',
        colors: { primary: '#272727', secondary: '' }
      }
    },
    '1f69170bf7a9bdcf89403ec012659b7124e158f925cdd4a2be49274c24cf5e5d': {
      id: '1f69170bf7a9bdcf89403ec012659b7124e158f925cdd4a2be49274c24cf5e5d',
      name: 'CoolWallet',
      description: 'Building secure and user-friendly blockchain solutions',
      homepage: 'https://coolwallet.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'e97c4a6d-cd91-4331-ac98-196141df5300',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e97c4a6d-cd91-4331-ac98-196141df5300',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e97c4a6d-cd91-4331-ac98-196141df5300',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e97c4a6d-cd91-4331-ac98-196141df5300'
      },
      app: {
        browser: null as any,
        ios: 'https://itunes.apple.com/us/app/coolwallet-s-2018/id1328764142',
        android:
          'https://play.google.com/store/apps/details?id=com.coolbitx.cwsapp',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'coolwallet:', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'CoolWallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    beea4e71c2ffbb48b59b21e33fb0049ef6522585aa9c8a33a97d3e1c81f16693: {
      id: 'beea4e71c2ffbb48b59b21e33fb0049ef6522585aa9c8a33a97d3e1c81f16693',
      name: 'Alice',
      description: '',
      homepage: 'https://alicedapp.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'bd1ce165-9b3a-4925-73c1-b329ca13e900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/bd1ce165-9b3a-4925-73c1-b329ca13e900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/bd1ce165-9b3a-4925-73c1-b329ca13e900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/bd1ce165-9b3a-4925-73c1-b329ca13e900'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/au/app/alice-browser/id1472818028',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Alice', colors: { primary: '', secondary: '' } }
    },
    '138f51c8d00ac7b9ac9d8dc75344d096a7dfe370a568aa167eabc0a21830ed98': {
      id: '138f51c8d00ac7b9ac9d8dc75344d096a7dfe370a568aa167eabc0a21830ed98',
      name: 'AlphaWallet',
      description: 'Ethereum, EVM wallet',
      homepage: 'https://alphawallet.com/',
      chains: [
        'eip155:5',
        'eip155:10',
        'eip155:42',
        'eip155:56',
        'eip155:61',
        'eip155:69',
        'eip155:77',
        'eip155:97',
        'eip155:99',
        'eip155:100',
        'eip155:137',
        'eip155:200',
        'eip155:256',
        'eip155:1',
        'eip155:3',
        'eip155:4',
        'eip155:338',
        'eip155:4002',
        'eip155:42161',
        'eip155:43113',
        'eip155:43114',
        'eip155:11297108099',
        'eip155:11297108109'
      ],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: '5b1cddfb-056e-4e78-029a-54de5d70c500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/5b1cddfb-056e-4e78-029a-54de5d70c500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/5b1cddfb-056e-4e78-029a-54de5d70c500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/5b1cddfb-056e-4e78-029a-54de5d70c500'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/alphawallet-eth-wallet/id1358230430',
        android:
          'https://play.google.com/store/apps/details?id=io.stormbird.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'awallet:', universal: 'https://aw.app' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'AlphaWallet',
        colors: { primary: '#ffffff', secondary: null as any }
      }
    },
    '468b4ab3582757233017ec10735863489104515ab160c053074905a1eecb7e63': {
      id: '468b4ab3582757233017ec10735863489104515ab160c053074905a1eecb7e63',
      name: "D'CENT Wallet",
      description: '',
      homepage: 'https://dcentwallet.com',
      chains: ['eip155:1', 'eip155:56', 'eip155:137', 'eip155:30'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '1efb49ec-2bab-4fa1-f2f2-4392c64ed000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/1efb49ec-2bab-4fa1-f2f2-4392c64ed000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/1efb49ec-2bab-4fa1-f2f2-4392c64ed000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/1efb49ec-2bab-4fa1-f2f2-4392c64ed000'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/dcent-hardware-wallet/id1447206611',
        android:
          'https://play.google.com/store/apps/details?id=com.kr.iotrust.dcent.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'dcent:', universal: 'https://link.dcentwallet.com' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: "D'CENT",
        colors: { primary: '#fff', secondary: '#fff' }
      }
    },
    '29f4a70ad5993f3f73ae8119f0e78ecbae51deec2a021a770225c644935c0f09': {
      id: '29f4a70ad5993f3f73ae8119f0e78ecbae51deec2a021a770225c644935c0f09',
      name: 'ZelCore',
      description: '',
      homepage: 'https://zel.network',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '97d45a92-a1f0-46da-95a6-ad5db99f3500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/97d45a92-a1f0-46da-95a6-ad5db99f3500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/97d45a92-a1f0-46da-95a6-ad5db99f3500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/97d45a92-a1f0-46da-95a6-ad5db99f3500'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/zelcore/id1436296839',
        android:
          'https://play.google.com/store/apps/details?id=com.zelcash.zelcore',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'zel:', universal: 'https://link.zel.network' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'ZelCore',
        colors: { primary: '#232220', secondary: '' }
      }
    },
    '8240fb8a7b117aed27f04aa8870c714eeb910f7c1b16c9b868e793c1836335b8': {
      id: '8240fb8a7b117aed27f04aa8870c714eeb910f7c1b16c9b868e793c1836335b8',
      name: 'Nash',
      description: '',
      homepage: 'https://nash.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '12f981b1-bb0a-4115-009f-317255979600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/12f981b1-bb0a-4115-009f-317255979600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/12f981b1-bb0a-4115-009f-317255979600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/12f981b1-bb0a-4115-009f-317255979600'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/nash-app/id1475759236',
        android: 'https://play.google.com/store/apps/details?id=io.nash.app',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'nash:', universal: 'https://nash.io/walletconnect' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Nash',
        colors: { primary: '#0052f3', secondary: '' }
      }
    },
    '15d7610042217f691385d20e640869dc7273e991b04e8f476417cdc5ec856955': {
      id: '15d7610042217f691385d20e640869dc7273e991b04e8f476417cdc5ec856955',
      name: 'Coinomi',
      description:
        'The blockchain wallet trusted by millions. Securely store, manage, and exchange Bitcoin, Ethereum, and more than 1,770 Tokens and Altcoins.',
      homepage: 'https://www.coinomi.com/',
      chains: ['eip155:1', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '3b446d16-a908-40c8-5835-9a6efe90dd00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/3b446d16-a908-40c8-5835-9a6efe90dd00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/3b446d16-a908-40c8-5835-9a6efe90dd00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/3b446d16-a908-40c8-5835-9a6efe90dd00'
      },
      app: {
        browser: null as any,
        ios: 'https://itunes.apple.com/app/coinomi-wallet/id1333588809',
        android:
          'https://play.google.com/store/apps/details?id=com.coinomi.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'coinomi:', universal: 'https://coinomi.page.link' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Coinomi',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '6ec1ffc9627c3b9f87676da3f7b5796828a6c016d3253e51e771e6f951cb5702': {
      id: '6ec1ffc9627c3b9f87676da3f7b5796828a6c016d3253e51e771e6f951cb5702',
      name: 'GridPlus',
      description: '',
      homepage: 'https://gridplus.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '3c928cbd-39dc-4090-c372-d4dcb3c89500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/3c928cbd-39dc-4090-c372-d4dcb3c89500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/3c928cbd-39dc-4090-c372-d4dcb3c89500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/3c928cbd-39dc-4090-c372-d4dcb3c89500'
      },
      app: {
        browser: '',
        ios: '',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'GridPlus',
        colors: { primary: '', secondary: '' }
      }
    },
    a395dbfc92b5519cbd1cc6937a4e79830187daaeb2c6fcdf9b9cce4255f2dcd5: {
      id: 'a395dbfc92b5519cbd1cc6937a4e79830187daaeb2c6fcdf9b9cce4255f2dcd5',
      name: 'CYBAVO Wallet',
      description: '',
      homepage: 'https://cybavo.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '3117d3ce-b973-4cfd-8fb5-f5d72ed3c200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/3117d3ce-b973-4cfd-8fb5-f5d72ed3c200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/3117d3ce-b973-4cfd-8fb5-f5d72ed3c200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/3117d3ce-b973-4cfd-8fb5-f5d72ed3c200'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/tw/app/cybavo-wallet/id1510697681',
        android:
          'https://play.google.com/store/apps/details?id=com.cybavo.btc.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'cybavowallet:', universal: 'https://cdn.cybavo.com' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'CYBAVO',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    c889f5add667a8c69d147d613c7f18a4bd97c2e47c946cabfdd13ec1d596e4a0: {
      id: 'c889f5add667a8c69d147d613c7f18a4bd97c2e47c946cabfdd13ec1d596e4a0',
      name: 'Tokenary',
      description: '',
      homepage: 'https://tokenary.io/',
      chains: [
        'eip155:1',
        'eip155:10',
        'eip155:56',
        'eip155:137',
        'eip155:42161'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '5e481041-dc3c-4a81-373a-76bbde91b800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/5e481041-dc3c-4a81-373a-76bbde91b800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/5e481041-dc3c-4a81-373a-76bbde91b800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/5e481041-dc3c-4a81-373a-76bbde91b800'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/tokenary-ethereum-wallet/id1372886601',
        android: '',
        mac: 'https://apps.apple.com/us/app/tokenary-ethereum-wallet/id1375542355',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: 'tokenary:', universal: 'https://tokenary.io' },
      metadata: {
        shortName: 'Tokenary',
        colors: { primary: '#fff', secondary: '#fff' }
      }
    },
    '3f1bc4a8fd72b3665459ec5c99ee51b424f6beeebe46b45f4a70cf08a84cbc50': {
      id: '3f1bc4a8fd72b3665459ec5c99ee51b424f6beeebe46b45f4a70cf08a84cbc50',
      name: 'Torus',
      description: '',
      homepage: 'https://toruswallet.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '47d03b65-6be7-4004-5dba-7dadef6e6000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/47d03b65-6be7-4004-5dba-7dadef6e6000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/47d03b65-6be7-4004-5dba-7dadef6e6000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/47d03b65-6be7-4004-5dba-7dadef6e6000'
      },
      app: {
        browser: 'https://app.tor.us/',
        ios: '',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Torus', colors: { primary: '', secondary: '' } }
    },
    '7b83869f03dc3848866e0299bc630aaf3213bea95cd6cecfbe149389cf457a09': {
      id: '7b83869f03dc3848866e0299bc630aaf3213bea95cd6cecfbe149389cf457a09',
      name: 'Spatium',
      description: '',
      homepage: 'https://spatium.net/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'e85caf96-8e6c-4ac5-5bb3-c13ac7edc700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e85caf96-8e6c-4ac5-5bb3-c13ac7edc700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e85caf96-8e6c-4ac5-5bb3-c13ac7edc700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e85caf96-8e6c-4ac5-5bb3-c13ac7edc700'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/spatium/id1404844195',
        android:
          'https://play.google.com/store/apps/details?id=capital.spatium.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Spatium', colors: { primary: '', secondary: '' } }
    },
    '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150': {
      id: '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150',
      name: 'SafePal',
      description: '',
      homepage: 'https://safepal.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '7c4f63f5-3cf6-4043-3c71-139e6f245000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7c4f63f5-3cf6-4043-3c71-139e6f245000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7c4f63f5-3cf6-4043-3c71-139e6f245000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7c4f63f5-3cf6-4043-3c71-139e6f245000'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/safepal-wallet/id1548297139',
        android:
          'https://play.google.com/store/apps/details?id=io.safepal.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: {
        native: 'safepalwallet:',
        universal: 'https://link.safepal.io'
      },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'SafePal',
        colors: { primary: '#0080ff', secondary: '' }
      }
    },
    d0387325e894a1c4244820260ad7c78bb20d79eeec2fd59ffe3529223f3f84c6: {
      id: 'd0387325e894a1c4244820260ad7c78bb20d79eeec2fd59ffe3529223f3f84c6',
      name: 'Infinito',
      description: '',
      homepage: 'https://infinitowallet.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'b07624f3-fb36-45a4-200c-6cb2a930ef00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/b07624f3-fb36-45a4-200c-6cb2a930ef00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/b07624f3-fb36-45a4-200c-6cb2a930ef00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/b07624f3-fb36-45a4-200c-6cb2a930ef00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/infinito-wallet/id1315572736',
        android:
          'https://play.google.com/store/apps/details?id=io.infinito.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Infinito',
        colors: { primary: '', secondary: '' }
      }
    },
    '176b83d9268d77438e32aa44770fb37b40d6448740b6a05a97b175323356bd1b': {
      id: '176b83d9268d77438e32aa44770fb37b40d6448740b6a05a97b175323356bd1b',
      name: 'wallet.io',
      description: '',
      homepage: 'https://wallet.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '82cdf116-4355-4e07-88e4-63dc2e253500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/82cdf116-4355-4e07-88e4-63dc2e253500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/82cdf116-4355-4e07-88e4-63dc2e253500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/82cdf116-4355-4e07-88e4-63dc2e253500'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/vn/app/wallet-io/id1459857368',
        android: 'https://play.google.com/store/apps/details?id=io.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'wallet.io',
        colors: { primary: '', secondary: '' }
      }
    },
    '802a2041afdaf4c7e41a2903e98df333c8835897532699ad370f829390c6900f': {
      id: '802a2041afdaf4c7e41a2903e98df333c8835897532699ad370f829390c6900f',
      name: 'Infinity Wallet',
      description:
        'Infinity Wallet is a leading all-in-one one-stop DeFi and Web3 crypto wallet',
      homepage: 'https://infinitywallet.io/',
      chains: ['eip155:1', 'eip155:56', 'eip155:137', 'eip155:1666600000'],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: '9f259366-0bcd-4817-0af9-f78773e41900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/9f259366-0bcd-4817-0af9-f78773e41900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/9f259366-0bcd-4817-0af9-f78773e41900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/9f259366-0bcd-4817-0af9-f78773e41900'
      },
      app: {
        browser: 'https://infinitywallet.io/',
        ios: null as any,
        android: null as any,
        mac: 'https://infinitywallet.io/desktop',
        windows: 'https://infinitywallet.io/desktop',
        linux: 'https://infinitywallet.io/desktop'
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: 'infinity:', universal: 'https://infinitywallet.io/' },
      metadata: {
        shortName: 'Infinity Wallet',
        colors: { primary: '#197fe1', secondary: '#ffffff' }
      }
    },
    '8fb830a15679a8537d84c3852e026a4bdb39d0ee3b387411a91e8f6abafdc1ad': {
      id: '8fb830a15679a8537d84c3852e026a4bdb39d0ee3b387411a91e8f6abafdc1ad',
      name: 'Ownbit',
      description: '',
      homepage: 'https://ownbit.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '83b291fa-1a08-4871-3ddb-8faa8be6f200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/83b291fa-1a08-4871-3ddb-8faa8be6f200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/83b291fa-1a08-4871-3ddb-8faa8be6f200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/83b291fa-1a08-4871-3ddb-8faa8be6f200'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/es/app/ownbit-btc-eth-cold-wallet/id1321798216',
        android:
          'https://play.google.com/store/apps/details?id=com.bitbill.www',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Ownbit', colors: { primary: '', secondary: '' } }
    },
    '244a0d93a45df0d0501a9cb9cdfb4e91aa750cfd4fc88f6e97a54d8455a76f5c': {
      id: '244a0d93a45df0d0501a9cb9cdfb4e91aa750cfd4fc88f6e97a54d8455a76f5c',
      name: 'EasyPocket',
      description: '',
      homepage: 'https://easypocket.app/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a9fcf1d1-3b2c-4226-0fb9-a6c8f2647300',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a9fcf1d1-3b2c-4226-0fb9-a6c8f2647300',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a9fcf1d1-3b2c-4226-0fb9-a6c8f2647300',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a9fcf1d1-3b2c-4226-0fb9-a6c8f2647300'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/id1517338927',
        android: 'https://easypocket.app/',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: {
        native: 'easypocket:',
        universal: 'https://wallet.easypocket.app'
      },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'EasyPocket',
        colors: { primary: '#115bfb', secondary: '' }
      }
    },
    '881946407ff22a32ec0e42b2cd31ea5dab52242dc3648d777b511a0440d59efb': {
      id: '881946407ff22a32ec0e42b2cd31ea5dab52242dc3648d777b511a0440d59efb',
      name: 'Bridge Wallet',
      description: '',
      homepage: 'https://mtpelerin.com/bridge-wallet',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '989d504f-93db-4ca6-c00a-9d1faf177d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/989d504f-93db-4ca6-c00a-9d1faf177d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/989d504f-93db-4ca6-c00a-9d1faf177d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/989d504f-93db-4ca6-c00a-9d1faf177d00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/bridge-wallet/id1481859680',
        android:
          'https://play.google.com/store/apps/details?id=com.mtpelerin.bridge',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: {
        native: 'bridgewallet:',
        universal: 'https://bridge.mtpelerin.com'
      },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Bridge', colors: { primary: '', secondary: '' } }
    },
    '3b0e861b3a57e98325b82ab687fe0a712c81366d521ceec49eebc35591f1b5d1': {
      id: '3b0e861b3a57e98325b82ab687fe0a712c81366d521ceec49eebc35591f1b5d1',
      name: 'SparkPoint',
      description: '',
      homepage: 'https://sparkpoint.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '34c4f901-70de-4507-e7a0-bc7887843000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/34c4f901-70de-4507-e7a0-bc7887843000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/34c4f901-70de-4507-e7a0-bc7887843000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/34c4f901-70de-4507-e7a0-bc7887843000'
      },
      app: {
        browser: '',
        ios: '',
        android: 'https://play.google.com/store/apps/details?id=com.sparkpoint',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'sparkpoint:', universal: 'https://sparkpoint.io' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'SparkPoint',
        colors: { primary: '#14435f', secondary: '' }
      }
    },
    ca86f48760bf5f84dcd6b1daca0fd55e2aa073ecf46453ba8a1db0b2e8e85ac1: {
      id: 'ca86f48760bf5f84dcd6b1daca0fd55e2aa073ecf46453ba8a1db0b2e8e85ac1',
      name: 'ViaWallet',
      description: '',
      homepage: 'https://viawallet.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ffc3ba49-2e6b-4baa-304d-ebb253f74700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ffc3ba49-2e6b-4baa-304d-ebb253f74700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ffc3ba49-2e6b-4baa-304d-ebb253f74700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ffc3ba49-2e6b-4baa-304d-ebb253f74700'
      },
      app: {
        browser: '',
        ios: 'https://itunes.apple.com/us/app/viawallet/id1462031389',
        android:
          'https://play.google.com/store/apps/details?id=com.viabtc.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'ViaWallet',
        colors: { primary: '', secondary: '' }
      }
    },
    b642ab6de0fe5c7d1e4a2b2821c9c807a81d0f6fd42ee3a75e513ea16e91151c: {
      id: 'b642ab6de0fe5c7d1e4a2b2821c9c807a81d0f6fd42ee3a75e513ea16e91151c',
      name: 'Vision',
      description: '',
      homepage: 'https://vision-crypto.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'c279537a-920d-422c-6a65-8b3bd524c300',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/c279537a-920d-422c-6a65-8b3bd524c300',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/c279537a-920d-422c-6a65-8b3bd524c300',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/c279537a-920d-422c-6a65-8b3bd524c300'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/id1500186931',
        android:
          'https://play.google.com/store/apps/details?id=com.eletac.tronwallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Vision', colors: { primary: '', secondary: '' } }
    },
    '38ee551a01e3c5af9d8a9715768861e4d642e2381a62245083f96672b5646c6b': {
      id: '38ee551a01e3c5af9d8a9715768861e4d642e2381a62245083f96672b5646c6b',
      name: 'PEAKDEFI Wallet',
      description: '',
      homepage: 'https://peakdefi.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '744a3fbe-4261-4148-133e-49c5b58cb400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/744a3fbe-4261-4148-133e-49c5b58cb400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/744a3fbe-4261-4148-133e-49c5b58cb400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/744a3fbe-4261-4148-133e-49c5b58cb400'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/peakdefi-wallet/id1526193527',
        android:
          'https://play.google.com/store/apps/details?id=com.peakdefiwallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: {
        native: 'peakdefiwallet:',
        universal: 'https://peakdefi.com/download'
      },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'PEAKDEFI',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '7e90b95230bc462869bbb59f952273d89841e1c76bcc5319898e08c9f34bd4cd': {
      id: '7e90b95230bc462869bbb59f952273d89841e1c76bcc5319898e08c9f34bd4cd',
      name: 'Unstoppable Wallet',
      description: null as any,
      homepage: 'https://unstoppable.money/',
      chains: ['eip155:1', 'eip155:56'],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: '5c38b22c-adb9-4899-3252-6e3d71458500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/5c38b22c-adb9-4899-3252-6e3d71458500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/5c38b22c-adb9-4899-3252-6e3d71458500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/5c38b22c-adb9-4899-3252-6e3d71458500'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/app/apple-store/id1447619907',
        android:
          'https://play.google.com/store/apps/details?id=io.horizontalsystems.bankwallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'moneyunstoppable:',
        universal: 'https://unstoppable.money'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Unstoppable',
        colors: { primary: '#FFBE43', secondary: null as any }
      }
    },
    '025247d02e1972362982f04c96c78e7c02c4b68a9ac2107c26fe2ebb85c317c0': {
      id: '025247d02e1972362982f04c96c78e7c02c4b68a9ac2107c26fe2ebb85c317c0',
      name: 'HaloDeFi Wallet',
      description: '',
      homepage: 'https://halodefi.org/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'af664892-49ef-4045-642e-347a4e98ee00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/af664892-49ef-4045-642e-347a4e98ee00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/af664892-49ef-4045-642e-347a4e98ee00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/af664892-49ef-4045-642e-347a4e98ee00'
      },
      app: {
        browser: '',
        ios: '',
        android:
          'https://play.google.com/store/apps/details?id=com.halodefi.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'halodefiwallet:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'HaloDeFi',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    d12b6e114af8c47a6eec19a576f1022032a5ee4f8cafee612049f4796c803c7e: {
      id: 'd12b6e114af8c47a6eec19a576f1022032a5ee4f8cafee612049f4796c803c7e',
      name: 'Dok Wallet',
      description: '',
      homepage: 'https://dokwallet.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '6886f45d-1451-41ec-ebc7-b18bebfc3c00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/6886f45d-1451-41ec-ebc7-b18bebfc3c00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/6886f45d-1451-41ec-ebc7-b18bebfc3c00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/6886f45d-1451-41ec-ebc7-b18bebfc3c00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/il/app/dokwallet-crypto-wallet/id1533065700',
        android: 'https://play.google.com/store/apps/details?id=com.dok.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Dok', colors: { primary: '', secondary: '' } }
    },
    '3d56ed42374504f1bb2ba368094269eaea461c075ab796d504f354baac213dc5': {
      id: '3d56ed42374504f1bb2ba368094269eaea461c075ab796d504f354baac213dc5',
      name: 'AT.Wallet',
      description: '',
      homepage: 'https://authentrend.com/at-wallet/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a5b7369b-d92c-41a4-0263-ca28f4597600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a5b7369b-d92c-41a4-0263-ca28f4597600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a5b7369b-d92c-41a4-0263-ca28f4597600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a5b7369b-d92c-41a4-0263-ca28f4597600'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/at-wallet/id1479171310',
        android:
          'https://play.google.com/store/apps/details?id=com.authentrend.atwallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'AT.Wallet',
        colors: { primary: '', secondary: '' }
      }
    },
    '1e04cf5cddcd84edb1370b12eae1fcecedf125b77209fff80e7ef2a6d3c74719': {
      id: '1e04cf5cddcd84edb1370b12eae1fcecedf125b77209fff80e7ef2a6d3c74719',
      name: 'Midas Wallet',
      description: '',
      homepage: 'https://midasprotocol.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '4b7268e6-47fb-46bc-6f3c-424f44695f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/4b7268e6-47fb-46bc-6f3c-424f44695f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/4b7268e6-47fb-46bc-6f3c-424f44695f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/4b7268e6-47fb-46bc-6f3c-424f44695f00'
      },
      app: {
        browser: '',
        ios: 'https://itunes.apple.com/us/app/midas-protocol-crypto-wallet/id1436698193',
        android:
          'https://play.google.com/store/apps/details?id=com.midasprotocol.wallet.android',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Midas', colors: { primary: '', secondary: '' } }
    },
    '15d1d97de89526a3c259a235304a7c510c40cda3331f0f8433da860ecc528bef': {
      id: '15d1d97de89526a3c259a235304a7c510c40cda3331f0f8433da860ecc528bef',
      name: 'Ellipal',
      description: '',
      homepage: 'https://ellipal.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '0a805e10-bfc0-4d02-d9c1-8cec88f0dc00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/0a805e10-bfc0-4d02-d9c1-8cec88f0dc00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/0a805e10-bfc0-4d02-d9c1-8cec88f0dc00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/0a805e10-bfc0-4d02-d9c1-8cec88f0dc00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/ellipal/id1426179665',
        android:
          'https://play.google.com/store/apps/details?id=com.ellipal.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'ellipal:', universal: 'https://www.ellipal.com/' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Ellipal',
        colors: { primary: '#307cf9', secondary: '' }
      }
    },
    '19ad8334f0f034f4176a95722b5746b539b47b37ce17a5abde4755956d05d44c': {
      id: '19ad8334f0f034f4176a95722b5746b539b47b37ce17a5abde4755956d05d44c',
      name: 'Aktionariat',
      description: null as any,
      homepage: 'https://aktionariat.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '6d18e8ea-b536-4038-c5bf-94a499d5a400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/6d18e8ea-b536-4038-c5bf-94a499d5a400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/6d18e8ea-b536-4038-c5bf-94a499d5a400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/6d18e8ea-b536-4038-c5bf-94a499d5a400'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/ch/app/aktionariat/id1518326813',
        android:
          'https://play.google.com/store/apps/details?id=com.aktionariat.app',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'aktionariat:',
        universal: 'https://app.aktionariat.com'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Aktionariat',
        colors: { primary: '#000000', secondary: null as any }
      }
    },
    '95501c1a07c8eb575cb28c753ab9044259546ebcefcd3645461086e49b671f5c': {
      id: '95501c1a07c8eb575cb28c753ab9044259546ebcefcd3645461086e49b671f5c',
      name: 'Talken Wallet',
      description: '',
      homepage: 'https://talken.io',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '1afb5a3a-2da3-40ce-baf9-b416e7510600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/1afb5a3a-2da3-40ce-baf9-b416e7510600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/1afb5a3a-2da3-40ce-baf9-b416e7510600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/1afb5a3a-2da3-40ce-baf9-b416e7510600'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/talken/id1459475831',
        android:
          'https://play.google.com/store/apps/details?id=io.talken.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'talken-wallet:', universal: 'https://talken.io' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Talken',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '78640a74036794a5b7f8ea501887c168232723696db4231f54abd3fe524037b4': {
      id: '78640a74036794a5b7f8ea501887c168232723696db4231f54abd3fe524037b4',
      name: 'XinFin XDC Network',
      description: '',
      homepage: 'https://www.xinfin.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'bee71890-cdbe-4a9a-0d51-6cc75078f600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/bee71890-cdbe-4a9a-0d51-6cc75078f600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/bee71890-cdbe-4a9a-0d51-6cc75078f600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/bee71890-cdbe-4a9a-0d51-6cc75078f600'
      },
      app: {
        browser: 'https://xinfin.network/',
        ios: '',
        android: 'https://play.google.com/store/apps/details?id=com.xdcwallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'XinFin', colors: { primary: '', secondary: '' } }
    },
    d612ddb7326d7d64428d035971b82247322a4ffcf126027560502eff4c02bd1c: {
      id: 'd612ddb7326d7d64428d035971b82247322a4ffcf126027560502eff4c02bd1c',
      name: 'Flare Wallet',
      description: '',
      homepage: 'https://flarewallet.io',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'dfd3a3d8-d386-4c47-ff26-5c24845d2e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/dfd3a3d8-d386-4c47-ff26-5c24845d2e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/dfd3a3d8-d386-4c47-ff26-5c24845d2e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/dfd3a3d8-d386-4c47-ff26-5c24845d2e00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/flare-wallet/id1496651406',
        android: 'https://play.google.com/store/apps/details?id=com.flare',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'flare:', universal: 'https://flarewallet.io' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Flare',
        colors: { primary: '#1f243b', secondary: '' }
      }
    },
    '2ed796df33fdbde6a3ea6a47d3636b8341fe285038d844c7a78267b465b27028': {
      id: '2ed796df33fdbde6a3ea6a47d3636b8341fe285038d844c7a78267b465b27028',
      name: 'KyberSwap',
      description: '',
      homepage: 'https://kyberswap.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '3abd1720-260e-495a-2e31-3d0b349e0d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/3abd1720-260e-495a-2e31-3d0b349e0d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/3abd1720-260e-495a-2e31-3d0b349e0d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/3abd1720-260e-495a-2e31-3d0b349e0d00'
      },
      app: {
        browser: 'https://kyberswap.com/',
        ios: '',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: {
        native: 'kyberswap:',
        universal: 'https://kyberswapnew.app.link'
      },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'KyberSwap',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '6193353e17504afc4bb982ee743ab970cd5cf842a35ecc9b7de61c150cf291e0': {
      id: '6193353e17504afc4bb982ee743ab970cd5cf842a35ecc9b7de61c150cf291e0',
      name: 'AToken Wallet',
      description: '',
      homepage: 'https://atoken.com',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd93fb51d-f2b1-4b4e-f741-7485461bd500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d93fb51d-f2b1-4b4e-f741-7485461bd500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d93fb51d-f2b1-4b4e-f741-7485461bd500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d93fb51d-f2b1-4b4e-f741-7485461bd500'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/atoken-app/id1395835245',
        android:
          'https://play.google.com/store/apps/details?id=wallet.gem.com.atoken',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'atoken:', universal: 'https://www.atoken.com' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'AToken',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '4e6af4201658b52daad51a279bb363a08b3927e74c0f27abeca3b0110bddf0a9': {
      id: '4e6af4201658b52daad51a279bb363a08b3927e74c0f27abeca3b0110bddf0a9',
      name: 'Tongue Wallet',
      description: '',
      homepage: 'https://www.tongue.fi',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '20bc4fdb-b9e6-429a-8cba-c233b3273000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/20bc4fdb-b9e6-429a-8cba-c233b3273000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/20bc4fdb-b9e6-429a-8cba-c233b3273000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/20bc4fdb-b9e6-429a-8cba-c233b3273000'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/fr/app/tongue-wallet-for-defi-degens/id1534705854',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'tongue:', universal: 'https://www.tongue.fi' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Tongue',
        colors: { primary: '#ff3178', secondary: '' }
      }
    },
    b13fcc7e3500a4580c9a5341ed64c49c17d7f864497881048eb160c089be5346: {
      id: 'b13fcc7e3500a4580c9a5341ed64c49c17d7f864497881048eb160c089be5346',
      name: 'RWallet',
      description: '',
      homepage: 'https://rsk.co/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a883229c-26cb-4c19-9b34-1f0ed4012a00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a883229c-26cb-4c19-9b34-1f0ed4012a00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a883229c-26cb-4c19-9b34-1f0ed4012a00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a883229c-26cb-4c19-9b34-1f0ed4012a00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/rwallet/id1489241342',
        android:
          'https://play.google.com/store/apps/details?id=com.rsk.rwallet.reactnative',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'rwallet:', universal: 'https://www.rwallet.app' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'RWallet',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '13c6a06b733edf51784f669f508826b2ab0dc80122a8b5d25d84b17d94bbdf70': {
      id: '13c6a06b733edf51784f669f508826b2ab0dc80122a8b5d25d84b17d94bbdf70',
      name: 'PlasmaPay',
      description: '',
      homepage: 'https://plasmapay.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '466c8fd0-fcec-4621-b94f-e91ce1439f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/466c8fd0-fcec-4621-b94f-e91ce1439f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/466c8fd0-fcec-4621-b94f-e91ce1439f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/466c8fd0-fcec-4621-b94f-e91ce1439f00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/id1461735396',
        android:
          'https://play.google.com/store/apps/details?id=com.plasmapay.androidapp',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'plasmapay:', universal: 'https://plasmapay.com/' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'PlasmaPay',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '0aafbedfb8eb56dae59ecc37c9a5388509cf9c082635e3f752581cc7128a17c0': {
      id: '0aafbedfb8eb56dae59ecc37c9a5388509cf9c082635e3f752581cc7128a17c0',
      name: 'O3Wallet',
      description: '',
      homepage: 'https://o3.network',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'e1c7c6af-c731-463e-55f0-5e686e9f6200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e1c7c6af-c731-463e-55f0-5e686e9f6200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e1c7c6af-c731-463e-55f0-5e686e9f6200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e1c7c6af-c731-463e-55f0-5e686e9f6200'
      },
      app: {
        browser: '',
        ios: 'https://itunes.apple.com/app/id1528451572',
        android:
          'https://play.google.com/store/apps/details?id=com.o3.o3wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'o3wallet:', universal: 'https://o3.network' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'O3Wallet',
        colors: { primary: '#ffffff', secondary: '' }
      }
    },
    '761d3d98fd77bdb06e6c90092ee7071c6001e93401d05dcf2b007c1a6c9c222c': {
      id: '761d3d98fd77bdb06e6c90092ee7071c6001e93401d05dcf2b007c1a6c9c222c',
      name: 'HashKey Me',
      description: '',
      homepage: 'https://me.hashkey.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '72734fac-9500-4c2c-81ba-678f7fc32700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/72734fac-9500-4c2c-81ba-678f7fc32700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/72734fac-9500-4c2c-81ba-678f7fc32700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/72734fac-9500-4c2c-81ba-678f7fc32700'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/hashkey-me/id1547228803',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'hashme:', universal: 'https://me.hashkey.com' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'HashKey Me',
        colors: { primary: '#fe8f3f', secondary: '' }
      }
    },
    '0a00cbe128dddd6e096ebb78533a2c16ed409152a377c1f61a6a5ea643a2d950': {
      id: '0a00cbe128dddd6e096ebb78533a2c16ed409152a377c1f61a6a5ea643a2d950',
      name: 'Jade Wallet',
      description: '',
      homepage: 'https://jadewallet.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '8a6f6b6f-9e25-43d2-6cb8-42013579bd00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/8a6f6b6f-9e25-43d2-6cb8-42013579bd00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/8a6f6b6f-9e25-43d2-6cb8-42013579bd00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/8a6f6b6f-9e25-43d2-6cb8-42013579bd00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/jade-wallet-bitcoin-defi/id1544207492',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Jade',
        colors: { primary: '#212d66', secondary: '' }
      }
    },
    c04ae532094873c054a6c9339746c39c9ba5839c4d5bb2a1d9db51f9e5e77266: {
      id: 'c04ae532094873c054a6c9339746c39c9ba5839c4d5bb2a1d9db51f9e5e77266',
      name: 'Guarda Wallet',
      description: '',
      homepage: 'https://guarda.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '0142b5f2-2006-465f-fe0e-2021225d8c00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/0142b5f2-2006-465f-fe0e-2021225d8c00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/0142b5f2-2006-465f-fe0e-2021225d8c00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/0142b5f2-2006-465f-fe0e-2021225d8c00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/apple-store/id1442083982?mt=8',
        android:
          'https://play.google.com/store/apps/details?id=com.crypto.multiwallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Guarda',
        colors: { primary: '#fff', secondary: '' }
      }
    },
    ffa139f74d1c8ebbb748cf0166f92d886e8c81b521c2193aa940e00626f4e215: {
      id: 'ffa139f74d1c8ebbb748cf0166f92d886e8c81b521c2193aa940e00626f4e215',
      name: 'Defiant',
      description: '',
      homepage: 'https://defiantapp.tech/',
      chains: ['eip155:1', 'eip155:42', 'eip155:30', 'eip155:31'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '026462e7-09a3-47f6-6b46-49df18133b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/026462e7-09a3-47f6-6b46-49df18133b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/026462e7-09a3-47f6-6b46-49df18133b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/026462e7-09a3-47f6-6b46-49df18133b00'
      },
      app: {
        browser: '',
        ios: '',
        android:
          'https://play.google.com/store/apps/details?id=ar.com.andinasmart.defiant',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'defiantapp:', universal: 'https://defiantapp.tech' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Defiant',
        colors: { primary: '#274A60', secondary: '#65ef9d' }
      }
    },
    '1ce6dae0fea7114846382391d946784d95d9032460a857bb23b55bd9807259d1': {
      id: '1ce6dae0fea7114846382391d946784d95d9032460a857bb23b55bd9807259d1',
      name: 'Trustee Wallet',
      description: '',
      homepage: 'https://trusteeglobal.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '2432f3c2-83f1-486b-6081-d03acc33e000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2432f3c2-83f1-486b-6081-d03acc33e000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2432f3c2-83f1-486b-6081-d03acc33e000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2432f3c2-83f1-486b-6081-d03acc33e000'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/trustee-wallet-bitcoin-wallet/id1462924276',
        android:
          'https://play.google.com/store/apps/details?id=com.trusteewallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Trustee', colors: { primary: '', secondary: '' } }
    },
    be6607b0a4093c0443bfe9c19ab30c99c91d2638866c99a6a16a71d3c1df78f8: {
      id: 'be6607b0a4093c0443bfe9c19ab30c99c91d2638866c99a6a16a71d3c1df78f8',
      name: 'CoinUs',
      description: '',
      homepage: 'https://coinus.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '1f92f9f9-08b9-4eca-4d75-425ce3d50100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/1f92f9f9-08b9-4eca-4d75-425ce3d50100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/1f92f9f9-08b9-4eca-4d75-425ce3d50100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/1f92f9f9-08b9-4eca-4d75-425ce3d50100'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/apple-store/id1367339746',
        android:
          'https://play.google.com/store/apps/details?id=com.theblockchain.coinus.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'CoinUs', colors: { primary: '', secondary: '' } }
    },
    ca151c4caeec5f9cc02ef03e498cb38c02ee5e498a8db13e853315077a5b45dc: {
      id: 'ca151c4caeec5f9cc02ef03e498cb38c02ee5e498a8db13e853315077a5b45dc',
      name: 'cmorq',
      description: '',
      homepage: 'https://cmorq.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '4e9f4558-32a2-46c9-be37-4926a6e95100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/4e9f4558-32a2-46c9-be37-4926a6e95100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/4e9f4558-32a2-46c9-be37-4926a6e95100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/4e9f4558-32a2-46c9-be37-4926a6e95100'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/cmorq/id1530022030',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'cmorq', colors: { primary: '', secondary: '' } }
    },
    d01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974: {
      id: 'd01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974',
      name: 'Valora',
      description:
        'Valora is a mobile crypto wallet that enables global payments and easy access to decentralized apps.',
      homepage: 'https://valoraapp.com',
      chains: ['eip155:42220'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a03bfa44-ce98-4883-9b2a-75e2b68f5700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a03bfa44-ce98-4883-9b2a-75e2b68f5700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a03bfa44-ce98-4883-9b2a-75e2b68f5700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a03bfa44-ce98-4883-9b2a-75e2b68f5700'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/app/id1520414263',
        android:
          'https://play.google.com/store/apps/details?id=co.clabs.valora',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'celo://wallet', universal: 'https://valoraapp.com' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Valora',
        colors: { primary: '#42D689', secondary: '#FBCC5C' }
      }
    },
    e05615ed22df39c8d9b99ea38b45d4accb103fcef9cfa5d5edd38f5839b5182e: {
      id: 'e05615ed22df39c8d9b99ea38b45d4accb103fcef9cfa5d5edd38f5839b5182e',
      name: 'QuiverX',
      description: '',
      homepage: 'https://quiverx.io',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '67acf8ad-da61-4b7f-609b-57224fb8b100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/67acf8ad-da61-4b7f-609b-57224fb8b100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/67acf8ad-da61-4b7f-609b-57224fb8b100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/67acf8ad-da61-4b7f-609b-57224fb8b100'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/quiverx/id1558993212',
        android:
          'https://play.google.com/store/apps/details?id=com.quiverx.app',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'QuiverX', colors: { primary: '', secondary: '' } }
    },
    '36d854b702817e228d5c853c528d7bdb46f4bb041d255f67b82eb47111e5676b': {
      id: '36d854b702817e228d5c853c528d7bdb46f4bb041d255f67b82eb47111e5676b',
      name: 'Celo Wallet',
      description: '',
      homepage: 'https://celowallet.app/',
      chains: ['eip155:42220'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '482c9981-61c0-4782-84ec-c80fd997da00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/482c9981-61c0-4782-84ec-c80fd997da00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/482c9981-61c0-4782-84ec-c80fd997da00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/482c9981-61c0-4782-84ec-c80fd997da00'
      },
      app: {
        browser: 'https://celowallet.app/',
        ios: '',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'celowallet:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Celo Wallet',
        colors: { primary: '#35D07F', secondary: '#FBCC5C' }
      }
    },
    '717911f4db0c5eda0e02e76ed179b7940ba1eefffdfb3c9e6540696226860da0': {
      id: '717911f4db0c5eda0e02e76ed179b7940ba1eefffdfb3c9e6540696226860da0',
      name: 'Elastos Essentials',
      description: 'Your Web3 Crypto and W3C Identity wallet',
      homepage: 'https://elastos.org',
      chains: [
        'eip155:20',
        'eip155:21',
        'eip155:1',
        'eip155:3',
        'eip155:22',
        'eip155:23',
        'eip155:40',
        'eip155:41',
        'eip155:56',
        'eip155:97',
        'eip155:128',
        'eip155:137',
        'eip155:42161',
        'eip155:43114',
        'eip155:43113',
        'eip155:250',
        'eip155:4002',
        'eip155:32659'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '04a6bfed-d80e-4f7b-0516-261f86aa4000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/04a6bfed-d80e-4f7b-0516-261f86aa4000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/04a6bfed-d80e-4f7b-0516-261f86aa4000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/04a6bfed-d80e-4f7b-0516-261f86aa4000'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/elastos-essentials/id1568931743',
        android:
          'https://play.google.com/store/apps/details?id=org.elastos.essentials.app',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'essentials:',
        universal: 'https://essentials.elastos.net'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Essentials',
        colors: { primary: '#000000', secondary: '#ffffff' }
      }
    },
    c20b97dd1679625f4eb0bccd727c80746cb13bd97208b0c8e62c89cfd1d4b9cc: {
      id: 'c20b97dd1679625f4eb0bccd727c80746cb13bd97208b0c8e62c89cfd1d4b9cc',
      name: 'fuse.cash',
      description: '',
      homepage: 'https://fuse.cash/',
      chains: ['eip155:122'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '71828267-72d6-4680-e144-265e6dc1e400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/71828267-72d6-4680-e144-265e6dc1e400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/71828267-72d6-4680-e144-265e6dc1e400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/71828267-72d6-4680-e144-265e6dc1e400'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/fuse-cash/id1559937899',
        android: 'https://play.google.com/store/apps/details?id=io.fuse.cash',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'fuse.cash:', universal: 'https://app.fuse.cash/' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'fuse.cash',
        colors: { primary: '#37D888', secondary: '#37D888' }
      }
    },
    fbc8d86ad914ebd733fec4812b4b7af5ca709fdd9e75a930115e5baa02c4ef4c: {
      id: 'fbc8d86ad914ebd733fec4812b4b7af5ca709fdd9e75a930115e5baa02c4ef4c',
      name: 'Rabby',
      description: '',
      homepage: 'https://rabby.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '7e82c795-574b-4e0f-1be7-d0677babed00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7e82c795-574b-4e0f-1be7-d0677babed00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7e82c795-574b-4e0f-1be7-d0677babed00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7e82c795-574b-4e0f-1be7-d0677babed00'
      },
      app: {
        browser:
          'https://chrome.google.com/webstore/detail/empty-title/acmacodkjbdgmoleebolmdjonilkdbch',
        ios: '',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Rabby', colors: { primary: '', secondary: '' } }
    },
    '9d6c614d1995741d5313f1f3dbf1f66dcba694de782087d13b8721822502692f': {
      id: '9d6c614d1995741d5313f1f3dbf1f66dcba694de782087d13b8721822502692f',
      name: 'Stasis',
      description: '',
      homepage: 'https://stasis.net/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '7ae753bc-a754-450c-2d90-2c5521734400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7ae753bc-a754-450c-2d90-2c5521734400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7ae753bc-a754-450c-2d90-2c5521734400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7ae753bc-a754-450c-2d90-2c5521734400'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/stasis-wallet/id1371949230',
        android:
          'https://play.google.com/store/apps/details?id=com.stasis.stasiswallet&hl=ru&gl=US',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'stasis:', universal: 'https://app.stasis.net' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Stasis',
        colors: { primary: '#2468E4', secondary: '#FFFFFF' }
      }
    },
    a6ffb821a3c32d36fc9d29e29c2ff79a0cd1db0bca453714777846ddf3fdff76: {
      id: 'a6ffb821a3c32d36fc9d29e29c2ff79a0cd1db0bca453714777846ddf3fdff76',
      name: 'JulWallet',
      description: '',
      homepage: 'https://justliquidity.org/',
      chains: [
        'eip155:1',
        'eip155:3',
        'eip155:4',
        'eip155:5',
        'eip155:42',
        'eip155:56',
        'eip155:88',
        'eip155:128',
        'eip155:137',
        'eip155:250'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'cabd50de-22fa-487b-ce68-2c63de8bb800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/cabd50de-22fa-487b-ce68-2c63de8bb800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/cabd50de-22fa-487b-ce68-2c63de8bb800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/cabd50de-22fa-487b-ce68-2c63de8bb800'
      },
      app: {
        browser:
          'https://chrome.google.com/webstore/detail/julwallet/fgkldlaelopgncepgpncndebgdddikii?hl=en-US',
        ios: 'https://apps.apple.com/app/julwallet/id1555914591',
        android: 'https://play.google.com/store/apps/details?id=julwallet.com',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'julwallet:', universal: 'https://justliquidity.org' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'JulWallet',
        colors: { primary: '#c84ce4', secondary: '#3f00ff' }
      }
    },
    '2f010ad2b0777998e950b5d72969e3b6a7090f0dde59b509ce9a41a5d1b2f9f4': {
      id: '2f010ad2b0777998e950b5d72969e3b6a7090f0dde59b509ce9a41a5d1b2f9f4',
      name: 'f(x) Wallet',
      description: '',
      homepage: 'https://functionx.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '4d5c5c70-5abb-43ba-fc5e-577b6e403300',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/4d5c5c70-5abb-43ba-fc5e-577b6e403300',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/4d5c5c70-5abb-43ba-fc5e-577b6e403300',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/4d5c5c70-5abb-43ba-fc5e-577b6e403300'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/f-x-wallet-by-pundi-x-labs/id1504798360',
        android:
          'https://play.google.com/store/apps/details?id=com.pundix.functionx',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'f(x) Wallet',
        colors: { primary: '', secondary: '' }
      }
    },
    '96bf9b7141215037f4a9f567ce536b1eb2836fb71cc67c07ba73f3c3eadc53d6': {
      id: '96bf9b7141215037f4a9f567ce536b1eb2836fb71cc67c07ba73f3c3eadc53d6',
      name: 'Bull App',
      description: '',
      homepage: 'https://getbull.app/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'b3c42bfd-5078-4616-a2ad-e4e322bbf600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/b3c42bfd-5078-4616-a2ad-e4e322bbf600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/b3c42bfd-5078-4616-a2ad-e4e322bbf600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/b3c42bfd-5078-4616-a2ad-e4e322bbf600'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/id1558608737',
        android:
          'https://play.google.com/store/apps/details?id=crypto.wallet.chainapp',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Bull App',
        colors: { primary: '', secondary: '' }
      }
    },
    fc65284c7e407387d732fbfe5d57ed378a89db28c3559ada079f9097d43d2575: {
      id: 'fc65284c7e407387d732fbfe5d57ed378a89db28c3559ada079f9097d43d2575',
      name: 'Anybit',
      description: '',
      homepage: 'https://anybit.io',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '6aac5fb1-d400-4e81-4709-bef8b2c00900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/6aac5fb1-d400-4e81-4709-bef8b2c00900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/6aac5fb1-d400-4e81-4709-bef8b2c00900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/6aac5fb1-d400-4e81-4709-bef8b2c00900'
      },
      app: {
        browser: '',
        ios: 'https://www.anybit.io/#/download_ios',
        android:
          'https://anybit-1254113200.cos.ap-shanghai.myqcloud.com/release/anybit-3.0.2.apk',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Anybit', colors: { primary: '', secondary: '' } }
    },
    '356fc3d6e801a76197a8b6f9bcac8ebe4f9e8ab8337012d4e453233983ff197a': {
      id: '356fc3d6e801a76197a8b6f9bcac8ebe4f9e8ab8337012d4e453233983ff197a',
      name: 'Bitpie',
      description: 'Bitpie Wallet',
      homepage: 'https://bitpie.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'f9b7c668-ed26-47f7-d8c9-7eadc7114800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f9b7c668-ed26-47f7-d8c9-7eadc7114800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f9b7c668-ed26-47f7-d8c9-7eadc7114800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f9b7c668-ed26-47f7-d8c9-7eadc7114800'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/bitpie-wallet/id1481314229',
        android: 'https://play.google.com/store/apps/details?id=com.bitpie',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'bitpie:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Bitpie',
        colors: { primary: '#ffffff', secondary: '#1a24ff' }
      }
    },
    ee97613ab75c89c3ddc6337952ff8b581ebf2466fc68e9bb601dca655dcef849: {
      id: 'ee97613ab75c89c3ddc6337952ff8b581ebf2466fc68e9bb601dca655dcef849',
      name: 'Bitpie',
      description: 'Bitpie Wallet',
      homepage: 'https://bitpiehk.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'f9b7c668-ed26-47f7-d8c9-7eadc7114800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f9b7c668-ed26-47f7-d8c9-7eadc7114800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f9b7c668-ed26-47f7-d8c9-7eadc7114800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f9b7c668-ed26-47f7-d8c9-7eadc7114800'
      },
      app: {
        browser: '',
        ios: 'https://bitpiehk.com/ios',
        android: 'https://bitpiehk.com/android',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Bitpie', colors: { primary: '', secondary: '' } }
    },
    dea4ab675289353a508956c4f821bc4e9141d9f99a5d244ae7af92b4d575db6d: {
      id: 'dea4ab675289353a508956c4f821bc4e9141d9f99a5d244ae7af92b4d575db6d',
      name: 'Minerva Wallet',
      description:
        'Minerva Wallet is a user friendly app for sovereign identities, data and money.',
      homepage: 'https://minerva.digital/',
      chains: [
        'eip155:1',
        'eip155:3',
        'eip155:4',
        'eip155:5',
        'eip155:22',
        'eip155:42',
        'eip155:56',
        'eip155:77',
        'eip155:97',
        'eip155:99',
        'eip155:100',
        'eip155:137',
        'eip155:80001',
        'eip155:246529',
        'eip155:246785'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '7d5f3710-7c2c-49fc-7893-bacd3f384000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7d5f3710-7c2c-49fc-7893-bacd3f384000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7d5f3710-7c2c-49fc-7893-bacd3f384000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7d5f3710-7c2c-49fc-7893-bacd3f384000'
      },
      app: {
        browser: '',
        ios: '',
        android:
          'https://play.google.com/store/apps/details?id=digital.minerva',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Minerva',
        colors: { primary: '#443ad2', secondary: '#FFF' }
      }
    },
    '3cdf74643ac60e3f1d5807cb3dfa9d843793a4d1f3a233066fd35b61e72d42b9': {
      id: '3cdf74643ac60e3f1d5807cb3dfa9d843793a4d1f3a233066fd35b61e72d42b9',
      name: 'ArchiPage',
      description: 'ArchiPage Wallet',
      homepage: 'https://criptoarchi.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'b62c4f22-e781-4ca9-5c01-ef7cd9d23400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/b62c4f22-e781-4ca9-5c01-ef7cd9d23400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/b62c4f22-e781-4ca9-5c01-ef7cd9d23400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/b62c4f22-e781-4ca9-5c01-ef7cd9d23400'
      },
      app: {
        browser: '',
        ios: '',
        android: 'https://play.google.com/store/apps/details?id=com.archipage',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'archipage:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'ArchiPage',
        colors: { primary: '#000', secondary: '#FFF' }
      }
    },
    '76745388a50e6fea982c4dee2a3ad61a8aa417668be870754689caa8a7506c93': {
      id: '76745388a50e6fea982c4dee2a3ad61a8aa417668be870754689caa8a7506c93',
      name: 'Tangem',
      description: '',
      homepage: 'https://tangem.com',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '8a5b6e94-e378-458d-bf2e-017cc7958e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/8a5b6e94-e378-458d-bf2e-017cc7958e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/8a5b6e94-e378-458d-bf2e-017cc7958e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/8a5b6e94-e378-458d-bf2e-017cc7958e00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/uz/app/tangem/id1354868448',
        android:
          'https://play.google.com/store/apps/details?id=com.tangem.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'tangem:', universal: 'https://app.tangem.com' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Tangem',
        colors: { primary: '#FFF', secondary: '#000' }
      }
    },
    '67d728ec0a4d650a7a5b28390df634b86f775efc5075123aab537fc7fc53f045': {
      id: '67d728ec0a4d650a7a5b28390df634b86f775efc5075123aab537fc7fc53f045',
      name: 'Chainge Finance',
      description: '',
      homepage: 'https://chainge.finance',
      chains: [
        'eip155:1',
        'eip155:56',
        'eip155:66',
        'eip155:128',
        'eip155:137',
        'eip155:250',
        'eip155:32659'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'addaaf64-cf13-46ef-a022-d97189156f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/addaaf64-cf13-46ef-a022-d97189156f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/addaaf64-cf13-46ef-a022-d97189156f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/addaaf64-cf13-46ef-a022-d97189156f00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/cn/app/id1578987516',
        android:
          'https://play.google.com/store/apps/details?id=com.fusion.chainge.android',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Chainge',
        colors: { primary: '#000', secondary: '#FFF' }
      }
    },
    '9d93c497dc5c835abd1ddd3c5d388eaf54b995b49573340d9580b366259b7972': {
      id: '9d93c497dc5c835abd1ddd3c5d388eaf54b995b49573340d9580b366259b7972',
      name: 'ioPay',
      description: '',
      homepage: 'https://iotex.io/',
      chains: ['eip155:4689', 'eip155:4690'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'aa40d575-f7f4-4aa6-12c4-c8f055ad0800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/aa40d575-f7f4-4aa6-12c4-c8f055ad0800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/aa40d575-f7f4-4aa6-12c4-c8f055ad0800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/aa40d575-f7f4-4aa6-12c4-c8f055ad0800'
      },
      app: {
        browser: 'https://iopay-wallet.iotex.io/',
        ios: 'https://apps.apple.com/app/apple-store/id1478086371',
        android:
          'https://play.google.com/store/apps/details?id=io.iotex.iopay.gp',
        mac: 'https://github.com/iotexproject/iotex-explorer/releases',
        windows: 'https://github.com/iotexproject/iotex-explorer/releases',
        linux: 'https://github.com/iotexproject/iotex-explorer/releases'
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'ioPay',
        colors: { primary: '#000', secondary: '#FFF' }
      }
    },
    '0105fbfd71efd3b19dde8060d6c9d959f555c078515a47b1a29cc9b67e6a4531': {
      id: '0105fbfd71efd3b19dde8060d6c9d959f555c078515a47b1a29cc9b67e6a4531',
      name: 'Coinhub',
      description: '',
      homepage: 'https://coinhub.org/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'cd7d6974-739b-46d7-bd10-604222e16e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/cd7d6974-739b-46d7-bd10-604222e16e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/cd7d6974-739b-46d7-bd10-604222e16e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/cd7d6974-739b-46d7-bd10-604222e16e00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/tn/app/coinhub/id1567786851',
        android: 'https://static.coinhub.org/package/Coinhub_v1.2.0.apk',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Coinhub',
        colors: { primary: '#000', secondary: '#FFF' }
      }
    },
    b397a6d7fc2eb4895579d0fa043d66bbb0396e40237876d6d9f294f41cf755ac: {
      id: 'b397a6d7fc2eb4895579d0fa043d66bbb0396e40237876d6d9f294f41cf755ac',
      name: 'Go Pocket',
      description: '',
      homepage: 'https://gopocket.finance/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '2494a686-3e07-4e9b-15ef-3605dca32a00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2494a686-3e07-4e9b-15ef-3605dca32a00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2494a686-3e07-4e9b-15ef-3605dca32a00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2494a686-3e07-4e9b-15ef-3605dca32a00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/go-pocket/id1576488287?l=en',
        android: 'https://play.google.com/store/apps/details?id=io.gopocket',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Go Pocket',
        colors: { primary: '', secondary: '' }
      }
    },
    addb6cfece8fe6d2e7039baf5b2ba3249da48957b08bcc877a2e32eaffa6e7aa: {
      id: 'addb6cfece8fe6d2e7039baf5b2ba3249da48957b08bcc877a2e32eaffa6e7aa',
      name: 'Wallet 3',
      description: '',
      homepage: 'https://wallet3.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd740b48c-2b55-4a27-b5f5-d2188200ca00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d740b48c-2b55-4a27-b5f5-d2188200ca00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d740b48c-2b55-4a27-b5f5-d2188200ca00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d740b48c-2b55-4a27-b5f5-d2188200ca00'
      },
      app: {
        browser: '',
        ios: '',
        android: '',
        mac: 'https://wallet3.io/',
        windows: 'https://wallet3.io/',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: 'wallet3:', universal: '' },
      metadata: {
        shortName: 'Wallet 3',
        colors: { primary: '#6186ff', secondary: '#FFF' }
      }
    },
    '1bc1d561a2a38a2ff0c4dfb21c2236f7335084f822cd5de016bd4725fed389df': {
      id: '1bc1d561a2a38a2ff0c4dfb21c2236f7335084f822cd5de016bd4725fed389df',
      name: 'yiToken',
      description: '',
      homepage: 'https://yitoken.im',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'b5cc13d4-2a58-4142-08dd-5596ab253800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/b5cc13d4-2a58-4142-08dd-5596ab253800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/b5cc13d4-2a58-4142-08dd-5596ab253800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/b5cc13d4-2a58-4142-08dd-5596ab253800'
      },
      app: {
        browser: '',
        ios: 'https://testflight.apple.com/join/vwyDi2pn',
        android: 'https://app.iwishbest.com/apps/yiToken.apk',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'yitoken:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'yiToken',
        colors: { primary: '#2c4cfc', secondary: '#FFF' }
      }
    },
    '416a17a68726c10896a46e9ecbb25eaa0e342611b2387d4787902bf1984b68e9': {
      id: '416a17a68726c10896a46e9ecbb25eaa0e342611b2387d4787902bf1984b68e9',
      name: 'DID Wallet',
      description: '',
      homepage: 'https://abtwallet.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '673b7f3b-a555-4327-f9b7-fefa535bc500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/673b7f3b-a555-4327-f9b7-fefa535bc500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/673b7f3b-a555-4327-f9b7-fefa535bc500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/673b7f3b-a555-4327-f9b7-fefa535bc500'
      },
      app: {
        browser: '',
        ios: 'https://itunes.apple.com/app/id1460083542',
        android:
          'https://play.google.com/store/apps/details?id=com.arcblock.wallet.app.product',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'abt:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'DID',
        colors: { primary: '#4598FA', secondary: '#53A8F4' }
      }
    },
    c1abb33fa718be77d96c56a3f9720400e9c5de2f79ef50ad6a2c19b1c28659f3: {
      id: 'c1abb33fa718be77d96c56a3f9720400e9c5de2f79ef50ad6a2c19b1c28659f3',
      name: 'StarBase',
      description: '',
      homepage: 'https://deploystarship.com',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '2bd78dfd-37d9-4334-8afb-17544b85f200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2bd78dfd-37d9-4334-8afb-17544b85f200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2bd78dfd-37d9-4334-8afb-17544b85f200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2bd78dfd-37d9-4334-8afb-17544b85f200'
      },
      app: {
        browser: '',
        ios: '',
        android:
          'https://play.google.com/store/apps/details?id=com.starbase.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'StarBase',
        colors: { primary: '', secondary: '' }
      }
    },
    '29449bf9d53ae02dd64a6719915c65882d7d634cca2d2de19586c772e6cbe759': {
      id: '29449bf9d53ae02dd64a6719915c65882d7d634cca2d2de19586c772e6cbe759',
      name: 'Shinobi Wallet',
      description: '',
      homepage: 'https://shinobi-wallet.net/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'f5cf868c-5347-4d5e-e80f-c6ece8fcb600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f5cf868c-5347-4d5e-e80f-c6ece8fcb600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f5cf868c-5347-4d5e-e80f-c6ece8fcb600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f5cf868c-5347-4d5e-e80f-c6ece8fcb600'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/fgraph/id1572609905',
        android:
          'https://play.google.com/store/apps/details?id=io.fgraph.shinobiwallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Shinobi Wallet',
        colors: { primary: '', secondary: '' }
      }
    },
    '403308a7b7d5da26558cb3658d963d9a87648940a38cc04143f223815d631aa5': {
      id: '403308a7b7d5da26558cb3658d963d9a87648940a38cc04143f223815d631aa5',
      name: 'GD Wallet',
      description: '',
      homepage: 'https://open.seaio.cc/',
      chains: ['eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '5363dc86-3de9-4197-c6ed-e8167b673a00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/5363dc86-3de9-4197-c6ed-e8167b673a00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/5363dc86-3de9-4197-c6ed-e8167b673a00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/5363dc86-3de9-4197-c6ed-e8167b673a00'
      },
      app: {
        browser: '',
        ios: 'https://dapp-h5.seaio.cc/newsDetail/#/downLoad?lang=ZH',
        android: 'https://dapp-h5.seaio.cc/newsDetail/#/downLoad?lang=ZH',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'GDWalletWC:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'GD Wallet',
        colors: { primary: '#000', secondary: '#FFF' }
      }
    },
    '2235b648bdf382bc1a6960f1db8eda5c71f65a1996e6cb549d24783ca58a2903': {
      id: '2235b648bdf382bc1a6960f1db8eda5c71f65a1996e6cb549d24783ca58a2903',
      name: 'Binana',
      description: '',
      homepage: 'https://binana.vip/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '65a60845-8fe3-4146-2688-586e4dc68a00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/65a60845-8fe3-4146-2688-586e4dc68a00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/65a60845-8fe3-4146-2688-586e4dc68a00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/65a60845-8fe3-4146-2688-586e4dc68a00'
      },
      app: {
        browser: '',
        ios: 'https://binana.vip/',
        android: 'https://binana.vip/',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: 'https://master.tokenone.app' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Binana',
        colors: { primary: '#000', secondary: '#FFF' }
      }
    },
    a0718f5fb1493e4aaac72cff62d162cb85db40ed68fd8700298f36f1d5c4b73d: {
      id: 'a0718f5fb1493e4aaac72cff62d162cb85db40ed68fd8700298f36f1d5c4b73d',
      name: 'AirGap',
      description: '',
      homepage: 'https://airgap.it',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'cc530d2d-4d01-4f9f-cf38-14deb71fd600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/cc530d2d-4d01-4f9f-cf38-14deb71fd600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/cc530d2d-4d01-4f9f-cf38-14deb71fd600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/cc530d2d-4d01-4f9f-cf38-14deb71fd600'
      },
      app: {
        browser: 'https://wallet.airgap.it',
        ios: 'https://itunes.apple.com/us/app/airgap-wallet/id1420996542?l=de&ls=1&mt=8',
        android:
          'https://play.google.com/store/apps/details?id=it.airgap.wallet',
        mac: 'https://github.com/airgap-it/airgap-wallet/releases',
        windows: 'https://github.com/airgap-it/airgap-wallet/releases',
        linux: 'https://github.com/airgap-it/airgap-wallet/releases'
      },
      mobile: { native: 'airgap-wallet:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'AirGap',
        colors: { primary: '#50249f', secondary: '#00e8d0' }
      }
    },
    '76428179ce9213ab6f8f49923310efcf5eea089764196c7a2018bea8afcd6603': {
      id: '76428179ce9213ab6f8f49923310efcf5eea089764196c7a2018bea8afcd6603',
      name: 'PayTube',
      description: '',
      homepage: 'https://paytube.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '58230f60-6c7b-400c-ab96-cb1fd0391700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/58230f60-6c7b-400c-ab96-cb1fd0391700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/58230f60-6c7b-400c-ab96-cb1fd0391700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/58230f60-6c7b-400c-ab96-cb1fd0391700'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/paytube/id1574456998',
        android:
          'https://play.google.com/store/apps/details?id=com.paytube.wallet.zkwallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'PayTube', colors: { primary: '', secondary: '' } }
    },
    '6464873279d46030c0b6b005b33da6be5ed57a752be3ef1f857dc10eaf8028aa': {
      id: '6464873279d46030c0b6b005b33da6be5ed57a752be3ef1f857dc10eaf8028aa',
      name: 'SecuX',
      description: 'SecuX Hardware Wallet',
      homepage: 'https://secuxtech.com/',
      chains: ['eip155:1', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '6013a9a1-4a67-45bb-fc24-27c11eb13900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/6013a9a1-4a67-45bb-fc24-27c11eb13900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/6013a9a1-4a67-45bb-fc24-27c11eb13900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/6013a9a1-4a67-45bb-fc24-27c11eb13900'
      },
      app: {
        browser: 'https://wallet.secuxtech.com/secuxess/#/',
        ios: 'https://apps.apple.com/tw/app/secux-mobile/id1477437607',
        android:
          'https://play.google.com/store/apps/details?id=com.secux.mobile&hl=zh_TW&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'secux://', universal: 'https://wsweb.secuxtech.com' },
      desktop: { native: 'secux://', universal: 'https://wsweb.secuxtech.com' },
      metadata: {
        shortName: 'SecuX',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '42049d5de7c9e88664bb4e13db614decb08a4ba4f0e6eefd5617f25d3cb2983b': {
      id: '42049d5de7c9e88664bb4e13db614decb08a4ba4f0e6eefd5617f25d3cb2983b',
      name: 'BlockBank',
      description: '',
      homepage: 'https://blockbank.ai',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '5b2cc39f-bc4f-4ac1-b6d7-08bcc9066a00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/5b2cc39f-bc4f-4ac1-b6d7-08bcc9066a00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/5b2cc39f-bc4f-4ac1-b6d7-08bcc9066a00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/5b2cc39f-bc4f-4ac1-b6d7-08bcc9066a00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/blockbank/id1460965460',
        android:
          'https://play.google.com/store/apps/details?id=com.aibb.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'BBank',
        colors: { primary: '#f26422', secondary: '#FFF' }
      }
    },
    d864d048f82084fac88d386c32b3261513ed7b5d1d4b52f96f91022059e984f9: {
      id: 'd864d048f82084fac88d386c32b3261513ed7b5d1d4b52f96f91022059e984f9',
      name: 'Orange',
      description: '',
      homepage: 'https://orangewallet.app/',
      chains: ['eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '7fcbf9f0-0c0b-439d-3fdb-31b32c28df00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7fcbf9f0-0c0b-439d-3fdb-31b32c28df00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7fcbf9f0-0c0b-439d-3fdb-31b32c28df00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7fcbf9f0-0c0b-439d-3fdb-31b32c28df00'
      },
      app: {
        browser: '',
        ios: '',
        android:
          'https://play.google.com/store/apps/details?id=org.orange.wallet',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: {
        native: 'orangewallet:',
        universal: 'https://link.orangewallet.app'
      },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Orange',
        colors: { primary: '#EB5B56', secondary: '#FFF' }
      }
    },
    '28ec413631bf709cc6aeb3d4e3fdd7be541d38ba852ac491840e2501eaa7cb4b': {
      id: '28ec413631bf709cc6aeb3d4e3fdd7be541d38ba852ac491840e2501eaa7cb4b',
      name: 'NEFTiPEDiA',
      description: '',
      homepage: 'https://neftipedia.com/',
      chains: ['eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '3f503c40-d5f0-4430-b996-3126a9968c00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/3f503c40-d5f0-4430-b996-3126a9968c00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/3f503c40-d5f0-4430-b996-3126a9968c00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/3f503c40-d5f0-4430-b996-3126a9968c00'
      },
      app: {
        browser: '',
        ios: '',
        android:
          'https://play.google.com/store/apps/details?id=com.NEFTiPEDiA.mp',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'NEFTiPEDiA',
        colors: { primary: '', secondary: '' }
      }
    },
    '2969649937a2a6c587e1391446d60e2e06b9c5196162a6aa70a0002292aa8d22': {
      id: '2969649937a2a6c587e1391446d60e2e06b9c5196162a6aa70a0002292aa8d22',
      name: 'Avacus',
      description: '',
      homepage: 'https://avacus.cc/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'e90bf788-03e3-48eb-e892-adfae0a61500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e90bf788-03e3-48eb-e892-adfae0a61500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e90bf788-03e3-48eb-e892-adfae0a61500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e90bf788-03e3-48eb-e892-adfae0a61500'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/id1339638445',
        android:
          'https://play.google.com/store/apps/details?id=com.floortracks.avacus',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'avacus:', universal: 'https://avacus.app.link' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Avacus',
        colors: { primary: '#f7a026', secondary: '#fff' }
      }
    },
    '58cb8992bd89d9b90bf1e6208a9f6d3f4b2959fe81b4566bc5c4621f99db2499': {
      id: '58cb8992bd89d9b90bf1e6208a9f6d3f4b2959fe81b4566bc5c4621f99db2499',
      name: 'Krystal',
      description:
        'Krystal is a secure and simple way to access the best DeFi services on a single platform',
      homepage: 'https://krystal.app/',
      chains: ['eip155:1', 'eip155:56', 'eip155:137', 'eip155:43114'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '91449cb2-57b0-4bb6-481b-47d489f7a800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/91449cb2-57b0-4bb6-481b-47d489f7a800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/91449cb2-57b0-4bb6-481b-47d489f7a800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/91449cb2-57b0-4bb6-481b-47d489f7a800'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/vn/app/krystal-one-platform-all-defi/id1558105691',
        android:
          'https://play.google.com/store/apps/details?id=com.kyrd.krystal',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'krystalWallet:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Krystal',
        colors: { primary: '#1de9b6', secondary: '#000' }
      }
    },
    dd8ee41915d967e547c80266e883d77ee808427405f4e8026a85ac1308104221: {
      id: 'dd8ee41915d967e547c80266e883d77ee808427405f4e8026a85ac1308104221',
      name: 'Linen',
      description: '',
      homepage: 'https://linen.app/',
      chains: ['eip155:1', 'eip155:42', 'eip155:137', 'eip155:80001'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '91458f54-aabe-44cf-4788-159ccc733600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/91458f54-aabe-44cf-4788-159ccc733600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/91458f54-aabe-44cf-4788-159ccc733600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/91458f54-aabe-44cf-4788-159ccc733600'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/linen-app-investing-in-defi/id1480509067',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: 'https://linen.app/' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Linen',
        colors: { primary: '#009fbe', secondary: '#fff' }
      }
    },
    '2c81da3add65899baeac53758a07e652eea46dbb5195b8074772c62a77bbf568': {
      id: '2c81da3add65899baeac53758a07e652eea46dbb5195b8074772c62a77bbf568',
      name: 'Ambire Wallet',
      description:
        'Ambire Wallet is a full featured non-custodial open-source wallet focused on DeFi and ease of use.',
      homepage: 'https://ambire.com',
      chains: ['eip155:1', 'eip155:56', 'eip155:137', 'eip155:43114'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'c39b3a16-1a38-4588-f089-cb7aeb584700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/c39b3a16-1a38-4588-f089-cb7aeb584700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/c39b3a16-1a38-4588-f089-cb7aeb584700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/c39b3a16-1a38-4588-f089-cb7aeb584700'
      },
      app: {
        browser: 'https://wallet.walletconnect.com',
        ios: null as any,
        android: null as any,
        mac: null as any,
        windows: '',
        linux: null as any
      },
      mobile: { native: 'ambire:', universal: 'https://mobile.ambire.com' },
      desktop: { native: null as any, universal: 'https://wallet.ambire.com' },
      metadata: {
        shortName: 'Ambire',
        colors: { primary: '#aa6aff', secondary: '#80ffdb' }
      }
    },
    feb6ff1fb426db18110f5a80c7adbde846d0a7e96b2bc53af4b73aaf32552bea: {
      id: 'feb6ff1fb426db18110f5a80c7adbde846d0a7e96b2bc53af4b73aaf32552bea',
      name: 'Cosmostation',
      description: 'Wallet For Cosmos Ecosystem',
      homepage: 'https://www.cosmostation.io/',
      chains: [
        'cosmos:cosmoshub-4',
        'cosmos:irishub-1',
        'cosmos:kava-4',
        'eip155:66'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ea26c3c8-adb6-4dc4-ee02-35d6eee02800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ea26c3c8-adb6-4dc4-ee02-35d6eee02800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ea26c3c8-adb6-4dc4-ee02-35d6eee02800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ea26c3c8-adb6-4dc4-ee02-35d6eee02800'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/kr/app/cosmostation/id1459830339',
        android:
          'https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Cosmostation',
        colors: { primary: '#9c6cff', secondary: '#372758' }
      }
    },
    '4d0cf1b635a59175b4ad6d6522b0b748ee920b1f8c32030fa704c00926efdf3e': {
      id: '4d0cf1b635a59175b4ad6d6522b0b748ee920b1f8c32030fa704c00926efdf3e',
      name: 'Paper Wallet',
      description:
        'Paper Wallet is a beginner friendly wallet built for NFT collectors.',
      homepage: 'https://paper.xyz',
      chains: [
        'eip155:80001',
        'eip155:4',
        'eip155:1',
        'eip155:137',
        'eip155:5'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '37d7a10f-d94d-4a56-c30e-267e8afbd500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/37d7a10f-d94d-4a56-c30e-267e8afbd500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/37d7a10f-d94d-4a56-c30e-267e8afbd500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/37d7a10f-d94d-4a56-c30e-267e8afbd500'
      },
      app: {
        browser: 'https://paper.xyz',
        ios: null as any,
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: 'https://paper.xyz' },
      desktop: { native: '', universal: 'https://paper.xyz' },
      metadata: {
        shortName: 'Paper',
        colors: { primary: '#32CAFF', secondary: '#189ED0' }
      }
    },
    '24fa79ebaafca330af474d828d3d1d4b20b4d7f93f7d2fd4986ddafee5e51b14': {
      id: '24fa79ebaafca330af474d828d3d1d4b20b4d7f93f7d2fd4986ddafee5e51b14',
      name: 'Xcapit',
      description:
        'The first smart wallet, easy and simple to use for decentralized finance, without government restrictions.',
      homepage: 'https://xcapit.com/',
      chains: ['eip155:1', 'eip155:30', 'eip155:56', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '17f59b75-21b0-4b3f-b024-fe4b9b8d2300',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/17f59b75-21b0-4b3f-b024-fe4b9b8d2300',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/17f59b75-21b0-4b3f-b024-fe4b9b8d2300',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/17f59b75-21b0-4b3f-b024-fe4b9b8d2300'
      },
      app: {
        browser: 'https://app.xcapit.com/',
        ios: 'https://apps.apple.com/ar/app/xcapit/id1545648148',
        android: 'https://play.google.com/store/apps/details?id=com.xcapit.app',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: { shortName: 'Xcapit', colors: { primary: '', secondary: '' } }
    },
    ce0ea4417b28e4b219283a99dc34cd27afe01e88d4a0cfa41b90c73088949ace: {
      id: 'ce0ea4417b28e4b219283a99dc34cd27afe01e88d4a0cfa41b90c73088949ace',
      name: 'THORWallet',
      description: 'Mobile cross-chain DEX',
      homepage: 'https://thorwallet.org',
      chains: [
        'eip155:137',
        'eip155:1',
        'eip155:43114',
        'eip155:1284',
        'eip155:3',
        'eip155:42161'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '19a02756-462c-4e8a-2d32-af0f9bcf3d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/19a02756-462c-4e8a-2d32-af0f9bcf3d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/19a02756-462c-4e8a-2d32-af0f9bcf3d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/19a02756-462c-4e8a-2d32-af0f9bcf3d00'
      },
      app: {
        browser: 'https://thorwallet.org',
        ios: 'https://apps.apple.com/ch/app/thorwallet-defi-wallet/id1592064324?l=en',
        android:
          'https://play.google.com/store/apps/details?id=defisuisse.thorwallet&hl=de_CH&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'thorwallet:', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'THORWallet',
        colors: { primary: '#000000', secondary: '#00CCFF' }
      }
    },
    '7e94e75c90964a69ea375b92214f50c4223dfbfa4913a3733b615444b322f687': {
      id: '7e94e75c90964a69ea375b92214f50c4223dfbfa4913a3733b615444b322f687',
      name: 'CoinStats',
      description: 'Manage Your Crypto and DeFi Portfolio From One Place',
      homepage: 'https://coinstats.app/',
      chains: ['eip155:137', 'eip155:56', 'eip155:1'],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: 'f989ab84-650b-4ad5-c342-77f3334f1b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f989ab84-650b-4ad5-c342-77f3334f1b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f989ab84-650b-4ad5-c342-77f3334f1b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f989ab84-650b-4ad5-c342-77f3334f1b00'
      },
      app: {
        browser: 'https://coinstats.app/',
        ios: 'https://apps.apple.com/us/app/coin-stats-crypto-portfolio/id1247849330',
        android:
          'https://play.google.com/store/apps/details?id=com.coinstats.crypto.portfolio',
        mac: 'https://apps.apple.com/us/app/coin-stats-crypto-tracker/id1498417304?mt=12',
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'coinstats:', universal: 'https://coinstats.app' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'CoinStats',
        colors: { primary: '#000000', secondary: '#FF9332' }
      }
    },
    c8c8f44329b9b826ded9a2ac330745f584a61aed6b1d0ed2a093b64bca7fc3bb: {
      id: 'c8c8f44329b9b826ded9a2ac330745f584a61aed6b1d0ed2a093b64bca7fc3bb',
      name: 'Abra Wallet',
      description: 'Abra DeFi Wallet',
      homepage: 'https://abra.com',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '2219db01-e0c9-471c-5def-fd3b4e7a7a00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2219db01-e0c9-471c-5def-fd3b4e7a7a00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2219db01-e0c9-471c-5def-fd3b4e7a7a00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2219db01-e0c9-471c-5def-fd3b4e7a7a00'
      },
      app: {
        browser: 'https://abra.com',
        ios: 'https://abra.com',
        android: 'https://abra.com',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'abra:', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Abra ',
        colors: { primary: '#4A148C', secondary: '#ffffff' }
      }
    },
    c87c562ce7f3a3ff9f4eed5f5a0edbcbd812db5aed4d14c7e6c044d8b6795d84: {
      id: 'c87c562ce7f3a3ff9f4eed5f5a0edbcbd812db5aed4d14c7e6c044d8b6795d84',
      name: 'Opera Crypto Browser',
      description: 'Ethereum Wallet',
      homepage: 'http://opera.com',
      chains: [
        'eip155:1',
        'eip155:3',
        'eip155:4',
        'eip155:42',
        'eip155:137',
        'eip155:56'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '877fa1a4-304d-4d45-ca8e-f76d1a556f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/877fa1a4-304d-4d45-ca8e-f76d1a556f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/877fa1a4-304d-4d45-ca8e-f76d1a556f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/877fa1a4-304d-4d45-ca8e-f76d1a556f00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/itunes-u/id1604311726?action=write-review',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'cryptobrowser://', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Crypto Browser',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '612be720948b5a07bfde600ba907c6b91591ac87390a97c77fa960dacb07f03f': {
      id: '612be720948b5a07bfde600ba907c6b91591ac87390a97c77fa960dacb07f03f',
      name: 'DopamineApp',
      description: 'All-in-one crypto mobile app',
      homepage: 'https://dopamineapp.com/',
      chains: [
        'eip155:1',
        'eip155:56',
        'eip155:122',
        'eip155:32659',
        'eip155:43114',
        'eip155:250',
        'eip155:137',
        'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ'
      ],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: '7ed8ec36-fb7c-4b43-494b-36e907101f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7ed8ec36-fb7c-4b43-494b-36e907101f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7ed8ec36-fb7c-4b43-494b-36e907101f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7ed8ec36-fb7c-4b43-494b-36e907101f00'
      },
      app: {
        browser: 'https://dopamineapp.com/',
        ios: 'https://apps.apple.com/us/app/dopamine-bitcoin-crypto/id1350234503',
        android:
          'https://play.google.com/store/apps/details?id=com.kyriakosalexandrou.coinmarketcap',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: null as any,
        universal: 'https://share.dopamineapp.com'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Dope',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    ca1d3f91b9233ff1f3a64fbaf2bd4a718e9ea0489ec71938d9da030a9f98ef8f: {
      id: 'ca1d3f91b9233ff1f3a64fbaf2bd4a718e9ea0489ec71938d9da030a9f98ef8f',
      name: 'ParaSwap Wallet',
      description:
        'ParaSwap Wallet is a multichain DeFi wallet for trading at the best rates, with the highest efficiency and security in a friendly interface',
      homepage: 'https://paraswap.io',
      chains: [
        'eip155:1',
        'eip155:137',
        'eip155:56',
        'eip155:250',
        'eip155:43114',
        'eip155:42161',
        'eip155:10'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '73dc6b30-b644-46e6-020c-5926851df600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/73dc6b30-b644-46e6-020c-5926851df600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/73dc6b30-b644-46e6-020c-5926851df600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/73dc6b30-b644-46e6-020c-5926851df600'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/paraswap-multichain-wallet/id1584610690',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: 'https://app.paraswap.io/#/' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'ParaSwap',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '1f4a05ea52aae148a4b65d07cd4d3fdd06fcb7c81ff07e2465728fed7ed6260f': {
      id: '1f4a05ea52aae148a4b65d07cd4d3fdd06fcb7c81ff07e2465728fed7ed6260f',
      name: 'Keywallet Touch',
      description:
        'Keywallet Touch is a rugged and durable product and has many users, fully complies with ISO7816 and ISO14443 specifications.',
      homepage: 'http://keywallet.co.kr/',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ceefb75b-2632-40c6-7471-ea23d3d49800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ceefb75b-2632-40c6-7471-ea23d3d49800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ceefb75b-2632-40c6-7471-ea23d3d49800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ceefb75b-2632-40c6-7471-ea23d3d49800'
      },
      app: {
        browser: 'http://keywallet.co.kr/',
        ios: 'https://apps.apple.com/kr/app/id1473941321#:~:text=%ED%94%8C%EB%9E%AB%ED%8F%BC%EC%97%90%EC%84%9C%20%EB%B3%B4%EA%B8%B0%3A%20Mac-,App,-Store',
        android:
          'https://play.google.com/store/apps/details?id=kr.co.keypair.keywalletTouch',
        mac: 'https://apps.apple.com/kr/app/id1473941321',
        windows:
          'https://play.google.com/store/apps/details?id=kr.co.keypair.keywalletTouch',
        linux: null as any
      },
      mobile: {
        native:
          'https://play.google.com/store/apps/details?id=kr.co.keypair.keywalletTouch',
        universal: null as any
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Keywallet Touch',
        colors: { primary: '#ecbf51', secondary: null as any }
      }
    },
    add46dfc2dc09c855fc8c14d950353528e184a8f4346886129c990074450ae9c: {
      id: 'add46dfc2dc09c855fc8c14d950353528e184a8f4346886129c990074450ae9c',
      name: 'Enno Wallet',
      description:
        'A non-custodial multi chain mobile crypto wallet & DeFi aggregator.',
      homepage: 'https://www.ennowallet.com',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ae4f5167-0b61-43bd-7d76-1f8579271000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ae4f5167-0b61-43bd-7d76-1f8579271000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ae4f5167-0b61-43bd-7d76-1f8579271000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ae4f5167-0b61-43bd-7d76-1f8579271000'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/enno-wallet/id1577011660#iosmph',
        android:
          'https://play.google.com/store/apps/details?id=com.app.awqsome.ennowallet#gpmph',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'ennowallet:', universal: '' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'EnnoWallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '80980fc1dce538ee9a795b0eaf93b06866e0b35608cff5aa72dc9879b03c1a5a': {
      id: '80980fc1dce538ee9a795b0eaf93b06866e0b35608cff5aa72dc9879b03c1a5a',
      name: 'SoCap Wallet',
      description:
        'Make money transfers to anyone, anywhere. Log in securely to trade assets, post content, buy rare digital art, and more.',
      homepage: 'https://usecryptnation.io',
      chains: ['eip155:1', 'eip155:137', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '99c0152b-1001-4f24-3293-a9125374f900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/99c0152b-1001-4f24-3293-a9125374f900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/99c0152b-1001-4f24-3293-a9125374f900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/99c0152b-1001-4f24-3293-a9125374f900'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/socap-wallet/id1608498656',
        android:
          'https://play.google.com/store/apps/details?id=uc.socap.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'SoCap Wallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '75ca1aafd91026f435803f9a11e8e4278388e189aa30dc93e532244ade262c57': {
      id: '75ca1aafd91026f435803f9a11e8e4278388e189aa30dc93e532244ade262c57',
      name: 'Talk+',
      description:
        'TALK+ provides end-to-end encrypted for high privacy messaging, with multi-cryptocurrency wallet functionality. ',
      homepage: 'https://www.talkapp.org/',
      chains: ['eip155:1', 'eip155:4'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd24cdd56-6f55-42da-631b-c25974c36f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d24cdd56-6f55-42da-631b-c25974c36f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d24cdd56-6f55-42da-631b-c25974c36f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d24cdd56-6f55-42da-631b-c25974c36f00'
      },
      app: {
        browser: 'https://www.talkapp.org/',
        ios: 'https://apps.apple.com/hk/app/talk-send-crypto-with-friends/id1547227377?l=en',
        android:
          'https://play.google.com/store/apps/details?id=org.talkapp&hl=en&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'talkapp:', universal: '' },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Talk+',
        colors: { primary: '#FCD86C', secondary: null as any }
      }
    },
    '63076bf87200069fa799f5c75c578ff963e0a6c23489b65cc8721d3cbc7ad5e2': {
      id: '63076bf87200069fa799f5c75c578ff963e0a6c23489b65cc8721d3cbc7ad5e2',
      name: 'A4 Wallet',
      description:
        'A4 wallet is a non-custodial multi-currency crypto wallet from A4 Finance to securely store, exchange and manage your cryptocurrencies',
      homepage: 'https://a4.finance',
      chains: [
        'eip155:56',
        'eip155:97',
        'eip155:43114',
        'eip155:250',
        'eip155:1',
        'eip155:137'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '7a788c03-daf7-4d93-fa3a-f94e2b719900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7a788c03-daf7-4d93-fa3a-f94e2b719900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7a788c03-daf7-4d93-fa3a-f94e2b719900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7a788c03-daf7-4d93-fa3a-f94e2b719900'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/a4-finance-crypto-web3-wallet/id1623005090',
        android:
          'https://play.google.com/store/apps/details?id=finance.a4.mobile',
        mac: '',
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'A4 Wallet',
        colors: { primary: '', secondary: null as any }
      }
    },
    '885123c0cb521fd121f0b200b0bdcf0d8d54d2f93699443ef11ecadf4a24baff': {
      id: '885123c0cb521fd121f0b200b0bdcf0d8d54d2f93699443ef11ecadf4a24baff',
      name: 'Nftrade.com',
      description: 'NFT marketplace',
      homepage: 'Https://nftrade.com/',
      chains: [
        'eip155:1',
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'eip155:3'
      ],
      versions: ['1', '2'],
      app_type: 'hybrid',
      image_id: 'e937b947-4a70-4f8d-3795-80bb7a054100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e937b947-4a70-4f8d-3795-80bb7a054100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e937b947-4a70-4f8d-3795-80bb7a054100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e937b947-4a70-4f8d-3795-80bb7a054100'
      },
      app: {
        browser: 'Https://nftrade.com/',
        ios: 'Https://nftrade.com/',
        android: 'Https://nftrade.com/',
        mac: 'Https://nftrade.com/',
        windows: 'Https://nftrade.com/',
        linux: 'Https://nftrade.com/'
      },
      mobile: {
        native:
          'wc:cfb7a0de-6849-4f7f-92f7-4d038ac47c58@1?bridge=https%3A%2F%2Ft.bridge.walletconnect.org&key=16e608e434cf0c90dfb06791ba675286d1a19d3a59c4c9f9625699bc0659aea1',
        universal: 'Https://nftrade.com/'
      },
      desktop: {
        native:
          'wc:cfb7a0de-6849-4f7f-92f7-4d038ac47c58@1?bridge=https%3A%2F%2Ft.bridge.walletconnect.org&key=16e608e434cf0c90dfb06791ba675286d1a19d3a59c4c9f9625699bc0659aea1',
        universal: 'Https://nftrade.com/'
      },
      metadata: {
        shortName: 'NFT',
        colors: { primary: '#111111', secondary: '#000000' }
      }
    },
    '107bb20463699c4e614d3a2fb7b961e66f48774cb8f6d6c1aee789853280972c': {
      id: '107bb20463699c4e614d3a2fb7b961e66f48774cb8f6d6c1aee789853280972c',
      name: 'Bitcoin.com Wallet',
      description:
        'Buy, sell, store, trade, and use cryptocurrency with the Bitcoin.com Wallet, trusted by millions.',
      homepage: 'https://www.bitcoin.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '0d7938e1-9b3b-4d8b-177b-98188c4cf400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/0d7938e1-9b3b-4d8b-177b-98188c4cf400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/0d7938e1-9b3b-4d8b-177b-98188c4cf400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/0d7938e1-9b3b-4d8b-177b-98188c4cf400'
      },
      app: {
        browser: 'https://wallet.bitcoin.com/',
        ios: 'https://apps.apple.com/us/app/bitcoin-wallet-by-bitcoin-com/id1252903728',
        android:
          'https://play.google.com/store/apps/details?id=com.bitcoin.mwallet',
        mac: 'https://apps.apple.com/us/app/bitcoin-wallet-by-bitcoin-com/id1252903728',
        windows: 'https://wallet.bitcoin.com/',
        linux: 'https://wallet.bitcoin.com/'
      },
      mobile: { native: 'bitcoincom://', universal: '' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Bitcoin.com Wallet',
        colors: { primary: '#0AC18E', secondary: '#0AC18E' }
      }
    },
    '0563e0724f434298dda37acaa704857ab293b48f1b39b765569a0072de43c0cf': {
      id: '0563e0724f434298dda37acaa704857ab293b48f1b39b765569a0072de43c0cf',
      name: 'Verso',
      description: 'The easiest crypto wallet',
      homepage: 'https://get-verso.com',
      chains: ['eip155:1', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '1d079e5b-24d2-4ac0-44bc-8f5954d81900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/1d079e5b-24d2-4ac0-44bc-8f5954d81900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/1d079e5b-24d2-4ac0-44bc-8f5954d81900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/1d079e5b-24d2-4ac0-44bc-8f5954d81900'
      },
      app: {
        browser: 'https://get-verso.com',
        ios: 'https://apps.apple.com/app/btu-protocol/id1539304605',
        android:
          'https://play.google.com/store/apps/details?id=com.btuprotocol.btu_wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Verso',
        colors: { primary: '', secondary: null as any }
      }
    },
    '4c0203e76f3163c472073fa9be9843aabdd01a99cd1d0a5a87db5caa71f68898': {
      id: '4c0203e76f3163c472073fa9be9843aabdd01a99cd1d0a5a87db5caa71f68898',
      name: '🧑‍🎤 PunkWallet',
      description: 'Forkable burner wallet built with 🏗 scaffold-eth.',
      homepage: 'https://punkwallet.io',
      chains: [
        'eip155:1',
        'eip155:4',
        'eip155:3',
        'eip155:42',
        'eip155:5',
        'eip155:10',
        'eip155:137',
        'eip155:42161',
        'eip155:80001'
      ],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: '93f81bf3-a7f1-4620-013e-5959432e3500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/93f81bf3-a7f1-4620-013e-5959432e3500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/93f81bf3-a7f1-4620-013e-5959432e3500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/93f81bf3-a7f1-4620-013e-5959432e3500'
      },
      app: {
        browser: 'https://punkwallet.io',
        ios: '',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: null as any, universal: 'https://punkwallet.io' },
      desktop: { native: null as any, universal: 'https://punkwallet.io' },
      metadata: {
        shortName: '🧑‍🎤 PunkWallet',
        colors: { primary: '#1890ff', secondary: '' }
      }
    },
    '19418ecfd44963883e4d6abca1adeb2036f3b5ffb9bee0ec61f267a9641f878b': {
      id: '19418ecfd44963883e4d6abca1adeb2036f3b5ffb9bee0ec61f267a9641f878b',
      name: 'KryptoGO Wallet',
      description:
        'The 1st decentralized DeFi Wallet with full compliance. Unlock DeFi earning in your hand.',
      homepage: 'https://kryptogo.com/wallet',
      chains: ['eip155:1', 'eip155:137', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '3ccbd966-97e8-45a0-1ceb-6141a8978e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/3ccbd966-97e8-45a0-1ceb-6141a8978e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/3ccbd966-97e8-45a0-1ceb-6141a8978e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/3ccbd966-97e8-45a0-1ceb-6141a8978e00'
      },
      app: {
        browser: 'https://kryptogo.com/wallet',
        ios: 'https://apps.apple.com/il/app/kryptogo/id1593830910',
        android:
          'https://play.google.com/store/apps/details?id=com.kryptogo.walletapp',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'https://kryptogo.page.link',
        universal: 'https://kryptogo.page.link'
      },
      desktop: {
        native: 'https://kryptogo.com',
        universal: 'https://kryptogo.com'
      },
      metadata: {
        shortName: 'KryptoGO',
        colors: { primary: '#FFC211', secondary: '#001F58' }
      }
    },
    '51334e444ea1ba3d23c96063b8600c94af89233bd3f8f3685123c46e0348766c': {
      id: '51334e444ea1ba3d23c96063b8600c94af89233bd3f8f3685123c46e0348766c',
      name: 'Snowball',
      description:
        'Gain access to high-yield stablecoin vaults and generate interest in real-time via DeFi',
      homepage: 'https://snowball.money/',
      chains: ['eip155:1', 'eip155:56', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '313faea4-af8c-41f4-0ed8-98be5d048e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/313faea4-af8c-41f4-0ed8-98be5d048e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/313faea4-af8c-41f4-0ed8-98be5d048e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/313faea4-af8c-41f4-0ed8-98be5d048e00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/app/snowball-smart-defi-wallet/id1449662311',
        android:
          'https://play.google.com/store/apps/details?id=money.snowball.defi',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: null as any,
        universal: 'https://app.snowball.exchange/app'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Snowball',
        colors: { primary: '#292E39', secondary: null as any }
      }
    },
    '76a3d548a08cf402f5c7d021f24fd2881d767084b387a5325df88bc3d4b6f21b': {
      id: '76a3d548a08cf402f5c7d021f24fd2881d767084b387a5325df88bc3d4b6f21b',
      name: 'LOBSTR Wallet',
      description:
        'LOBSTR is a leading platform for managing Stellar Lumens and other assets issued on the Stellar network.',
      homepage: 'https://lobstr.co/',
      chains: ['stellar:pubnet'],
      versions: ['2'],
      app_type: 'wallet',
      image_id: '0dafcaab-0852-47f7-85dd-436b86491d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/0dafcaab-0852-47f7-85dd-436b86491d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/0dafcaab-0852-47f7-85dd-436b86491d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/0dafcaab-0852-47f7-85dd-436b86491d00'
      },
      app: {
        browser: 'https://lobstr.co/',
        ios: 'https://apps.apple.com/us/app/lobstr-stellar-wallet/id1404357892',
        android:
          'https://play.google.com/store/apps/details?id=com.lobstr.client',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'lobstr://wc', universal: 'https://lobstr.co/uni/wc' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'LOBSTR',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '4f5de5333fed2ccf47c690579aba3b9128aea78175339ff51ef61704bde7502a': {
      id: '4f5de5333fed2ccf47c690579aba3b9128aea78175339ff51ef61704bde7502a',
      name: 'Okse Wallet',
      description: 'Okse Wallet & Card App',
      homepage: 'https://okse.io',
      chains: [
        'eip155:1',
        'eip155:3',
        'eip155:4',
        'eip155:5',
        'eip155:42',
        'eip155:56',
        'eip155:250',
        'eip155:43114',
        'eip155:40',
        'eip155:106',
        'eip155:88',
        'eip155:128',
        'eip155:1313161554'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '8a1b36d5-7f40-403a-7000-5d30f9181200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/8a1b36d5-7f40-403a-7000-5d30f9181200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/8a1b36d5-7f40-403a-7000-5d30f9181200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/8a1b36d5-7f40-403a-7000-5d30f9181200'
      },
      app: {
        browser: 'https://okse.io',
        ios: 'https://apps.apple.com/us/app/okse-wallet-card/id1555914591',
        android: 'https://play.google.com/store/apps/details?id=wallet.okse.io',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'oksewallet:', universal: 'https://okse.io/' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'OkseWallet',
        colors: { primary: '#e51b23', secondary: '#f6b1b3' }
      }
    },
    f2dcbeb246b4e4d37d748a7b2be54bbd93bdbe3e351d0badc1cbd3ea262d8466: {
      id: 'f2dcbeb246b4e4d37d748a7b2be54bbd93bdbe3e351d0badc1cbd3ea262d8466',
      name: 'BRISE Wallet',
      description:
        'You can send, receive and store coins and many other cryptocurrencies and digital assets safely and securely.',
      homepage: 'https://bitgert.com',
      chains: ['eip155:1', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '09a4e1d9-e4de-44fa-f248-5495ba9ab300',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/09a4e1d9-e4de-44fa-f248-5495ba9ab300',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/09a4e1d9-e4de-44fa-f248-5495ba9ab300',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/09a4e1d9-e4de-44fa-f248-5495ba9ab300'
      },
      app: {
        browser: null as any,
        ios: null as any,
        android:
          'https://play.google.com/store/apps/details?id=com.brise.wallet&hl=en_US&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'BRISE Wallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '7902b32d857b8e1a58a6aab7129b56b40320bdb1c4854d5f2bd0b361f7e76d10': {
      id: '7902b32d857b8e1a58a6aab7129b56b40320bdb1c4854d5f2bd0b361f7e76d10',
      name: 'LZ Wallet',
      description:
        'The ideal wallet for storing and trading your digital assets securely and conveniently.',
      homepage: 'https://lz.finance/home',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'e3272444-3876-49d3-2f84-004b818d3800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e3272444-3876-49d3-2f84-004b818d3800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e3272444-3876-49d3-2f84-004b818d3800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e3272444-3876-49d3-2f84-004b818d3800'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/app/lz-wallet/id1581578160',
        android:
          'https://play.google.com/store/apps/details?id=com.launchzone.lzwallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'LZ Wallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    a0e4da8b263efda0a304ad250f2bdb877342d6df61717805687c5c6ca5909c64: {
      id: 'a0e4da8b263efda0a304ad250f2bdb877342d6df61717805687c5c6ca5909c64',
      name: 'HyperPay',
      description:
        ' WalletConnect Video Link:   https://youtube.com/shorts/2EDKD84g8_E . Multi-ecosystem Digital Wallet, Safe and User-friendly.',
      homepage: 'https://www.hyperpay.io/',
      chains: [
        'eip155:1',
        'eip155:10',
        'eip155:66',
        'eip155:56',
        'eip155:137',
        'eip155:128',
        'eip155:43114'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'e2b56019-59be-4cdc-e944-12e6cc235c00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e2b56019-59be-4cdc-e944-12e6cc235c00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e2b56019-59be-4cdc-e944-12e6cc235c00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e2b56019-59be-4cdc-e944-12e6cc235c00'
      },
      app: {
        browser: 'https://www.hyperpay.io/',
        ios: 'https://www.hyperpay.io/',
        android: 'https://www.hyperpay.io/',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'HyperPay',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041': {
      id: '85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041',
      name: 'Frontier',
      description: 'Your Front Seat to Crypto and DeFi',
      homepage: 'https://www.frontier.xyz/',
      chains: [
        'eip155:1',
        'eip155:56',
        'eip155:137',
        'eip155:43114',
        'eip155:88'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a78c4d48-32c1-4a9d-52f2-ec7ee08ce200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a78c4d48-32c1-4a9d-52f2-ec7ee08ce200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a78c4d48-32c1-4a9d-52f2-ec7ee08ce200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a78c4d48-32c1-4a9d-52f2-ec7ee08ce200'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/frontier-defi-wallet/id1482380988',
        android:
          'https://play.google.com/store/apps/details?id=com.frontierwallet&hl=en_IN&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'frontier://', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Frontier',
        colors: { primary: '#CC703C', secondary: '#FFFFFF' }
      }
    },
    '540148afe64558bb238cab6c43bd963055ed9248c094eaebff94d7bbb59f9aba': {
      id: '540148afe64558bb238cab6c43bd963055ed9248c094eaebff94d7bbb59f9aba',
      name: 'TTM Wallet',
      description:
        'TTM Wallet is the best app with a friendly user and convenient interface to keep and manage your digital assets.',
      homepage: 'https://ttmbank.com/key-wallet/',
      chains: ['eip155:56', 'eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '82014e92-838b-4e75-e77e-76cdc5539d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/82014e92-838b-4e75-e77e-76cdc5539d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/82014e92-838b-4e75-e77e-76cdc5539d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/82014e92-838b-4e75-e77e-76cdc5539d00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/ru/app/ttm-wallet/id1540851562',
        android:
          'https://play.google.com/store/apps/details?id=com.ttmbank.wallet.app&hl=ru&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'ttmwalletapp:', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'TTM Wallet',
        colors: { primary: '#1BD099', secondary: '#1BD099' }
      }
    },
    '9034d54985807aaf3d7780f50f155f954daa468fb58d7b14b216fc79d68bbd14': {
      id: '9034d54985807aaf3d7780f50f155f954daa468fb58d7b14b216fc79d68bbd14',
      name: 'Qubic Wallet',
      description: 'More Than Just A Wallet',
      homepage: 'https://wallet.qubic.app',
      chains: ['eip155:1', 'eip155:137', 'eip155:80001', 'eip155:4'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '2e9ef302-daae-4807-555f-d4986b0b6700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2e9ef302-daae-4807-555f-d4986b0b6700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2e9ef302-daae-4807-555f-d4986b0b6700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2e9ef302-daae-4807-555f-d4986b0b6700'
      },
      app: {
        browser: 'https://wallet.qubic.app',
        ios: 'https://apps.apple.com/app/qubic-%E6%9C%80%E7%B0%A1%E5%96%AE%E4%B8%8A%E6%89%8B%E7%9A%84%E8%99%9B%E6%93%AC%E8%B2%A8%E5%B9%A3%E9%8C%A2%E5%8C%85/id1563987988?itsct=apps_box_link&itscg=30200',
        android:
          'https://play.google.com/store/apps/details?id=app.qubic.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'qubic:', universal: 'https://wallet.qubic.app' },
      desktop: { native: '', universal: '' },
      metadata: { shortName: 'Qubic', colors: { primary: '', secondary: '' } }
    },
    e1882224c4c09a84575c533867d434267c46384f5a365b889605d28b061747c4: {
      id: 'e1882224c4c09a84575c533867d434267c46384f5a365b889605d28b061747c4',
      name: 'BeeWallet',
      description:
        'Web3 wallet from BeeDAO, your bridge for entering Metaverse.',
      homepage: 'https://www.bee.com/en',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ae53ba0b-4d01-42f6-53d8-cc568409b700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ae53ba0b-4d01-42f6-53d8-cc568409b700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ae53ba0b-4d01-42f6-53d8-cc568409b700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ae53ba0b-4d01-42f6-53d8-cc568409b700'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/app/id1529988919',
        android:
          'https://play.google.com/store/apps/details?id=network.bee.app',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: null as any,
        universal: 'https://main.apple.bee9527.com'
      },
      desktop: { native: null as any, universal: '' },
      metadata: {
        shortName: 'BeeWallet',
        colors: { primary: '#ffc04d', secondary: '#ffc04d' }
      }
    },
    '71e9729d1bbd8ae7f2142a9b0aeb64f142141adc4be6659176e6fe7cf36ddd6c': {
      id: '71e9729d1bbd8ae7f2142a9b0aeb64f142141adc4be6659176e6fe7cf36ddd6c',
      name: 'Dentacoin Wallet',
      description:
        'Securely store, manage and use Dentacoin tokens (DCN) and ETH without any tech knowledge required.',
      homepage: 'https://wallet.dentacoin.com/',
      chains: ['eip155:1', 'eip155:10'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '34910dc0-9f3b-4407-115d-673707602900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/34910dc0-9f3b-4407-115d-673707602900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/34910dc0-9f3b-4407-115d-673707602900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/34910dc0-9f3b-4407-115d-673707602900'
      },
      app: {
        browser: 'https://wallet.dentacoin.com/en',
        ios: 'https://apps.apple.com/us/app/dentacoin-wallet/id1478732657',
        android:
          'https://play.google.com/store/apps/details?id=wallet.dentacoin.com',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'dentacoin-wallet://', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Dentacoin Wallet',
        colors: { primary: '#03b5de', secondary: '#152d73' }
      }
    },
    c39d8ee468e50474fdf3a0bd6b981be404d4671e2702a3d633aae95bcbaa032a: {
      id: 'c39d8ee468e50474fdf3a0bd6b981be404d4671e2702a3d633aae95bcbaa032a',
      name: 'XFUN Wallet',
      description:
        'XFUN Wallet is a non-custodial wallet that can store, send, and receive FUN, XFUN, other ERC-20 tokens, and BTC.',
      homepage: 'https://xfun.io',
      chains: ['eip155:1', 'eip155:137', 'eip155:80001', 'eip155:3'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a665f8f3-09ef-4d17-2bd0-26dca4518400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a665f8f3-09ef-4d17-2bd0-26dca4518400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a665f8f3-09ef-4d17-2bd0-26dca4518400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a665f8f3-09ef-4d17-2bd0-26dca4518400'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/app/xfun-wallet/id1612225910',
        android:
          'https://play.google.com/store/apps/details?id=com.xfun.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'xfunwallet://wc', universal: 'https://xfun.io' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'XFUN Wallet',
        colors: { primary: '#FFFFFF', secondary: '#FFFFFF' }
      }
    },
    e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4: {
      id: 'e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4',
      name: 'Exodus',
      description: 'Best Crypto Wallet for Desktop, Mobile, Browser, Hardware',
      homepage: 'https://exodus.com/',
      chains: ['eip155:1', 'eip155:56', 'eip155:43114', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '4c16cad4-cac9-4643-6726-c696efaf5200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/4c16cad4-cac9-4643-6726-c696efaf5200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/4c16cad4-cac9-4643-6726-c696efaf5200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/4c16cad4-cac9-4643-6726-c696efaf5200'
      },
      app: {
        browser: 'https://exodus.com/download/',
        ios: 'https://apps.apple.com/us/app/exodus-crypto-bitcoin-wallet/id1414384820',
        android:
          'https://play.google.com/store/apps/details?id=exodusmovement.exodus&hl=en&gl=US',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'wc:', universal: 'https://exodus.com/m' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Exodus',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '9806e241053d8c99b0ce9f62606f97d405de5c3c0b2593921f5aac99ecbaea58': {
      id: '9806e241053d8c99b0ce9f62606f97d405de5c3c0b2593921f5aac99ecbaea58',
      name: 'Blockchain.com',
      description: 'Blockchain.com Wallet',
      homepage: 'https://blockchain.com',
      chains: ['eip155:1', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'fc282669-2dbe-44d5-33fc-9168fcf08600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/fc282669-2dbe-44d5-33fc-9168fcf08600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/fc282669-2dbe-44d5-33fc-9168fcf08600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/fc282669-2dbe-44d5-33fc-9168fcf08600'
      },
      app: {
        browser: 'https://login.blockchain.com',
        ios: '',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: null as any,
        universal: 'https://login.blockchain.com/deeplink/login/wallet-connect'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Blockchain.com',
        colors: { primary: '#0C6CF2', secondary: null as any }
      }
    },
    '22046f35fd2ec3937582426f7e803617101a73bbcbe9374375529cebbfc59c47': {
      id: '22046f35fd2ec3937582426f7e803617101a73bbcbe9374375529cebbfc59c47',
      name: 'Uvtoken',
      description:
        'A safe, convenient and efficient decentralized digital asset management community',
      homepage: 'https://www.uvtoken.com',
      chains: [
        'eip155:1',
        'eip155:56',
        'eip155:66',
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'polkadot:b0a8d493285c2df73290dfb7e61f870f'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '52b9a9fc-caff-469e-033b-6d6f14e41800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/52b9a9fc-caff-469e-033b-6d6f14e41800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/52b9a9fc-caff-469e-033b-6d6f14e41800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/52b9a9fc-caff-469e-033b-6d6f14e41800'
      },
      app: {
        browser: 'https://www.uvtoken.com/',
        ios: 'https://apps.apple.com/hk/app/uvtoken/id1552556395',
        android:
          'https://wallet.uvtoken.com/static/download/android/uvtoken.apk',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'UvToken://', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Uvtoken',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '23d57b0a48df6cec411e609ddedaa290dae4a844ea90909ddd33aca794574603': {
      id: '23d57b0a48df6cec411e609ddedaa290dae4a844ea90909ddd33aca794574603',
      name: 'MyWalliD',
      description:
        'MyWalliD lets the user store and manage their own identities assets on the browser local memory or to authenticate on the web3.',
      homepage: 'https://www.wallid.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'e6cff623-9671-4a39-acc7-1c2292d7e100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e6cff623-9671-4a39-acc7-1c2292d7e100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e6cff623-9671-4a39-acc7-1c2292d7e100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e6cff623-9671-4a39-acc7-1c2292d7e100'
      },
      app: {
        browser:
          'https://chrome.google.com/webstore/detail/wallid-wallet/eknlkogikcabnjbjnhmjllabckeapdii',
        ios: null as any,
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'MyWalliD',
        colors: { primary: '#009FB1', secondary: null as any }
      }
    },
    a3e4e54d0266116e3b51cdb89630dacb1b45c5a40d3ae7c98ca329489bf2e15a: {
      id: 'a3e4e54d0266116e3b51cdb89630dacb1b45c5a40d3ae7c98ca329489bf2e15a',
      name: 'LocalTrade Wallet',
      description:
        'Created as an addition to our interconnected ecosystem, this wallet is the definitive gateway to the world of decentralized finance',
      homepage: 'https://lab.localtrade.cc',
      chains: ['eip155:56', 'eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'fcc60983-74ae-484a-4242-87cb6f05f100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/fcc60983-74ae-484a-4242-87cb6f05f100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/fcc60983-74ae-484a-4242-87cb6f05f100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/fcc60983-74ae-484a-4242-87cb6f05f100'
      },
      app: {
        browser: 'https://docs.localtrade.cc/products/defi-wallet-mvp-for-ios',
        ios: 'https://apps.apple.com/app/localtrade-defi-wallet/id1602772298',
        android:
          'https://play.google.com/store/apps/details?id=com.localtrade.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: 'https://ws.lab.localtrade.cc' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'LocalTrade',
        colors: { primary: '#00957B', secondary: '#F0F0F5' }
      }
    },
    '62429fe64910c4e3355b2e3a4dcaa1c62e0605413672aff89f1046638530e66e': {
      id: '62429fe64910c4e3355b2e3a4dcaa1c62e0605413672aff89f1046638530e66e',
      name: 'Slope Wallet',
      description: 'Slope Wallet Mobile APP',
      homepage: 'https://slope.finance',
      chains: ['eip155:1', 'eip155:3', 'eip155:4', 'eip155:5', 'eip155:42'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '2c52f74b-3633-473c-1df8-a7ebd40c5500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2c52f74b-3633-473c-1df8-a7ebd40c5500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2c52f74b-3633-473c-1df8-a7ebd40c5500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2c52f74b-3633-473c-1df8-a7ebd40c5500'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/slope-wallet/id1574624530',
        android: 'https://play.google.com/store/apps/details?id=com.wd.wallet',
        mac: '',
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: 'https://slope.finance/app' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Slope Wallet',
        colors: { primary: '#6E66FA', secondary: '' }
      }
    },
    '88018c059feb045089b22a9fe8acd4604b85f8db44693f1ddf08cfdba17dbe9a': {
      id: '88018c059feb045089b22a9fe8acd4604b85f8db44693f1ddf08cfdba17dbe9a',
      name: 'Dracula Metaverse',
      description: 'Projet du Metaverse',
      homepage: 'https://dracula-metaverse.com/#game-play',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: '7259499f-3a9c-4905-d881-19944500d000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7259499f-3a9c-4905-d881-19944500d000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7259499f-3a9c-4905-d881-19944500d000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7259499f-3a9c-4905-d881-19944500d000'
      },
      app: {
        browser: 'https://mainnet.infura.io/v3/',
        ios: null as any,
        android: null as any,
        mac: null as any,
        windows: '',
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: null as any,
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '7468ebbf5e14bd146c4fa12a08fb1a0d8d9af3b66409a5b682b64cffc4f21919': {
      id: '7468ebbf5e14bd146c4fa12a08fb1a0d8d9af3b66409a5b682b64cffc4f21919',
      name: 'Hideout Wallet',
      description:
        'Hideout Wallet移动应用安全可靠地发送，接收和存储以太坊以及许多其他加密货币和数字资产，为用户提供可信赖的数字资产管理服务。',
      homepage: 'https://hideoutpay.com/',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ea515e87-73a6-416d-a61e-bc29f32c5000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ea515e87-73a6-416d-a61e-bc29f32c5000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ea515e87-73a6-416d-a61e-bc29f32c5000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ea515e87-73a6-416d-a61e-bc29f32c5000'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/sg/app/hideout-wallet/id1620315192?l=zh',
        android:
          'https://play.google.com/store/apps/details?id=com.hideout.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'hideoutWallet', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'HideoutWallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '1c178b393f66b08f6e0decf743ee11c53a36eeb17faaa9e8c20f9ed2d05a96f3': {
      id: '1c178b393f66b08f6e0decf743ee11c53a36eeb17faaa9e8c20f9ed2d05a96f3',
      name: 'Fundamenta Mobile',
      description:
        'Multi-chain wallet and dex interface for your every day crypto needs',
      homepage: 'https://fundamenta.network',
      chains: [
        'eip155:1',
        'eip155:4',
        'eip155:25',
        'eip155:56',
        'eip155:77',
        'eip155:3',
        'eip155:5',
        'eip155:10',
        'eip155:42',
        'eip155:100',
        'eip155:421611',
        'eip155:80001',
        'eip155:338',
        'eip155:137',
        'eip155:97'
      ],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: '79797f9e-a6c7-4284-1a1c-88332f11ea00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/79797f9e-a6c7-4284-1a1c-88332f11ea00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/79797f9e-a6c7-4284-1a1c-88332f11ea00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/79797f9e-a6c7-4284-1a1c-88332f11ea00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/fundamenta-mobile/id1613465164',
        android:
          'https://play.google.com/store/apps/details?id=network.fundamenta.mobile',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: 'https://app.civiport.online' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Fundamenta',
        colors: { primary: '#26a6de', secondary: '#11a65d' }
      }
    },
    c29c9237e92bc18e141e52aba3aa6d04b1afbe9952a0ab2f96dbd8653645c1df: {
      id: 'c29c9237e92bc18e141e52aba3aa6d04b1afbe9952a0ab2f96dbd8653645c1df',
      name: 'Ancrypto Wallet',
      description:
        'Ancrypto Wallet is mnemonics based highly secured mobile wallet to store crypto assets. ',
      homepage: 'https://www.antiersolutions.com/',
      chains: [
        'eip155:1',
        'eip155:56',
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'polkadot:b0a8d493285c2df73290dfb7e61f870f'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd4382329-e288-4d7a-0ac8-3eb0facfb900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d4382329-e288-4d7a-0ac8-3eb0facfb900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d4382329-e288-4d7a-0ac8-3eb0facfb900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d4382329-e288-4d7a-0ac8-3eb0facfb900'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/in/app/ancrypto-wallet/id1453657650',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'ancrypto://app', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Ancrypto Wallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    e655422696ea63706adf66f50c802a419ad2e441ea5052b0698e892d7b22c1bc: {
      id: 'e655422696ea63706adf66f50c802a419ad2e441ea5052b0698e892d7b22c1bc',
      name: 'LATOKEN Multichain DeFi Wallet',
      description:
        'Take full control over your digital assets. Build your own bank in one app.',
      homepage: 'https://latoken.com/',
      chains: [
        'cosmos:columbus-4',
        'eip155:1',
        'eip155:43114',
        'eip155:137',
        'eip155:56',
        'eip155:250'
      ],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: 'ff858a37-cbcb-413d-c1ed-917a444bea00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ff858a37-cbcb-413d-c1ed-917a444bea00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ff858a37-cbcb-413d-c1ed-917a444bea00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ff858a37-cbcb-413d-c1ed-917a444bea00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/in/app/la-defi-wallet/id1614389764',
        android:
          'https://play.google.com/store/apps/details?id=com.app.defi&hl=en&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'dfwallet:', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'LATOKEN DeFi',
        colors: { primary: '#5661FF', secondary: '#808E9B' }
      }
    },
    e3787ea98d014ca77e2c3794db97c02ef8bcb39347705f5e79502a55434a1ecf: {
      id: 'e3787ea98d014ca77e2c3794db97c02ef8bcb39347705f5e79502a55434a1ecf',
      name: 'TK Finance',
      description:
        'Entering the great Trustkeys Finance Ecosystem. Fast, safe, secure trading experience with Hybrid Change.',
      homepage: 'https://trustkeys.network/',
      chains: ['eip155:1', 'eip155:56', 'eip155:3', 'eip155:97'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'c4066f68-2247-49bf-ac8a-a677bfa81800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/c4066f68-2247-49bf-ac8a-a677bfa81800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/c4066f68-2247-49bf-ac8a-a677bfa81800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/c4066f68-2247-49bf-ac8a-a677bfa81800'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/vn/app/tk-finance/id1601968967',
        android:
          'https://play.google.com/store/apps/details?id=com.trustkeysnetwork',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'tk://', universal: 'https://trustkeys.network' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'TK Finance',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '33e181cb6c0f3e313e20b17129f06f4dd9939a01e3a371cdef389d4dcc29258e': {
      id: '33e181cb6c0f3e313e20b17129f06f4dd9939a01e3a371cdef389d4dcc29258e',
      name: 'Lead Wallet',
      description: "The world's simplest crypto wallet and DeFi Access",
      homepage: 'https://leadwallet.io',
      chains: [
        'eip155:1',
        'eip155:42220',
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'eip155:137',
        'eip155:56',
        'stellar:pubnet',
        'polkadot:b0a8d493285c2df73290dfb7e61f870f'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd0407e64-9afa-4c1a-3290-3b925ad8b200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d0407e64-9afa-4c1a-3290-3b925ad8b200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d0407e64-9afa-4c1a-3290-3b925ad8b200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d0407e64-9afa-4c1a-3290-3b925ad8b200'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/tt/app/lead-wallet/id1578704913',
        android: 'https://play.google.com/store/apps/details?id=com.leadWallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'leadwallet://wallet-connect/',
        universal: 'https://ws.leadwallet.io/api/api/v1/wallet-connect/'
      },
      desktop: { native: null as any, universal: '' },
      metadata: {
        shortName: 'Lead',
        colors: { primary: '#F90A88', secondary: '#3E2779' }
      }
    },
    '159b0423ce9075d5662f588f805931d989627affab3e63e4dd7ebc62b9c6738c': {
      id: '159b0423ce9075d5662f588f805931d989627affab3e63e4dd7ebc62b9c6738c',
      name: 'Oxalus Wallet',
      description: 'The true wallet for people',
      homepage: 'https://oxalus.io/wallet',
      chains: [
        'eip155:80001',
        'eip155:137',
        'eip155:56',
        'eip155:97',
        'eip155:1',
        'eip155:42',
        'eip155:43114',
        'eip155:43113'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a6e22fcb-6b69-45d2-b52d-a4a347a21e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a6e22fcb-6b69-45d2-b52d-a4a347a21e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a6e22fcb-6b69-45d2-b52d-a4a347a21e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a6e22fcb-6b69-45d2-b52d-a4a347a21e00'
      },
      app: {
        browser: 'https://oxalus.io/',
        ios: 'https://apps.apple.com/vn/app/oxalus-wallet/id1620111723',
        android:
          'https://play.google.com/store/apps/details?id=io.oxalus.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'oxalus://',
        universal:
          'https://oxalus.page.link/?apn=io.oxalus.wallet&isi=1620111723&ibi=io.oxalus.wallet&link=https://deeplink.oxalus.io'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Oxalus',
        colors: { primary: '', secondary: null as any }
      }
    },
    ed657064daf740734d4a4ae31406cb294a17dc2dbd422ce90a86ed9816f0ded4: {
      id: 'ed657064daf740734d4a4ae31406cb294a17dc2dbd422ce90a86ed9816f0ded4',
      name: 'Nitrogen Wallet',
      description: 'DeFi and GameFi Solana wallet',
      homepage: 'https://nitrogen.org/',
      chains: [
        'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
        'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ'
      ],
      versions: ['2'],
      app_type: 'wallet',
      image_id: 'af185895-cda5-4eaf-e31b-28b6fe4b0800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/af185895-cda5-4eaf-e31b-28b6fe4b0800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/af185895-cda5-4eaf-e31b-28b6fe4b0800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/af185895-cda5-4eaf-e31b-28b6fe4b0800'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/nitrogen-wallet/id1595123469',
        android:
          'https://play.google.com/store/apps/details?id=org.nitrogen.mobile_wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: 'https://nitrogen.org/wc' },
      desktop: { native: null as any, universal: '' },
      metadata: {
        shortName: 'Nitrogen',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '21b071705a9b9de1646e6a3a0e894d807d0fa4a208e88fc003ee056021f208e1': {
      id: '21b071705a9b9de1646e6a3a0e894d807d0fa4a208e88fc003ee056021f208e1',
      name: 'ApolloX',
      description:
        'ApolloX is a mobile wallet that combines security and anonymity and it allows users to send, receive and store BEP20 (BSC) tokens.',
      homepage: 'https://www.apollox.com/en',
      chains: ['eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '80ab63a2-1b32-4140-3577-9fbc8ea82e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/80ab63a2-1b32-4140-3577-9fbc8ea82e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/80ab63a2-1b32-4140-3577-9fbc8ea82e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/80ab63a2-1b32-4140-3577-9fbc8ea82e00'
      },
      app: {
        browser: 'https://www.apollox.com/en',
        ios: 'https://apps.apple.com/us/app/apx-apollox/id1589405398',
        android:
          'https://play.google.com/store/apps/details?id=com.apollox.android',
        mac: 'https://www.apollox.com/en',
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: 'https://app.apollox.finance' },
      desktop: {
        native: null as any,
        universal: 'https://app.apollox.finance'
      },
      metadata: {
        shortName: 'ApolloX',
        colors: { primary: '', secondary: null as any }
      }
    },
    '36d8d9c0c7fe2957149ce8e878f3a01a8611521983362d9b651fb6e508325583': {
      id: '36d8d9c0c7fe2957149ce8e878f3a01a8611521983362d9b651fb6e508325583',
      name: 'CoinCircle',
      description: 'Earn, Pay, Buy, Borrow Crypto',
      homepage: 'https://coincircle.com',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'eae63a23-c7ba-4f7e-24b3-e6fc69215d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/eae63a23-c7ba-4f7e-24b3-e6fc69215d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/eae63a23-c7ba-4f7e-24b3-e6fc69215d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/eae63a23-c7ba-4f7e-24b3-e6fc69215d00'
      },
      app: {
        browser: 'https://coincircle.com',
        ios: 'https://coincircle.com/app',
        android: 'https://coincircle.com/app',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: '',
        universal: 'https://coincircle.com/app/walletconnect'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'CoinCircle',
        colors: { primary: '#2499c4', secondary: '#1c2d5a' }
      }
    },
    '6d1d5b892e02d4c992ae67f18f522398481360c64269f5cdf5e4b80435b20e3d': {
      id: '6d1d5b892e02d4c992ae67f18f522398481360c64269f5cdf5e4b80435b20e3d',
      name: '3S Wallet',
      description: 'Mobile crypto wallet',
      homepage: 'https://3swallet.com/',
      chains: [
        'eip155:1',
        'eip155:56',
        'eip155:137',
        'eip155:250',
        'eip155:43114',
        'eip155:25',
        'eip155:10',
        'eip155:42161',
        'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
        'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'polkadot:b0a8d493285c2df73290dfb7e61f870f'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'f3b6a89d-ec8f-49dc-e07f-6bf723e1e500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f3b6a89d-ec8f-49dc-e07f-6bf723e1e500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f3b6a89d-ec8f-49dc-e07f-6bf723e1e500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f3b6a89d-ec8f-49dc-e07f-6bf723e1e500'
      },
      app: {
        browser: 'https://3swallet.com/',
        ios: 'https://apps.apple.com/us/app/3s-wallet-crypto-wallet/id1622316272',
        android:
          'https://play.google.com/store/apps/details?id=network.bho.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'bhcwallet://', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: '3S',
        colors: { primary: '#D10D79', secondary: '#FD8440' }
      }
    },
    '5265dcf66be0553328dbc727414ab329e22f9a480e593bd2e927b279e4ab244d': {
      id: '5265dcf66be0553328dbc727414ab329e22f9a480e593bd2e927b279e4ab244d',
      name: 'SahalWallet',
      description:
        'Non-custodial multi-chain wallet serving as gateway to MRHB Network.',
      homepage: 'https://mrhb.network/',
      chains: [
        'eip155:56',
        'eip155:97',
        'eip155:137',
        'eip155:80001',
        'eip155:1',
        'eip155:4'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd29d6426-b6f2-481b-12d8-7b20ec82af00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d29d6426-b6f2-481b-12d8-7b20ec82af00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d29d6426-b6f2-481b-12d8-7b20ec82af00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d29d6426-b6f2-481b-12d8-7b20ec82af00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/gb/app/sahal-wallet/id1602366920',
        android:
          'https://play.google.com/store/apps/details?id=sahal.wallet.app&gl=GB',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: null as any,
        colors: { primary: '', secondary: null as any }
      }
    },
    '1f711d32b1df0f84741fafa2ad1d81599b01297cc7d22d153272cb3ef4232f19': {
      id: '1f711d32b1df0f84741fafa2ad1d81599b01297cc7d22d153272cb3ef4232f19',
      name: 'Sequence Wallet',
      description:
        'Sequence is the smartest web3 wallet and developer platform. Sequence makes building user-friendly web3 applications easy for developers.',
      homepage: 'https://sequence.xyz/',
      chains: [
        'eip155:1',
        'eip155:56',
        'eip155:137',
        'eip155:80001',
        'eip155:4'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'b2d5c39c-a485-4efa-5736-a782204e4a00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/b2d5c39c-a485-4efa-5736-a782204e4a00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/b2d5c39c-a485-4efa-5736-a782204e4a00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/b2d5c39c-a485-4efa-5736-a782204e4a00'
      },
      app: {
        browser: 'https://sequence.app',
        ios: null as any,
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: 'https://sequence.app' },
      desktop: { native: null as any, universal: 'https://sequence.app' },
      metadata: {
        shortName: 'Sequence',
        colors: { primary: '#4E47F5', secondary: '#DD14D5' }
      }
    },
    fbea6f68df4e6ce163c144df86da89f24cb244f19b53903e26aea9ab7de6393c: {
      id: 'fbea6f68df4e6ce163c144df86da89f24cb244f19b53903e26aea9ab7de6393c',
      name: 'Klever Wallet',
      description:
        'Klever app is a simple, powerful, smart and secure crypto wallet for BTC, ETH, BNB and other crypto assets serving over 2 million users.',
      homepage: 'https://klever.finance/wallet/',
      chains: ['eip155:1', 'eip155:56', 'eip155:128', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '8f5bbad8-6a14-4b2c-5343-cc1fca6e4d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/8f5bbad8-6a14-4b2c-5343-cc1fca6e4d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/8f5bbad8-6a14-4b2c-5343-cc1fca6e4d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/8f5bbad8-6a14-4b2c-5343-cc1fca6e4d00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/id1525584688',
        android:
          'https://play.google.com/store/apps/details?id=cash.klever.blockchain.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'kleverwallet:',
        universal: 'https://klever.page.link'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Klever',
        colors: { primary: '#DC3F89', secondary: '#903EDD' }
      }
    },
    c587c2601ccfc456cb7d4d9bb34f12f0fd11ad49faeeb4602860e239b5397843: {
      id: 'c587c2601ccfc456cb7d4d9bb34f12f0fd11ad49faeeb4602860e239b5397843',
      name: 'Vision: Crypto Wallet',
      description:
        'Vision helps you to keep track of your crypto portfolio - Receive, Send and Trade 100+ Cryptos!',
      homepage: 'https://www.vision-crypto.com/',
      chains: ['eip155:1', 'eip155:56', 'eip155:137'],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: '64ccf07c-1fba-4473-49e8-dc446e5a5000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/64ccf07c-1fba-4473-49e8-dc446e5a5000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/64ccf07c-1fba-4473-49e8-dc446e5a5000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/64ccf07c-1fba-4473-49e8-dc446e5a5000'
      },
      app: {
        browser: 'https://www.vision-crypto.com/',
        ios: 'https://apps.apple.com/app/vision-crypto-bitcoin-wallet/id1500186931',
        android:
          'https://play.google.com/store/apps/details?id=com.eletac.tronwallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: null as any,
        universal: 'https://app.vision-crypto.com'
      },
      desktop: {
        native: null as any,
        universal: 'https://app.vision-crypto.com'
      },
      metadata: {
        shortName: 'Vision',
        colors: { primary: '#0b121c', secondary: null as any }
      }
    },
    '48e53d96460308a1734614b5d4fdf7ea169e6f998e01eb7b4e18014f57904d67': {
      id: '48e53d96460308a1734614b5d4fdf7ea169e6f998e01eb7b4e18014f57904d67',
      name: 'helix id',
      description: 'Digital Identity Service Provider',
      homepage: 'https://helixid.io/',
      chains: ['eip155:1', 'eip155:4', 'eip155:80001', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '4083ef71-8389-4682-ded6-0099236d2e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/4083ef71-8389-4682-ded6-0099236d2e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/4083ef71-8389-4682-ded6-0099236d2e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/4083ef71-8389-4682-ded6-0099236d2e00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/de/app/helix-id/id1469238013?l=en',
        android:
          'https://play.google.com/store/apps/details?id=com.io.helix.id&hl=en&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'helix-id://helix-id.com', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'helixid',
        colors: { primary: '#0021FF', secondary: '#FA3C50' }
      }
    },
    '584538f059b079deecc80dface062cf40c33afd45dca02c7edca134a8225556d': {
      id: '584538f059b079deecc80dface062cf40c33afd45dca02c7edca134a8225556d',
      name: 'Ballet Crypto',
      description:
        'Ballet Crypto is the world’s first multi-currency, non-electronic cryptocurrency wallet.',
      homepage: 'https://www.balletcrypto.com/',
      chains: ['eip155:1', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '542094e6-70d6-4b0d-4c8f-b61cc2c38500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/542094e6-70d6-4b0d-4c8f-b61cc2c38500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/542094e6-70d6-4b0d-4c8f-b61cc2c38500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/542094e6-70d6-4b0d-4c8f-b61cc2c38500'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/ballet-crypto/id1474912942',
        android:
          'https://play.google.com/store/apps/details?id=com.balletcrypto&hl=en_US&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: null as any,
        colors: { primary: null as any, secondary: null as any }
      }
    },
    a1aa007996a851ecf6b2752ab68bf98aa28f3a533f157420e960b447b4ff0448: {
      id: 'a1aa007996a851ecf6b2752ab68bf98aa28f3a533f157420e960b447b4ff0448',
      name: 'The Parallel',
      description: 'An Infinite Metaverse',
      homepage: 'https://theparallel.io/',
      chains: ['eip155:56', 'eip155:97'],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: 'de73fe0b-0244-4373-dea4-bef78ca82e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/de73fe0b-0244-4373-dea4-bef78ca82e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/de73fe0b-0244-4373-dea4-bef78ca82e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/de73fe0b-0244-4373-dea4-bef78ca82e00'
      },
      app: {
        browser: 'https://theparallel.io/',
        ios: null as any,
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'TheParallel',
        colors: { primary: '', secondary: null as any }
      }
    },
    '9b9be9e11e15dfc7e6914449c78c345a60a3a5a8ec5855df5517eb76c56b6018': {
      id: '9b9be9e11e15dfc7e6914449c78c345a60a3a5a8ec5855df5517eb76c56b6018',
      name: 'CeloDance',
      description:
        'A Celo mobile wallet that supports the management of celo assets, you can transfer in or out of CELO/cUSD/cEUR, and lock your CELO.',
      homepage: 'http://celo.dance/',
      chains: ['eip155:42220'],
      versions: ['2'],
      app_type: 'wallet',
      image_id: '47c8ab7b-a66c-4949-f0fe-b0c2c169ee00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/47c8ab7b-a66c-4949-f0fe-b0c2c169ee00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/47c8ab7b-a66c-4949-f0fe-b0c2c169ee00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/47c8ab7b-a66c-4949-f0fe-b0c2c169ee00'
      },
      app: {
        browser: null as any,
        ios: 'https://www.pgyer.com/JbDW',
        android: 'https://www.pgyer.com/JbDW',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'celo://wallet/dappkit/celodance',
        universal: null as any
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'CeloDance',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    af9a6dfff9e63977bbde28fb23518834f08b696fe8bff6dd6827acad1814c6be: {
      id: 'af9a6dfff9e63977bbde28fb23518834f08b696fe8bff6dd6827acad1814c6be',
      name: 'Status',
      description:
        'Status is a private messenger, secure crypto wallet, and Ethereum Web3 DApp browser—in short, one powerful communication tool.',
      homepage: 'https://status.im/',
      chains: ['eip155:1', 'eip155:100', 'eip155:4', 'eip155:3'],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: 'e131fa98-8c4f-4680-f5b6-6fb77189c900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e131fa98-8c4f-4680-f5b6-6fb77189c900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e131fa98-8c4f-4680-f5b6-6fb77189c900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e131fa98-8c4f-4680-f5b6-6fb77189c900'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/status-private-communication/id1178893006',
        android:
          'https://play.google.com/store/apps/details?id=im.status.ethereum&hl=en&gl=US',
        mac: 'https://status.im/get/',
        windows: 'https://status.im/get/',
        linux: 'https://status.im/get/'
      },
      mobile: { native: '', universal: null as any },
      desktop: { native: '', universal: null as any },
      metadata: {
        shortName: 'Status',
        colors: { primary: '#4360df', secondary: '' }
      }
    },
    a18aeec9fab0c08ca41e7bdaae06cac5700bb628ec75c6381bacd9b2df574895: {
      id: 'a18aeec9fab0c08ca41e7bdaae06cac5700bb628ec75c6381bacd9b2df574895',
      name: 'Monarch Wallet',
      description:
        'Secure, Decentralized, DAPP Gateway, *NFTs, Buy, Sell, Earn, Swap & *Recurring & Custom Crypto Payments — Over 1 Million Wallets Generated',
      homepage: 'https://monarchwallet.com',
      chains: ['eip155:56', 'eip155:1'],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: 'c664d955-8a1e-4460-3917-4cfcf198f000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/c664d955-8a1e-4460-3917-4cfcf198f000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/c664d955-8a1e-4460-3917-4cfcf198f000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/c664d955-8a1e-4460-3917-4cfcf198f000'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/monarch-wallet/id1386397997',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: 'https://monarchwallet.com' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Monarch',
        colors: { primary: '#F9A900', secondary: '#282629' }
      }
    },
    c40b9bcef32fa6ce4e0df98be1420628bbc4957646f742380fe618fcb4ab74f1: {
      id: 'c40b9bcef32fa6ce4e0df98be1420628bbc4957646f742380fe618fcb4ab74f1',
      name: 'RiceWallet',
      description: 'Investing in DeFi for Everyone',
      homepage: 'https://ricewallet.io/',
      chains: ['eip155:1', 'eip155:137', 'eip155:56', 'eip155:43114'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'df94578e-19be-4f00-258f-2470343e7b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/df94578e-19be-4f00-258f-2470343e7b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/df94578e-19be-4f00-258f-2470343e7b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/df94578e-19be-4f00-258f-2470343e7b00'
      },
      app: {
        browser: 'https://ricewallet.io',
        ios: '',
        android: '',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'ricewallet', universal: 'https://ricewallet.io' },
      desktop: { native: null as any, universal: 'https://ricewallet.io' },
      metadata: {
        shortName: 'RICE Wallet',
        colors: { primary: '#3361f4', secondary: null as any }
      }
    },
    b265ce38b94d602957a0946673c59a99a15d69adda4317544fec7298ea2d1387: {
      id: 'b265ce38b94d602957a0946673c59a99a15d69adda4317544fec7298ea2d1387',
      name: 'SafeMoon',
      description:
        'SafeMoon Wallet is the safe place to buy, sell, and swap your crypto.',
      homepage: 'https://safemoon.net/',
      chains: ['eip155:1', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ecc31a8e-0ee9-49db-cc59-0876b7c35600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ecc31a8e-0ee9-49db-cc59-0876b7c35600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ecc31a8e-0ee9-49db-cc59-0876b7c35600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ecc31a8e-0ee9-49db-cc59-0876b7c35600'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/safemoon/id1579735495',
        android:
          'https://play.google.com/store/apps/details?id=net.safemoon.androidwallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'safemoon:', universal: 'https://safemoon.net/' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'SafeMoon',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    dc5415b6ea8114db518ae91195b027d690a11a1d2bfdd1a904e93c5cb746380e: {
      id: 'dc5415b6ea8114db518ae91195b027d690a11a1d2bfdd1a904e93c5cb746380e',
      name: 'SimpleHold',
      description:
        'SimpleHold is a non-custodial multicurrency wallet that empowers you to receive, send, exchange and store your cryptocurrencies.',
      homepage: 'https://simplehold.io/',
      chains: [
        'eip155:1',
        'eip155:50',
        'eip155:56',
        'eip155:61',
        'eip155:137',
        'eip155:250',
        'eip155:361',
        'eip155:1666600003',
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'cosmos:kava-4',
        'cosmos:columbus-4',
        'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
        'eip155:43114',
        'eip155:4689'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a9f1ba96-b658-4d13-f71f-226b6389f000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a9f1ba96-b658-4d13-f71f-226b6389f000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a9f1ba96-b658-4d13-f71f-226b6389f000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a9f1ba96-b658-4d13-f71f-226b6389f000'
      },
      app: {
        browser: 'https://simplehold.io/download',
        ios: 'https://apps.apple.com/gb/app/simplehold-crypto-wallet/id1589064973',
        android:
          'https://play.google.com/store/apps/details?id=com.simplehold.app',
        mac: null as any,
        windows: '',
        linux: null as any
      },
      mobile: {
        native: 'simplehold://wc?uri=',
        universal: 'https://simplehold.io'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'SimpleHold',
        colors: { primary: '#3FBB7D', secondary: '#E9F5EE' }
      }
    },
    '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662': {
      id: '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662',
      name: 'BitKeep',
      description: 'BitKeep Wallet',
      homepage: 'https://bitkeep.org',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '3f7075d0-4ab7-4db5-404d-3e4c05e6fe00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/3f7075d0-4ab7-4db5-404d-3e4c05e6fe00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/3f7075d0-4ab7-4db5-404d-3e4c05e6fe00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/3f7075d0-4ab7-4db5-404d-3e4c05e6fe00'
      },
      app: {
        browser: 'https://bitkeep.org',
        ios: 'https://bitkeep.com/download',
        android: 'https://bitkeep.com/download',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'bitkeep://', universal: '' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'BitKeep',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '47bb07617af518642f3413a201ec5859faa63acb1dd175ca95085d35d38afb83': {
      id: '47bb07617af518642f3413a201ec5859faa63acb1dd175ca95085d35d38afb83',
      name: 'KEYRING PRO',
      description:
        'KEYRING PRO brings possibilities to reality by offering a simple cross-chain environment, where user can experience multiple chains at once.',
      homepage: 'https://keyring.app/',
      chains: [
        'eip155:61',
        'eip155:42',
        'eip155:88',
        'eip155:250',
        'eip155:4002',
        'eip155:137',
        'eip155:80001',
        'eip155:10',
        'eip155:69',
        'eip155:42161',
        'eip155:421611',
        'eip155:56',
        'eip155:97',
        'eip155:128',
        'eip155:256',
        'eip155:1666600000',
        'eip155:1666600001',
        'eip155:43114',
        'eip155:43113'
      ],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: 'dda0f0fb-34e8-4a57-dcea-b008e7d1ff00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/dda0f0fb-34e8-4a57-dcea-b008e7d1ff00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/dda0f0fb-34e8-4a57-dcea-b008e7d1ff00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/dda0f0fb-34e8-4a57-dcea-b008e7d1ff00'
      },
      app: {
        browser: 'https://keyring.app/',
        ios: 'https://apps.apple.com/us/app/keyring-pro-wallet-management/id1546824976',
        android:
          'https://play.google.com/store/apps/details?id=co.bacoor.keyring',
        mac: 'https://keyring.app/',
        windows: 'https://keyring.app/',
        linux: 'https://keyring.app/'
      },
      mobile: { native: 'keyring:', universal: 'https://keyring.app' },
      desktop: { native: 'keyring:', universal: 'https://keyring.app' },
      metadata: {
        shortName: 'KEYRING PRO',
        colors: { primary: '#00D2C9', secondary: '#FFAA55' }
      }
    },
    e2c884737858154c28ff2c543f96331f8987f58734a9c9eaff6d2daef8cd2917: {
      id: 'e2c884737858154c28ff2c543f96331f8987f58734a9c9eaff6d2daef8cd2917',
      name: 'Dohrnii Wallet',
      description: 'The official wallet of the Dohrnii DAO',
      homepage: 'https://dohrnii.io/',
      chains: ['eip155:1', 'eip155:56', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '1bb51ed9-68ed-4012-3082-72dcb7754300',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/1bb51ed9-68ed-4012-3082-72dcb7754300',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/1bb51ed9-68ed-4012-3082-72dcb7754300',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/1bb51ed9-68ed-4012-3082-72dcb7754300'
      },
      app: {
        browser: 'https://dohrnii.io/',
        ios: 'https://apps.apple.com/ch/app/dohrnii-wallet/id1624702756?l=en',
        android:
          'https://play.google.com/store/apps/details?id=io.dohrnii.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Dohrnii Wallet',
        colors: { primary: '', secondary: null as any }
      }
    },
    '4ff5b6816dd118b8c362939cfb7332f667ff071a1828aa96c760871e1b5634fd': {
      id: '4ff5b6816dd118b8c362939cfb7332f667ff071a1828aa96c760871e1b5634fd',
      name: 'ZenGo',
      description:
        'ZenGo is the first keyless crypto wallet without any private keys, passwords or seed phrases to manage or lose.',
      homepage: 'https://zengo.com/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd1794d97-ea1f-4966-be42-9f614bb5d800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d1794d97-ea1f-4966-be42-9f614bb5d800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d1794d97-ea1f-4966-be42-9f614bb5d800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d1794d97-ea1f-4966-be42-9f614bb5d800'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/app/zengo-crypto-bitcoin-wallet/id1440147115',
        android:
          'https://play.google.com/store/apps/details?id=com.zengo.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: 'https://get.zengo.com' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'ZenGo',
        colors: { primary: '#35C4BA', secondary: null as any }
      }
    },
    '746fa59e214ba46cfa688e9540a6b3450b514e89f39bd9c5a00b5a7fdaba8351': {
      id: '746fa59e214ba46cfa688e9540a6b3450b514e89f39bd9c5a00b5a7fdaba8351',
      name: 'GoldBit',
      description:
        'GoldBit 因應數位貨幣而生，作為儲存虛擬幣的冷錢包，支援Bitcoin、Ethereum和TRON三大主鏈的幣種，提供快速且便利的操作，並且擁有市面少有多錢包機制，可以輕鬆且安全存放虛擬貨幣。',
      homepage: 'http://goldbit.io/gbapp.php',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '11974ef1-21ab-4806-a2b1-362c31499900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/11974ef1-21ab-4806-a2b1-362c31499900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/11974ef1-21ab-4806-a2b1-362c31499900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/11974ef1-21ab-4806-a2b1-362c31499900'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/tw/app/goldbit錢包/id1551914030',
        android:
          'https://play.google.com/store/apps/details?id=com.goldbitpro.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'goldbit://', universal: '' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'GoldBit',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    a3dad9f302b2e36feb712645646de6ad4bab221d250f7f6c770c6429e596ac43: {
      id: 'a3dad9f302b2e36feb712645646de6ad4bab221d250f7f6c770c6429e596ac43',
      name: 'Argent Wallet',
      description: 'Synchronization your wallet ',
      homepage: 'https://argent.xyz/',
      chains: ['eip155:2'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'dd0a57f8-436a-43db-18bd-1ef983ca8b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/dd0a57f8-436a-43db-18bd-1ef983ca8b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/dd0a57f8-436a-43db-18bd-1ef983ca8b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/dd0a57f8-436a-43db-18bd-1ef983ca8b00'
      },
      app: {
        browser: 'https://argent.xyz/',
        ios: null as any,
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: null as any,
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '41f20106359ff63cf732adf1f7dc1a157176c9b02fd266b50da6dcc1e9b86071': {
      id: '41f20106359ff63cf732adf1f7dc1a157176c9b02fd266b50da6dcc1e9b86071',
      name: 'Bitizen',
      description: 'Crypto/Web3 Wallet',
      homepage: 'https://bitizen.org/',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '75dd1471-77e9-4811-ce57-ec8fc980ec00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/75dd1471-77e9-4811-ce57-ec8fc980ec00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/75dd1471-77e9-4811-ce57-ec8fc980ec00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/75dd1471-77e9-4811-ce57-ec8fc980ec00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/bitizen-defi-web3-eth-wallet/id1598283542',
        android:
          'https://play.google.com/store/apps/details?id=org.bitizen.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'bitizen://wallet',
        universal: 'https://bitizen.org/wallet'
      },
      desktop: { native: '', universal: null as any },
      metadata: {
        shortName: 'Bitizen',
        colors: { primary: '#00B78C', secondary: null as any }
      }
    },
    b823fb0d7228ef8e3c0bc9607df9ed79dae2ab3a2811d33f22ade4f573c18232: {
      id: 'b823fb0d7228ef8e3c0bc9607df9ed79dae2ab3a2811d33f22ade4f573c18232',
      name: 'Slavi Wallet',
      description:
        'Cross-chain decentralized SuperDApp with 30+ blockchains & one-click access to Web 3.0, PlayToEarn and NFT services',
      homepage: 'https://slavi.io/',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '282ce060-0beb-4236-b7b0-1b34cc6c8f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/282ce060-0beb-4236-b7b0-1b34cc6c8f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/282ce060-0beb-4236-b7b0-1b34cc6c8f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/282ce060-0beb-4236-b7b0-1b34cc6c8f00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/en/app/slavi-wallet/id1610125496?l=en',
        android:
          'https://play.google.com/store/apps/details?id=com.defiwalletmobile',
        mac: 'https://apps.apple.com/en/app/slavi-wallet/id1610125496?l=en',
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'slaviwallet:',
        universal: 'https://www.slaviwallet.io'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Slavi Wallet',
        colors: { primary: '#F2C75B', secondary: '#4D1F87' }
      }
    },
    '91628e2ae2228af2145bfac21093ad7be682810ec16af540a9e017ad6b933a81': {
      id: '91628e2ae2228af2145bfac21093ad7be682810ec16af540a9e017ad6b933a81',
      name: 'NeftiWallet',
      description:
        "The platform's NFT WALLET allows storing of the NFTs securely on the blockchain.",
      homepage: 'https://neftipedia.com/',
      chains: ['eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '1f812dec-be3d-446c-52f7-a79eb0dd5400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/1f812dec-be3d-446c-52f7-a79eb0dd5400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/1f812dec-be3d-446c-52f7-a79eb0dd5400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/1f812dec-be3d-446c-52f7-a79eb0dd5400'
      },
      app: {
        browser: null as any,
        ios: null as any,
        android:
          'https://play.google.com/store/apps/details?id=com.NEFTiPEDiA.mp',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'nefti://nefti.id/asset/',
        universal: 'https://nefti.id/asset/'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'NeftiWallet',
        colors: { primary: '#37747E', secondary: '#58595B' }
      }
    },
    c6f3d04a4e1a51e7d2045f347a5ebdab30fc600950a740fca21f0c92e230ee05: {
      id: 'c6f3d04a4e1a51e7d2045f347a5ebdab30fc600950a740fca21f0c92e230ee05',
      name: 'Arianee Wallet',
      description:
        'With the Arianee Wallet, you can use digital passports / NFTs to verify and prove the authenticity of your most precious items.',
      homepage: 'https://arianee.org',
      chains: [
        'eip155:137',
        'eip155:99',
        'eip155:1',
        'eip155:77',
        'eip155:80001'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'ace938a9-c906-4b9e-f683-b85f1ab72800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/ace938a9-c906-4b9e-f683-b85f1ab72800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/ace938a9-c906-4b9e-f683-b85f1ab72800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/ace938a9-c906-4b9e-f683-b85f1ab72800'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/fr/app/arianee-wallet/id1435782507',
        android:
          'https://play.google.com/store/apps/details?id=com.arianee.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'com.arianee.wallet',
        universal: 'https://arianee.net'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: null as any,
        colors: { primary: '', secondary: '' }
      }
    },
    ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18: {
      id: 'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18',
      name: 'Zerion',
      description: 'Smart Web3 Wallet',
      homepage: 'https://zerion.io/',
      chains: [
        'eip155:1',
        'eip155:200',
        'eip155:137',
        'eip155:43114',
        'eip155:56',
        'eip155:100',
        'eip155:10',
        'eip155:1313161554',
        'eip155:250'
      ],
      versions: ['1', '2'],
      app_type: 'hybrid',
      image_id: 'f216b371-96cf-409a-9d88-296392b85800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f216b371-96cf-409a-9d88-296392b85800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f216b371-96cf-409a-9d88-296392b85800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f216b371-96cf-409a-9d88-296392b85800'
      },
      app: {
        browser: 'https://app.zerion.io',
        ios: 'https://apps.apple.com/app/id1456732565',
        android:
          'https://play.google.com/store/apps/details?id=io.zerion.android&hl=en&gl=US',
        mac: 'https://apps.apple.com/app/id1456732565',
        windows: '',
        linux: ''
      },
      mobile: { native: 'zerion://', universal: 'https://app.zerion.io' },
      desktop: { native: 'zerion://', universal: 'https://app.zerion.io' },
      metadata: {
        shortName: 'Zerion',
        colors: { primary: '', secondary: '#2962ef' }
      }
    },
    f94a60403cdffa9a521dd12f9ec1004a887755c62ecf7bb4e9b8ee6806c26b58: {
      id: 'f94a60403cdffa9a521dd12f9ec1004a887755c62ecf7bb4e9b8ee6806c26b58',
      name: 'UvToken',
      description:
        'A safe, convenient and efficient decentralized digital asset management community',
      homepage: 'https://www.uvtoken.com',
      chains: [
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'eip155:1',
        'eip155:97',
        'eip155:56',
        'eip155:65',
        'eip155:66',
        'eip155:128'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a0057241-cd91-4a53-7175-016b76bfd900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a0057241-cd91-4a53-7175-016b76bfd900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a0057241-cd91-4a53-7175-016b76bfd900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a0057241-cd91-4a53-7175-016b76bfd900'
      },
      app: {
        browser: 'https://www.uvtoken.com',
        ios: 'https://apps.apple.com/hk/app/uvtoken/id1552556395',
        android:
          'https://wallet.uvtoken.com/static/download/android/uvtoken.apk',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: null as any,
        colors: { primary: null as any, secondary: null as any }
      }
    },
    f039a4bdf6d5a54065b6cc4b134e32d23bed5d391ad97f25aab5627de26a0784: {
      id: 'f039a4bdf6d5a54065b6cc4b134e32d23bed5d391ad97f25aab5627de26a0784',
      name: 'Neon Wallet',
      description: 'Light wallet for the NEO blockchain',
      homepage: 'https://neonwallet.com/',
      chains: ['neo3:mainnet'],
      versions: ['2'],
      app_type: 'wallet',
      image_id: '322bd6f0-09b5-4595-cb15-0dfab8054800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/322bd6f0-09b5-4595-cb15-0dfab8054800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/322bd6f0-09b5-4595-cb15-0dfab8054800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/322bd6f0-09b5-4595-cb15-0dfab8054800'
      },
      app: {
        browser: 'https://neonwallet.com/',
        ios: 'https://apps.apple.com/my/app/neon-wallet-mobile/id1530111452',
        android:
          'https://play.google.com/store/apps/details?id=neo.org.freewallet.app&hl=pt_BR&gl=US',
        mac: 'https://neonwallet.com/',
        windows: 'https://neonwallet.com/',
        linux: 'https://neonwallet.com/'
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Neon Wallet',
        colors: { primary: '#4cffb3', secondary: '#1E252A' }
      }
    },
    c482dfe368d4f004479977fd88e80dc9e81107f3245d706811581a6dfe69c534: {
      id: 'c482dfe368d4f004479977fd88e80dc9e81107f3245d706811581a6dfe69c534',
      name: 'NOW Wallet',
      description: 'Cryptocurrency Fort Knox in your pocket',
      homepage: 'https://walletnow.app/',
      chains: ['eip155:1', 'eip155:43114', 'eip155:56', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'b6ee4efc-f53e-475b-927b-a7ded6211700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/b6ee4efc-f53e-475b-927b-a7ded6211700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/b6ee4efc-f53e-475b-927b-a7ded6211700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/b6ee4efc-f53e-475b-927b-a7ded6211700'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/app/now-wallet-bitcoin-crypto/id1591216386',
        android: 'https://play.google.com/store/apps/details?id=com.nowwallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'walletnow://',
        universal: 'https://walletnow.app.link'
      },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'NOW Wallet',
        colors: { primary: '#00C26F', secondary: '#4E95FF' }
      }
    },
    '0e4915107da5b3408b38e248f7a710f4529d54cd30e9d12ff0eb886d45c18e92': {
      id: '0e4915107da5b3408b38e248f7a710f4529d54cd30e9d12ff0eb886d45c18e92',
      name: 'Arculus Wallet',
      description: 'Cold Storage Crypto Wallet',
      homepage: 'https://www.getarculus.com',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'f78dab27-7165-4a3d-fdb1-fcff06c0a700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f78dab27-7165-4a3d-fdb1-fcff06c0a700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f78dab27-7165-4a3d-fdb1-fcff06c0a700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f78dab27-7165-4a3d-fdb1-fcff06c0a700'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/arculus-wallet/id1575425801',
        android:
          'https://play.google.com/store/apps/details?id=co.arculus.wallet.android&hl=en_US&gl=US',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'arculuswc:', universal: 'https://gw.arculus.co/app' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Arculus Wallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '5dc61e9d57489bccc11306365361614dac3de1d8eab2a9a7877a95970f68712f': {
      id: '5dc61e9d57489bccc11306365361614dac3de1d8eab2a9a7877a95970f68712f',
      name: 'PayBolt',
      description:
        'World’s first Web3 cross-chain crypto payment ecosystem that accepts ALL tokens',
      homepage: 'https://www.paybolt.com',
      chains: ['eip155:137', 'eip155:1', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'cc8f4e0c-56a8-465a-6cb6-3e9d60846500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/cc8f4e0c-56a8-465a-6cb6-3e9d60846500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/cc8f4e0c-56a8-465a-6cb6-3e9d60846500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/cc8f4e0c-56a8-465a-6cb6-3e9d60846500'
      },
      app: {
        browser: 'https://www.paybolt.com',
        ios: 'https://apps.apple.com/app/paybolt-crypto/id1599880290',
        android:
          'https://play.google.com/store/apps/details?id=com.fincrypt.paybolt',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'paybolt://Wallet', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'PayBolt',
        colors: { primary: '#000000', secondary: null as any }
      }
    },
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709': {
      id: '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
      name: 'OKX Wallet',
      description: 'One Web3 portal to rule them all',
      homepage: 'https://www.okx.com/web3',
      chains: [
        'eip155:66',
        'eip155:1',
        'eip155:56',
        'eip155:137',
        'eip155:43114'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '45f2f08e-fc0c-4d62-3e63-404e72170500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/45f2f08e-fc0c-4d62-3e63-404e72170500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/45f2f08e-fc0c-4d62-3e63-404e72170500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/45f2f08e-fc0c-4d62-3e63-404e72170500'
      },
      app: {
        browser: 'https://www.okx.com/download',
        ios: 'https://apps.apple.com/us/app/okx-buy-bitcoin-eth-crypto/id1327268470',
        android:
          'https://play.google.com/store/apps/details?id=com.okinc.okex.gp',
        mac: 'https://www.okx.com/download',
        windows: 'https://www.okx.com/download',
        linux: 'https://www.okx.com/download'
      },
      mobile: { native: 'okex://main', universal: '' },
      desktop: { native: '', universal: null as any },
      metadata: {
        shortName: 'OKX Wallet',
        colors: { primary: '', secondary: '' }
      }
    },
    '30edc47c24de2727a86d50ba88c3516db28c0494a7c5f0b127e4329e855c6840': {
      id: '30edc47c24de2727a86d50ba88c3516db28c0494a7c5f0b127e4329e855c6840',
      name: 'Autonomy: Digital Art Wallet',
      description:
        'Autonomy is the world’s first and only NFT digital art wallet. Securely collect, view and discover NFTs.',
      homepage: 'https://autonomy.io',
      chains: [],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: '672e9061-e0c9-45ec-5d9c-9fd10e83e800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/672e9061-e0c9-45ec-5d9c-9fd10e83e800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/672e9061-e0c9-45ec-5d9c-9fd10e83e800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/672e9061-e0c9-45ec-5d9c-9fd10e83e800'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/autonomy-app/id1544022728',
        android:
          'https://play.google.com/store/apps/details?id=com.bitmark.autonomy_client',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'autonomy-wc',
        universal: 'https://autonomy.io/apps/wc'
      },
      desktop: { native: '', universal: '' },
      metadata: {
        shortName: 'Autonomy',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    ad47668fc1e4327881f1f8b91f563d7a2c1d6e9596cd6b7d97b5791fe76964e9: {
      id: 'ad47668fc1e4327881f1f8b91f563d7a2c1d6e9596cd6b7d97b5791fe76964e9',
      name: 'Mask Network',
      description: 'The portal to the new, open internet',
      homepage: 'https://mask.io/',
      chains: [
        'eip155:1',
        'eip155:56',
        'eip155:137',
        'eip155:42161',
        'eip155:100'
      ],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: '51fa27fd-8a21-4de0-c084-528e4a37ad00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/51fa27fd-8a21-4de0-c084-528e4a37ad00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/51fa27fd-8a21-4de0-c084-528e4a37ad00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/51fa27fd-8a21-4de0-c084-528e4a37ad00'
      },
      app: {
        browser: 'https://mask.io/',
        ios: 'https://apps.apple.com/app/id1478382964',
        android:
          'https://play.google.com/store/apps/details?id=com.dimension.maskbook',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Mask',
        colors: { primary: '#1c67f2', secondary: '#FFFFFF' }
      }
    },
    '3a9973b9ee638a3aac3e1d001cabe425bf307602a61faee67942fda314736610': {
      id: '3a9973b9ee638a3aac3e1d001cabe425bf307602a61faee67942fda314736610',
      name: 'Uniblow',
      description: 'A universal blockchain wallet for cryptos',
      homepage: 'https://uniblow.org/',
      chains: [
        'eip155:1',
        'eip155:3',
        'eip155:4',
        'eip155:5',
        'eip155:42',
        'eip155:56',
        'eip155:59',
        'eip155:97',
        'eip155:137',
        'eip155:421611',
        'eip155:80001',
        'eip155:62320',
        'eip155:44787',
        'eip155:43114',
        'eip155:43113',
        'eip155:42220',
        'eip155:42161',
        'eip155:250'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '3aa86daa-b885-4686-c443-83355e1b3b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/3aa86daa-b885-4686-c443-83355e1b3b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/3aa86daa-b885-4686-c443-83355e1b3b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/3aa86daa-b885-4686-c443-83355e1b3b00'
      },
      app: {
        browser: '',
        ios: null as any,
        android: null as any,
        mac: 'https://uniblow.org/get',
        windows: 'https://uniblow.org/get',
        linux: 'https://uniblow.org/get'
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Uniblow',
        colors: { primary: '#6D57FF', secondary: null as any }
      }
    },
    '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489': {
      id: '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489',
      name: 'Fireblocks',
      description: '#1 Crypto and Digital Asset Platform for Institutions',
      homepage: 'https://www.fireblocks.com/',
      chains: [
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'polkadot:b0a8d493285c2df73290dfb7e61f870f',
        'cosmos:columbus-4',
        'eip155:1',
        'eip155:3',
        'eip155:10',
        'eip155:19',
        'eip155:30',
        'eip155:31',
        'eip155:42',
        'eip155:50',
        'eip155:51',
        'eip155:56',
        'eip155:59',
        'eip155:61',
        'eip155:63',
        'eip155:69',
        'eip155:97',
        'eip155:137',
        'eip155:250',
        'eip155:1285',
        'eip155:1284',
        'eip155:10000',
        'eip155:10001',
        'eip155:42161',
        'eip155:42220',
        'eip155:43113',
        'eip155:43114',
        'eip155:44787',
        'eip155:62320',
        'eip155:421611',
        'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
        'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
        'eip155:4',
        'eip155:5'
      ],
      versions: ['1', '2'],
      app_type: 'wallet',
      image_id: '7e1514ba-932d-415d-1bdb-bccb6c2cbc00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/7e1514ba-932d-415d-1bdb-bccb6c2cbc00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/7e1514ba-932d-415d-1bdb-bccb6c2cbc00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/7e1514ba-932d-415d-1bdb-bccb6c2cbc00'
      },
      app: {
        browser: 'https://console.fireblocks.io/',
        ios: 'https://apps.apple.com/us/app/fireblocks/id1439296596',
        android:
          'https://play.google.com/store/apps/details?id=com.fireblocks.client&gl=IL',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: 'fireblocks-wc://', universal: null as any },
      desktop: {
        native: null as any,
        universal: 'https://console.fireblocks.io/v2'
      },
      metadata: {
        shortName: 'Fireblocks',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '2a527d1ee63ab8837381714b85f75d57217699c2b758a8d79bf6658f02db0578': {
      id: '2a527d1ee63ab8837381714b85f75d57217699c2b758a8d79bf6658f02db0578',
      name: 'WATT ME',
      description:
        'More than just a wallet Multifunctional app for storing, buying and professional crypto currency trading as well as NFT-tokens storing.',
      homepage: 'https://watt.me',
      chains: ['eip155:1', 'eip155:137', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '38c619c4-5365-4de5-09b2-cdde8caf3600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/38c619c4-5365-4de5-09b2-cdde8caf3600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/38c619c4-5365-4de5-09b2-cdde8caf3600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/38c619c4-5365-4de5-09b2-cdde8caf3600'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/ru/app/watt-me/id1594847330',
        android:
          'https://play.google.com/store/apps/details?id=watt.wallet&hl=ru&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'wattwallet://wallet-connect/',
        universal: null as any
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'WATT ME',
        colors: { primary: '#F5EB51', secondary: '#282828' }
      }
    },
    '5859076ade608fbc4e9d3fe2f95e8527de80f8451ecbb1dced54ca84deae0dd6': {
      id: '5859076ade608fbc4e9d3fe2f95e8527de80f8451ecbb1dced54ca84deae0dd6',
      name: 'Coingrig',
      description:
        'A powerful crypto wallet for everyone. Private, secure and open source.',
      homepage: 'https://coingrig.com',
      chains: [
        'eip155:1',
        'eip155:56',
        'eip155:137',
        'eip155:43114',
        'eip155:25'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '18e38e41-a387-4402-ca31-6d2d5eb91100',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/18e38e41-a387-4402-ca31-6d2d5eb91100',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/18e38e41-a387-4402-ca31-6d2d5eb91100',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/18e38e41-a387-4402-ca31-6d2d5eb91100'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/coingrig-crypto-btc-wallet/id1583464451',
        android: 'https://play.google.com/store/apps/details?id=com.coingrig',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'coingrig://', universal: 'https://link.coingrig.com' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Coingrig',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    bae2ab14ef450f307f24a395a3c2766a2ef8a9c0e61856985d23f6445e8db03f: {
      id: 'bae2ab14ef450f307f24a395a3c2766a2ef8a9c0e61856985d23f6445e8db03f',
      name: 'Cryptnox Wallet',
      description: 'IOS app to use our smartcards as hardware wallet via NFC',
      homepage: 'https://cryptnox.com',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '2947b7c8-8966-4485-a98d-25fe43c16700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/2947b7c8-8966-4485-a98d-25fe43c16700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/2947b7c8-8966-4485-a98d-25fe43c16700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/2947b7c8-8966-4485-a98d-25fe43c16700'
      },
      app: {
        browser: 'https://cryptnox.com',
        ios: 'https://apps.apple.com/app/id1583011693',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Cryptnox Wallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    bb88a220ed4dcd3d717ec19b6ac00a672edf92e97ef7c243d35e25ff56a07301: {
      id: 'bb88a220ed4dcd3d717ec19b6ac00a672edf92e97ef7c243d35e25ff56a07301',
      name: 'Boo!',
      description:
        'Boo! stands for BUMooN Operation Orchestrator is a crypto wallet that fully operates under decentralize manner ',
      homepage: 'https://bumoon.io',
      chains: ['eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '310e86aa-6ed2-4d36-2af3-c72eb1771e00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/310e86aa-6ed2-4d36-2af3-c72eb1771e00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/310e86aa-6ed2-4d36-2af3-c72eb1771e00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/310e86aa-6ed2-4d36-2af3-c72eb1771e00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/boo/id1593710564',
        android: 'https://play.google.com/store/apps/details?id=io.bumoon.boo',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: 'https://boo.bumoon.io' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Boo!',
        colors: { primary: '#1d629b', secondary: '#0f88a5' }
      }
    },
    b480598cc4d562de84a9d7a8cd80954b69332d5bdaa7acc10d15156df551590f: {
      id: 'b480598cc4d562de84a9d7a8cd80954b69332d5bdaa7acc10d15156df551590f',
      name: 'FirstWallet',
      description: 'All in one web3.0 wallet',
      homepage: 'https://firstwallet.pro/',
      chains: ['eip155:1', 'eip155:56', 'eip155:137', 'eip155:43114'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '864565a8-66ab-4b50-fda6-1c29128f6b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/864565a8-66ab-4b50-fda6-1c29128f6b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/864565a8-66ab-4b50-fda6-1c29128f6b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/864565a8-66ab-4b50-fda6-1c29128f6b00'
      },
      app: {
        browser: null as any,
        ios: null as any,
        android:
          'https://play.google.com/store/apps/details?id=com.firstWallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'FirstWallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    a92d512c649e87a5acba5885ac03f62662cff1f647c20a63833eb45a71a6f877: {
      id: 'a92d512c649e87a5acba5885ac03f62662cff1f647c20a63833eb45a71a6f877',
      name: 'HUMBL WALLET',
      description:
        'The HUMBL Wallet allows you to buy, sell, receive, store and exchange digital assets such as ETH, BLOCKS, USDC.',
      homepage: 'https://www.search3.com',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '8ff078c4-1edb-452b-b6d9-44e64baa8b00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/8ff078c4-1edb-452b-b6d9-44e64baa8b00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/8ff078c4-1edb-452b-b6d9-44e64baa8b00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/8ff078c4-1edb-452b-b6d9-44e64baa8b00'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/humbl-wallet/id1627171234',
        android:
          'https://play.google.com/store/apps/details?id=com.humbl.wallet.app&hl=en_US&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Humbl Wallet',
        colors: { primary: '#24ace4', secondary: '' }
      }
    },
    '00e39f835988d1bb783b2a0748e18bc6278dec03492d00b0e102a466cd8b3d77': {
      id: '00e39f835988d1bb783b2a0748e18bc6278dec03492d00b0e102a466cd8b3d77',
      name: 'Zelus',
      description: 'The most user-friendly NFT and crypto multichain wallet',
      homepage: 'https://zelus.io',
      chains: ['eip155:1', 'eip155:137', 'eip155:43114', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'aeba2105-6c84-4642-f441-b3f5817ac400',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/aeba2105-6c84-4642-f441-b3f5817ac400',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/aeba2105-6c84-4642-f441-b3f5817ac400',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/aeba2105-6c84-4642-f441-b3f5817ac400'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/us/app/zelus/id1588430343',
        android:
          'https://play.google.com/store/apps/details?id=com.zelus.wallet',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'zeluswallet://', universal: '' },
      desktop: { native: null as any, universal: null as any },
      metadata: { shortName: 'Zelus', colors: { primary: '', secondary: '' } }
    },
    '97a9e82e4b12362eab26130dc28eebe8b76c7ac0d5434ef690dfb8b04b419873': {
      id: '97a9e82e4b12362eab26130dc28eebe8b76c7ac0d5434ef690dfb8b04b419873',
      name: 'Candide',
      description: 'A cross-network wallet for instant transactions',
      homepage: 'https://candidewallet.com',
      chains: ['eip155:1', 'eip155:10', 'eip155:42161'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '08948c71-d1a8-4f62-261a-f5d46d7af800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/08948c71-d1a8-4f62-261a-f5d46d7af800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/08948c71-d1a8-4f62-261a-f5d46d7af800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/08948c71-d1a8-4f62-261a-f5d46d7af800'
      },
      app: {
        browser: 'https://app.candidewallet.com',
        ios: '',
        android: '',
        mac: '',
        windows: '',
        linux: ''
      },
      mobile: { native: '', universal: 'https://app.candidewallet.com' },
      desktop: { native: '', universal: null as any },
      metadata: {
        shortName: 'Candide',
        colors: { primary: '#F8ECE1', secondary: '#1F2546' }
      }
    },
    fe2535202d208d96607955fe18e98d4564838200c3498c8cd1736b46291355f2: {
      id: 'fe2535202d208d96607955fe18e98d4564838200c3498c8cd1736b46291355f2',
      name: 'Safematrix',
      description:
        'Safematrix app is mcp wallet used for signing transactions, viewing operation records, and other functions.',
      homepage: 'https://safematrix.io/',
      chains: ['eip155:1', 'eip155:4', 'eip155:56', 'eip155:97'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '48ea5de9-869a-4994-2402-97afba060900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/48ea5de9-869a-4994-2402-97afba060900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/48ea5de9-869a-4994-2402-97afba060900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/48ea5de9-869a-4994-2402-97afba060900'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/sg/app/safematrix/id1613333481',
        android: 'https://download.safematrix.io/abm/safematrix.apk',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: 'https://safematrix.io/' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Safematrix',
        colors: { primary: '#ff3366', secondary: '' }
      }
    },
    '53dd23581ff2ac3473a517c2995ad41cb214e105ebc99a122bda032051bb54c6': {
      id: '53dd23581ff2ac3473a517c2995ad41cb214e105ebc99a122bda032051bb54c6',
      name: 'Earth Wallet',
      description:
        'Earth Wallet is an open source, self-custody digital asset wallet for Internet Computer, Polygon, Bitcoin and Ethereum.',
      homepage: 'https://www.earthwallet.io/',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'd3f724c4-f99b-476f-10f8-12aa4af13800',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/d3f724c4-f99b-476f-10f8-12aa4af13800',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/d3f724c4-f99b-476f-10f8-12aa4af13800',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/d3f724c4-f99b-476f-10f8-12aa4af13800'
      },
      app: {
        browser: '',
        ios: 'https://apps.apple.com/app/earth-wallet/id1638414929',
        android:
          'https://play.google.com/store/apps/details?id=earth.wallet.app',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'earthwallet:', universal: '' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Earth Wallet',
        colors: { primary: '', secondary: null as any }
      }
    },
    '34c19e0afafeb86ffa75df1c04445b8840450217e79d30abc6def9aa537fb7d6': {
      id: '34c19e0afafeb86ffa75df1c04445b8840450217e79d30abc6def9aa537fb7d6',
      name: 'Wallet 3',
      description: 'Simple. Secure. Powerful.',
      homepage: 'https://wallet3.io',
      chains: [
        'eip155:1',
        'eip155:10',
        'eip155:28',
        'eip155:42161',
        'eip155:43114',
        'eip155:42220',
        'eip155:66',
        'eip155:100',
        'eip155:128',
        'eip155:137',
        'eip155:250',
        'eip155:56',
        'eip155:1666600000',
        'eip155:1284',
        'eip155:1285',
        'eip155:1313161554',
        'eip155:25',
        'eip155:8217',
        'eip155:2020'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '34ab7558-9e64-4436-f4e6-9069f2533d00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/34ab7558-9e64-4436-f4e6-9069f2533d00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/34ab7558-9e64-4436-f4e6-9069f2533d00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/34ab7558-9e64-4436-f4e6-9069f2533d00'
      },
      app: {
        browser: 'https://wallet3.io',
        ios: '',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'wallet3:', universal: '' },
      desktop: { native: 'wallet3:', universal: null as any },
      metadata: {
        shortName: 'Wallet3',
        colors: { primary: '#6186ff', secondary: null as any }
      }
    },
    efda9a34ef0b5de23496abda5eeeb2dcf8cd1497530ac91f58304cba867ae28f: {
      id: 'efda9a34ef0b5de23496abda5eeeb2dcf8cd1497530ac91f58304cba867ae28f',
      name: 'Boba Multisig',
      description:
        'The most trusted platform to manage digital assets on Boba Network',
      homepage: 'https://multisig.boba.network/',
      chains: ['eip155:288'],
      versions: ['1'],
      app_type: 'hybrid',
      image_id: '5acb31bf-151e-4ae6-02bd-f109ca47b600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/5acb31bf-151e-4ae6-02bd-f109ca47b600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/5acb31bf-151e-4ae6-02bd-f109ca47b600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/5acb31bf-151e-4ae6-02bd-f109ca47b600'
      },
      app: {
        browser: 'https://multisig.boba.network/',
        ios: null as any,
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Boba Multisig',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '11c5487e4d8dd8bf32d4c92222363df8296a27307b2531be1e25770365392ecb': {
      id: '11c5487e4d8dd8bf32d4c92222363df8296a27307b2531be1e25770365392ecb',
      name: 'Card Wallet',
      description: 'DeFi payments made easy',
      homepage: 'https://cardstack.com/earn-together',
      chains: ['eip155:100', 'eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '325428cf-c212-4d83-a434-7f48902d2c00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/325428cf-c212-4d83-a434-7f48902d2c00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/325428cf-c212-4d83-a434-7f48902d2c00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/325428cf-c212-4d83-a434-7f48902d2c00'
      },
      app: {
        browser: '',
        ios: 'https://cardstack.com/ios',
        android: 'https://cardstack.com/android',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: 'cardwallet://',
        universal: 'https://wallet.cardstack.com'
      },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Card',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    d99d67379a0af80a39ef8fa79ad477debfe5abb71bd7cf92d12f30d6ffa69506: {
      id: 'd99d67379a0af80a39ef8fa79ad477debfe5abb71bd7cf92d12f30d6ffa69506',
      name: 'GameStop Wallet',
      description:
        'GameStop Wallet is a simple and secure way to get started with Web3. Use your GameStop Wallet to buy, hold, swap. Power to the players!',
      homepage: 'https://wallet.gamestop.com/wallets',
      chains: [],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'c12536e0-dff1-4a1a-6c8f-c7247d6aa200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/c12536e0-dff1-4a1a-6c8f-c7247d6aa200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/c12536e0-dff1-4a1a-6c8f-c7247d6aa200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/c12536e0-dff1-4a1a-6c8f-c7247d6aa200'
      },
      app: {
        browser: 'https://wallet.gamestop.com/wallets',
        ios: 'https://wallet.gamestop.com/wallets',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: '' },
      desktop: { native: null as any, universal: '' },
      metadata: {
        shortName: 'GameStop Wallet',
        colors: { primary: '#000000', secondary: '#FFFFFF' }
      }
    },
    f2dca938b70ea7965ffbc3ef49f3e21701d1fc4f1c543d4b05801c126416466b: {
      id: 'f2dca938b70ea7965ffbc3ef49f3e21701d1fc4f1c543d4b05801c126416466b',
      name: 'FILWallet',
      description: '专注于Web3.0生态的去中心化数字资产钱包',
      homepage: 'https://filwallet.co/',
      chains: ['eip155:1', 'eip155:56'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'f400f6c2-ca6c-487b-654d-e119af247500',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f400f6c2-ca6c-487b-654d-e119af247500',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f400f6c2-ca6c-487b-654d-e119af247500',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f400f6c2-ca6c-487b-654d-e119af247500'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/filwallet-io/id1572930901',
        android: 'https://filwallet.co/',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: 'https://h5.filwallet.co' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'FILWallet',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '23db748bbf7ba1e737921bee04f54d53356e95533e0ed66c39113324873294e7': {
      id: '23db748bbf7ba1e737921bee04f54d53356e95533e0ed66c39113324873294e7',
      name: 'RealT Wallet',
      description:
        'RealT Wallet is a user-friendly, reliable mobile wallet that gives you complete control over your RealTokens and cryptocurrency.',
      homepage: 'https://realt.co',
      chains: ['eip155:1', 'eip155:3', 'eip155:4', 'eip155:5', 'eip155:100'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'bf1f251b-08a5-4b27-ae4a-201a5f698900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/bf1f251b-08a5-4b27-ae4a-201a5f698900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/bf1f251b-08a5-4b27-ae4a-201a5f698900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/bf1f251b-08a5-4b27-ae4a-201a5f698900'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/realt-wallet/id1545585469',
        android:
          'https://play.google.com/store/apps/details?id=co.realt.bridge',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: '', universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: null as any,
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '576c90ceaea34f29ff0104837cf2b2e23d201be43be1433feeb18d375430e1fd': {
      id: '576c90ceaea34f29ff0104837cf2b2e23d201be43be1433feeb18d375430e1fd',
      name: 'PLTwallet',
      description: 'PLTwallet is a wallet for ethereum and PLT',
      homepage: 'https://pltwallet.io/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'a5d9dd15-8cef-42de-8bed-09e01a8b0200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/a5d9dd15-8cef-42de-8bed-09e01a8b0200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/a5d9dd15-8cef-42de-8bed-09e01a8b0200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/a5d9dd15-8cef-42de-8bed-09e01a8b0200'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/id1581055631',
        android:
          'https://play.google.com/store/apps/details?id=com.palettechain.wallet&hl=ja&gl=US',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'pltwallet:', universal: 'https://pltwallet.io/' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'PLTwallet',
        colors: { primary: '#ffffff', secondary: null as any }
      }
    },
    '3b9f67c2c0887f71e4f9ba1bd2bf5b4eb6cda94419abd3f0c5c12931a60928b0': {
      id: '3b9f67c2c0887f71e4f9ba1bd2bf5b4eb6cda94419abd3f0c5c12931a60928b0',
      name: 'Bitski',
      description: 'Most secured mobile wallet',
      homepage: 'https://bitski.com',
      chains: ['eip155:1', 'eip155:4', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '94d94cb5-a94f-47cf-70e6-fe8d3f1c3700',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/94d94cb5-a94f-47cf-70e6-fe8d3f1c3700',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/94d94cb5-a94f-47cf-70e6-fe8d3f1c3700',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/94d94cb5-a94f-47cf-70e6-fe8d3f1c3700'
      },
      app: {
        browser: 'https://wallet.bitski.com',
        ios: 'https://apps.apple.com/us/app/bitski-wallet/id1587199538',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: '',
        universal: 'https://wallet.bitski.com/walletconnect'
      },
      desktop: { native: null as any, universal: '' },
      metadata: {
        shortName: 'Bitski',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '08739356e3fc0efd9498696b7831e8b42b0ad7390af663cd3ba3c30866195b34': {
      id: '08739356e3fc0efd9498696b7831e8b42b0ad7390af663cd3ba3c30866195b34',
      name: 'BCERTin wallet',
      description:
        'The BCERTin wallet comes with a set of amazing tools to manage your business & life with unlimited cloud access',
      homepage: 'https://blockcerts.com',
      chains: ['eip155:1', 'eip155:3', 'eip155:4', 'eip155:5', 'eip155:137'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'e321346d-5ce7-4e75-371e-e4f0bf923900',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/e321346d-5ce7-4e75-371e-e4f0bf923900',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/e321346d-5ce7-4e75-371e-e4f0bf923900',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/e321346d-5ce7-4e75-371e-e4f0bf923900'
      },
      app: {
        browser: null as any,
        ios: null as any,
        android:
          'https://play.google.com/store/apps/details?id=com.blockcerts.BlockCerts&hl=en_US&gl',
        mac: 'https://blockcerts.com/download-mac/?type=mac',
        windows: 'https://blockcerts.com/download-windows/?type=windows',
        linux: 'https://blockcerts.com/download-debian/?type=debian'
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'BCERTin wallet',
        colors: { primary: '#76b53b', secondary: '#495849' }
      }
    },
    fd144d6a46656068f37fb1d59d3caf413651ea5f4a24025c9fd72a6bbe22d834: {
      id: 'fd144d6a46656068f37fb1d59d3caf413651ea5f4a24025c9fd72a6bbe22d834',
      name: 'Bycoin',
      description: 'Professional digital assets management platform',
      homepage: 'https://bycoin.im',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '980b0c5f-353d-4643-1ee8-d9264ec30000',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/980b0c5f-353d-4643-1ee8-d9264ec30000',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/980b0c5f-353d-4643-1ee8-d9264ec30000',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/980b0c5f-353d-4643-1ee8-d9264ec30000'
      },
      app: {
        browser: null as any,
        ios: 'https://itunes.apple.com/us/app/bycoin/id1442183969?l=zh&ls=1&mt=8',
        android: 'https://cdn.bystack.com/bycoin/apk/Bycoin.apk',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: null as any, universal: null as any },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Bycoin',
        colors: { primary: null as any, secondary: null as any }
      }
    },
    '0c5bba82e70a2b62405871af809020a077d110d765c0798eb660ad5d3131b328': {
      id: '0c5bba82e70a2b62405871af809020a077d110d765c0798eb660ad5d3131b328',
      name: 'Edge Wallet',
      description:
        ' Edge is a powerful and easy to use cryptocurrency wallet that allows users to easily control their own private keys.',
      homepage: 'https://edge.app/',
      chains: ['eip155:1'],
      versions: ['1'],
      app_type: 'wallet',
      image_id: 'f601bc29-4298-422f-dbf7-34dac2884f00',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/f601bc29-4298-422f-dbf7-34dac2884f00',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/f601bc29-4298-422f-dbf7-34dac2884f00',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/f601bc29-4298-422f-dbf7-34dac2884f00'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/edge-bitcoin-wallet/id1344400091',
        android:
          'https://play.google.com/store/apps/details?id=co.edgesecure.app',
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: { native: 'edge://wc', universal: 'https://deep.edge.app/wc' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Edge',
        colors: { primary: '#66EDA8', secondary: '#0D2145' }
      }
    },
    f323633c1f67055a45aac84e321af6ffe46322da677ffdd32f9bc1e33bafe29c: {
      id: 'f323633c1f67055a45aac84e321af6ffe46322da677ffdd32f9bc1e33bafe29c',
      name: 'Core',
      description:
        'Core is a free, non-custodial mobile app engineered for users to seamlessly and securely use Web3 powered by Avalanche',
      homepage: 'https://core.app',
      chains: [
        'eip155:43113',
        'eip155:43114',
        'eip155:1',
        'eip155:4',
        'eip155:5'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '35f9c46e-cc57-4aa7-315d-e6ccb2a1d600',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/35f9c46e-cc57-4aa7-315d-e6ccb2a1d600',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/35f9c46e-cc57-4aa7-315d-e6ccb2a1d600',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/35f9c46e-cc57-4aa7-315d-e6ccb2a1d600'
      },
      app: {
        browser: null as any,
        ios: 'https://apps.apple.com/us/app/core-x-mobile/id1570438597',
        android: null as any,
        mac: null as any,
        windows: null as any,
        linux: null as any
      },
      mobile: {
        native: '',
        universal: 'https://cm-universal-links.herokuapp.com'
      },
      desktop: { native: '', universal: null as any },
      metadata: {
        shortName: 'Core',
        colors: { primary: '#000000', secondary: '#FFFFFF' }
      }
    },
    '792fbacfe787d67595dd4eb38ac308e14b3bbc810393db56f477a92e5ac8764b': {
      id: '792fbacfe787d67595dd4eb38ac308e14b3bbc810393db56f477a92e5ac8764b',
      name: 'Assure',
      description: 'A decentralized wallet of digital currency',
      homepage: 'https://www.assurepro.io/',
      chains: [
        'polkadot:91b171bb158e2d3848fa23a9f1c25182',
        'eip155:1',
        'eip155:56',
        'eip155:128'
      ],
      versions: ['1'],
      app_type: 'wallet',
      image_id: '64db7104-c8b7-44ea-e102-11ce87124200',
      image_url: {
        sm: 'https://registry.walletconnect.com/api/v2/logo/sm/64db7104-c8b7-44ea-e102-11ce87124200',
        md: 'https://registry.walletconnect.com/api/v2/logo/md/64db7104-c8b7-44ea-e102-11ce87124200',
        lg: 'https://registry.walletconnect.com/api/v2/logo/lg/64db7104-c8b7-44ea-e102-11ce87124200'
      },
      app: {
        browser: null as any,
        ios: 'http://itunes.apple.com/app/id1604825026',
        android:
          'https://play.google.com/store/apps/details?id=com.neuxs.assure',
        mac: null as any,
        windows: null as any,
        linux: ''
      },
      mobile: { native: 'assure://', universal: 'https://www.assurepro.io' },
      desktop: { native: null as any, universal: null as any },
      metadata: {
        shortName: 'Assure',
        colors: { primary: null as any, secondary: null as any }
      }
    }
  },
  count: 214
}

## useful docs

https://github.com/MetaMask/metamask-extension
https://docs.metamask.io/
https://eips.ethereum.org/EIPS/eip-1193

## useful debugging tips

background.html logs to a different console. access it with with chrome://inspect

## metamask extension notes

setSelectedAddress is called by frontend on createMetaRPCHandler which calls setSelectedAddress on Preferences controller. This updates the preferences ObservableStore, can be listened to by various handlers.

the setupControllerEventSubscriptions function in app/scripts/metamask-controller.js also sets up a subscription to the preferencesController and handles the selectedAddress change but if the address is not already connected, it won't prompt the user to connect it.

A 'notification' event for the new selected address is emitted it through the engine variable, which is a JsonRpcEngine that is connected to a multiplexed duplex stream connected to each runtime connection (content scripts and popup). The receiving end of this is the inpage provider exposed through window.ethereum.

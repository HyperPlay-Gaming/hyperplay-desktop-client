import * as IPDT from '@hyperplay/patcher/src/client'
const { downloadIPDTForOS, patchFolder } = IPDT

export { downloadIPDTForOS, patchFolder }

export const ipfsGateway = import.meta.env.VITE_IPFS_API

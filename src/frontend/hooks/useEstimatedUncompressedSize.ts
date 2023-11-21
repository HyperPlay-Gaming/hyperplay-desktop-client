// TODO: This is a place holder and later should be edited, that we get the actual size from `install_size` property from gameInfo.manifest. Furthermore this will be good as we pre-compute the uncompressed size.
export const useEstimatedUncompressedSize = (
  platform: string,
  compressedSize: number,
  downloadSize: number
) => {
  if (compressedSize !== downloadSize) {
    return compressedSize
  }

  const baseEstimate = compressedSize * 2
  const gapPercentage = platform === 'osx' ? 0.05 : 0.1

  const gap = baseEstimate * gapPercentage

  return baseEstimate + gap
}

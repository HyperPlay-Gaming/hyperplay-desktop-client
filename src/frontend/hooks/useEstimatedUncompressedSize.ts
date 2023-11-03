export const useEstimatedUncompressedSize = (platform: string, compressedSize: number) => {
  const baseEstimate = compressedSize * 2
  const gapPercentage = platform === 'osx' ? 0.05 : 0.1

  const gap = baseEstimate * gapPercentage

  return baseEstimate + gap
}

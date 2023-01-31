export enum ONBOARDING_CONTENT {
  WELCOME = 'WELCOME',
  SCAN = 'SCAN',
  REJECTED = 'REJECTED',
  SUCCESS = 'SUCCESS',
  DOWNLOAD = 'DOWNLOAD',
  IMPORT = 'import'
}

export interface OnboardingModalConfig {
  title: string
  enableBackButton: boolean
  enableCloseButton: boolean
}

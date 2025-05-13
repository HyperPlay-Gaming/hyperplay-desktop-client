import React, { ChangeEvent, FocusEvent, ReactNode } from 'react'
import TextInputField from '../TextInputField'
import SvgButton from '../SvgButton'
import { TextInputProps } from '@hyperplay/ui'

interface TextInputWithIconFieldProps {
  htmlId: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  icon: JSX.Element
  onIconClick: () => void
  afterInput?: ReactNode
  label?: string
  placeholder?: string
  disabled?: boolean
  extraClass?: string
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  inputProps?: TextInputProps & React.RefAttributes<HTMLInputElement>
}

const TextInputWithIconField = (props: TextInputWithIconFieldProps) => {
  return (
    <TextInputField
      {...props}
      inputIcon={
        <SvgButton onClick={props.onIconClick} className="inputIcon">
          {props.icon}
        </SvgButton>
      }
    />
  )
}

export default TextInputWithIconField

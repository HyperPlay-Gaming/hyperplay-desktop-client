import React, { ChangeEvent, FocusEvent, ReactNode, useContext } from 'react'
import classnames from 'classnames'
import ContextProvider from 'frontend/state/ContextProvider'
import './index.scss'
import { TextInput, TextInputProps } from '@hyperplay/ui'

interface TextInputFieldProps {
  htmlId: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  inputIcon?: ReactNode
  afterInput?: ReactNode
  label?: string
  placeholder?: string
  disabled?: boolean
  extraClass?: string
  warning?: ReactNode
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  maxLength?: number
  isError?: boolean
  inputProps?: TextInputProps & React.RefAttributes<HTMLInputElement>
}

const TextInputField = ({
  htmlId,
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  extraClass = '',
  inputIcon,
  afterInput,
  warning,
  onBlur,
  maxLength,
  isError,
  inputProps
}: TextInputFieldProps) => {
  const { isRTL } = useContext(ContextProvider)
  const { className: inputPropsClassName, ...textInputProps } = inputProps ?? {}

  return (
    <div
      className={classnames(`textInputFieldWrapper Field ${extraClass}`, {
        isRTL
      })}
    >
      <TextInput
        type="text"
        id={htmlId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={onBlur}
        maxLength={maxLength}
        className={classnames(
          isError ? 'inputFieldError' : '',
          inputPropsClassName
        )}
        rightSection={inputIcon}
        label={label}
        {...textInputProps}
      />
      {value && warning}
      {afterInput}
    </div>
  )
}

export default TextInputField

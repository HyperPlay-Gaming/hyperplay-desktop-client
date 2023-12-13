import React, { ChangeEvent, FocusEvent, ReactNode, useContext } from 'react'
import classnames from 'classnames'
import ContextProvider from 'frontend/state/ContextProvider'
import './index.scss'

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
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
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
  const { className: inputPropsClassName, ...restInputProps } = inputProps ?? {}

  return (
    <div
      className={classnames(`textInputFieldWrapper Field ${extraClass}`, {
        isRTL
      })}
    >
      {label && <label htmlFor={htmlId}>{label}</label>}
      {inputIcon}
      <input
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
        {...restInputProps}
      />
      {value && warning}
      {afterInput}
    </div>
  )
}

export default TextInputField

export interface InputProp {
  id: string
  labelText: string
  errorText: string
  type: string
  ref: React.RefObject<HTMLInputElement>
  isError: boolean
  onBlur: () => void
  onFocus: () => void
}

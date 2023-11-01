import type { FocusHandler, ChangeHandler } from 'app/types/InputEventHandlers'

export interface OnFocus {
  email: FocusHandler
  password: FocusHandler
  firstName: FocusHandler
  lastName: FocusHandler
  street: FocusHandler
  city: FocusHandler
  state: FocusHandler
  zip: FocusHandler
}

export interface OnChange {
  email: ChangeHandler
  password: ChangeHandler
  firstName: ChangeHandler
  lastName: ChangeHandler
  street: ChangeHandler
  city: ChangeHandler
  state: ChangeHandler
  zip: ChangeHandler
}

interface CreateNewAccountActions {
  onChange: OnChange
  onFocus: OnFocus
}

export default CreateNewAccountActions

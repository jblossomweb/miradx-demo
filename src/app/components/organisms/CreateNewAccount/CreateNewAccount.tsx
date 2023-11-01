import React from 'react'
import {
  BiArrowToLeft as ArrowToLeft,
  BiArrowToRight as ArrowToRight,
  BiUserPlus as UserPlus,
} from 'react-icons/bi'

import pick from 'app/utils/pick'
import Button from 'app/components/atoms/Button'
import Spinner from 'app/components/atoms/Spinner'
import useFormSteps from 'app/hooks/useFormSteps'

import useNewAccountForms from './hooks/useNewAccountForms'
import usePostNewAccount from './hooks/usePostNewAccount'
import useToastEffect from './hooks/useToastEffect'

import UserLoginForm, { UserLoginFields } from './forms/UserLoginForm'
import UserDetailsForm, { UserDetailsFields } from './forms/UserDetailsForm'

import * as Styled from './CreateNewAccount.styled'

export const VALIDATION_DELAY = 200
export const SUBMIT_DELAY = 1000

const CreateNewAccount: React.FC = () => {
  const [step, stepHandlers] = useFormSteps(2)
  const [formState, formActions] = useNewAccountForms(VALIDATION_DELAY)
  const [postState, postNewAccount] = usePostNewAccount(SUBMIT_DELAY)
  const Toaster = useToastEffect(postState)

  const { values, errors, touched } = formState
  const { onFocus, onChange } = formActions

  return (
    <>
      <Toaster />
      <Styled.Title>Create a New Account</Styled.Title>

      {!postState.success && (
        <>
          <Styled.SubTitle>Step {step}</Styled.SubTitle>
          {step === 1 && (
            <UserLoginForm
              values={pick(values, UserLoginFields)}
              errors={pick(errors, UserLoginFields)}
              touched={pick(touched, UserLoginFields)}
              disabled={postState.loading}
              submitLabel="Next Step"
              submitIcon={<ArrowToRight size={24} />}
              onFocus={pick(onFocus, UserLoginFields)}
              onChange={pick(onChange, UserLoginFields)}
              onSubmit={stepHandlers.nextStep}
            />
          )}
          {step === 2 && (
            <UserDetailsForm
              values={pick(values, UserDetailsFields)}
              errors={pick(errors, UserDetailsFields)}
              touched={pick(touched, UserDetailsFields)}
              disabled={postState.loading}
              submitLabel="Create Account"
              submitIcon={
                postState.loading ? (
                  <Spinner size={24} />
                ) : (
                  <UserPlus size={24} />
                )
              }
              secondaryCta={
                <Button
                  label="Previous Step"
                  icon={<ArrowToLeft size={24} />}
                  color="slate"
                  disabled={postState.loading}
                  onClick={stepHandlers.prevStep}
                />
              }
              onFocus={pick(onFocus, UserDetailsFields)}
              onChange={pick(onChange, UserDetailsFields)}
              onSubmit={() => postNewAccount(values)}
            />
          )}
        </>
      )}

      {postState.success && (
        <Styled.Success>
          Thanks, {values.firstName}!<br />
          Your account was created.
        </Styled.Success>
      )}
      {postState.error && (
        <Styled.Error>
          {postState.error.message || 'Something went wrong.'}
        </Styled.Error>
      )}
    </>
  )
}

export default CreateNewAccount

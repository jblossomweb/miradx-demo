import { useState } from 'react'

export type StepHandler = (
  event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
) => void

export interface StepHandlers {
  nextStep: StepHandler
  prevStep: StepHandler
}

const useFormSteps = <StepNumber = number>(
  lastStep: StepNumber,
): [StepNumber, StepHandlers] => {
  const [step, setStep] = useState<StepNumber>(1 as StepNumber)

  const handlers = {
    nextStep: () => {
      const nextStep = (
        step !== lastStep ? (step as number) + 1 : step
      ) as StepNumber
      setStep(nextStep)
    },
    prevStep: () => {
      const prevStep = ((step as number) - 1 || 1) as StepNumber
      setStep(prevStep)
    },
  }

  return [step, handlers]
}

export default useFormSteps

import { CornerDownLeft, Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Input } from './ui'

type RequirementInputProps = {
  userInput: string
  setUserInput: Dispatch<SetStateAction<string>>
  submitted: boolean
  handleRequirementSubmit: () => void
}

const RequirementInput: React.FC<RequirementInputProps> = ({
  userInput,
  setUserInput,
  submitted,
  handleRequirementSubmit: handleSubmit
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <>
      {!submitted && (
        <form
          onSubmit={(e) => {
            // default behavior of form submission reloads the page and processes the input data
            e.preventDefault()
            setIsLoading(true)
            handleSubmit()
          }}
          className="flex flex-col items-center mt-4 space-y-4"
          role="form"
        >
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border p-2 rounded-md w-full"
            placeholder="Type your requirement here..."
            required
          />
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
            <span className="px-1">
              {isLoading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <CornerDownLeft className="size-3.5" />
              )}
            </span>
          </Button>
        </form>
      )}
    </>
  )
}

export default RequirementInput

import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add these required properties to make the interface non-empty
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, errorMessage, ...props }, ref) => {
    return (
      <div>
        <input
          type={type}
          className={`
            w-full 
            px-3 
            py-2 
            border 
            rounded-md 
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className || ''}
          `}
          ref={ref}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
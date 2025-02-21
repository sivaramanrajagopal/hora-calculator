import * as React from "react"

export interface InputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  inputSize?: 'default' | 'sm' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = 'default', ...props }, ref) => {
    const sizeClasses = {
      default: 'py-2 px-3',
      sm: 'py-1 px-2 text-sm',
      lg: 'py-3 px-4 text-lg'
    };

    return (
      <input
        className={`
          flex 
          w-full 
          rounded-md 
          border 
          border-gray-300 
          bg-transparent 
          ${sizeClasses[inputSize]}
          placeholder:text-gray-400 
          focus:outline-none 
          focus:ring-2 
          focus:ring-gray-400 
          focus:ring-offset-2 
          disabled:cursor-not-allowed 
          disabled:opacity-50
          ${className || ''}
        `}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
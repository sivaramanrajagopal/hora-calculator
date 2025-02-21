// components/ui/input.tsx
import * as React from "react"

// Fix the empty interface by adding at least one property or extending a non-empty interface
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add any additional props you need
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
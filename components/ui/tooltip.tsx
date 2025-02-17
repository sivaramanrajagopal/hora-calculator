"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = React.forwardRef(function TooltipTrigger(
  props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return <TooltipPrimitive.Trigger ref={ref} {...props} />
})
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

const TooltipContent = React.forwardRef(function TooltipContent(
  props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        props.className
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
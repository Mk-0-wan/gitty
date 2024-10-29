import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import cx from "classnames";

export function CustomButton({
  children,
  className,
  disabled,
  loading,
  success,
  variant = "primary",
  ...props
}) {
  const [animateSuccess, setAnimateSuccess] = useState(false)

  const baseStyles = "relative flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-500 disabled:to-gray-600 focus:ring-blue-500",
    secondary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:from-gray-500 disabled:to-gray-600 focus:ring-purple-500",
    outline: "border-2 border-gray-700 text-gray-200 hover:bg-gray-800 focus:ring-gray-500"
  }

  const handleSuccess = () => {
    setAnimateSuccess(true)
    setTimeout(() => setAnimateSuccess(false), 2000)
  }

  return (
    <button
      className={cx(
        baseStyles,
        variants[variant],
        (loading || success) && "cursor-not-allowed",
        className
      )}
      disabled={disabled || loading || success}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e)
          handleSuccess()
        }
      }}
      {...props}
    >
      <span className={cx(
        "flex items-center gap-2 transition-opacity",
        (loading || success) && "opacity-0"
      )}>
        {children}
      </span>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin" />
        </span>
      )}

      {success && !loading && (
        <span className={cx(
          "absolute inset-0 flex items-center justify-center transition-transform duration-500",
          animateSuccess && "animate-bounce"
        )}>
          <Check className="h-5 w-5" />
        </span>
      )}
    </button>
  )
}

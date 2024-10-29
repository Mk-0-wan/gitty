import { PropTypes } from "prop-types";
import { useEffect } from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiLoader2Fill,
} from 'react-icons/ri';

const variants = {
  success: {
    icon: <RiCheckboxCircleFill className="text-green-500" />,
    className: 'border border-green-600/50 text-green-800 shrink-0',
  },
  error: {
    icon: <RiCloseCircleFill className="text-red-500" />,
    className: 'border-thin border-red-600/50 text-red-800 shrink-0',
  },
  info: {
    icon: <RiInformationFill className="text-blue-500" />,
    className: 'border border-blue-700/50 text-blue-800 shrink-0',
  },
  warning: {
    icon: <RiErrorWarningFill className="text-yellow-500" />,
    className: 'border border-yellow-700/50 text-yellow-800 shrink-0',
  },
  loading: {
    icon: <RiLoader2Fill className="animate-spin text-gray-500" />,
    className: 'border border-gray-100/50 text-gray-800 shrink-0',
  },
};


const MyToast = ({
  variant = 'info',
  title,
  description,
  actionLabel,
  onActionClick,
  onClose,
  disableDismiss = false,
  autoDismiss = true,
  dismissTime = 3000,
}) => {
  const { icon, className } = variants[variant];

  // Auto-dismiss logic with Radix Toast timeout
  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(onClose, dismissTime);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissTime, onClose]);

  return (
    <ToastPrimitives.Root
      className={
        `flex h-fit min-h-16 w-full font-geist overflow-hidden p-1 rounded-md shadow-md border text-sm bg-[#090E1A] ${!disableDismiss || actionLabel ? "border-l border-gray-50" : ""} ${className} `
      }
      duration={autoDismiss ? dismissTime : undefined}
      onOpenChange={(open) => !open && onClose()}
    >
      <div className="flex flex-1 item-start gap-3 p-4">{icon}
        <div className="flex flex-col gap-1 flex-1">
          {title &&
            <ToastPrimitives.Title className="font-semibold text-gray-300 text-sm">
              {title}
            </ToastPrimitives.Title>}
          {description &&
            <ToastPrimitives.Description className=' text-sm dark:text-gray-400'>
              {description}
            </ToastPrimitives.Description>}
        </div>
      </div>

      <div className='flex flex-col'>
        {actionLabel && (
          <ToastPrimitives.Action
            className={`text-sm font-medium text-blue-600 flex flex-1 items-center justify-center px-6 tex-sm transition-colors ${variant === "error" ? "text-red-600" : ""}`}
            altText="Take action"
            onClick={onActionClick}
          >
            {actionLabel}
          </ToastPrimitives.Action>
        )}
        {!disableDismiss && (
          <ToastPrimitives.Close className="flex flex-1 items-center justify-center px-6 text-sm transition-colors cursor-pointer text-gray-500" aria-label="Close">
            ✕
          </ToastPrimitives.Close>
        )}
      </div>
    </ToastPrimitives.Root >
  );
};

MyToast.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  onActionClick: PropTypes.func,
  onClose: PropTypes.func,
  disableDismiss: PropTypes.bool,
  autoDismiss: PropTypes.boolen,
  dismissTime: PropTypes.number,
}

export default MyToast;

import { createContext, useContext, useState } from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { PropTypes } from "prop-types";
import MyToast from './ToastProvider';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts([...toasts, { id, ...toast }]);
    return id;
  };

  const removeToast = (id) => setToasts(toasts.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastPrimitives.Provider>
        {children}
        <ToastPrimitives.Viewport className="fixed right-0 top-0 z-[9999] m-0 flex w-full max-w-[100vw] list-none flex-col gap-2 p-[var(--viewport-padding)] [--viewport-padding:_15px] sm:max-w-md sm:gap-4" />
        {toasts.map((toast) => (
          <MyToast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

export const useToast = () => useContext(ToastContext);


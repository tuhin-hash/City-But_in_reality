import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 px-4 py-3 bg-[#202420] border border-[#2A2E2A] shadow-xl min-w-[280px] max-w-sm pointer-events-auto"
          >
            {toast.type === 'success' && <CheckCircle size={14} className="text-[#C6FF54] shrink-0" />}
            {toast.type === 'error' && <AlertCircle size={14} className="text-[#FF5E5E] shrink-0" />}
            {toast.type === 'warning' && <AlertCircle size={14} className="text-[#FF8B45] shrink-0" />}
            {toast.type === 'info' && <Info size={14} className="text-[#79B8FF] shrink-0" />}
            <span className="text-xs text-[#F1F0E8] flex-1 leading-relaxed">{toast.message}</span>
            <button onClick={() => onRemove(toast.id)} className="text-[#969B92] hover:text-[#F1F0E8] shrink-0">
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Context
import { createContext, useContext, useState, useCallback } from 'react';

interface ToastContextType {
  addToast: (message: string, type?: ToastMessage['type']) => void;
}

export const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

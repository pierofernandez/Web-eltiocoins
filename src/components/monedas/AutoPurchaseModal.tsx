import { motion, AnimatePresence } from 'framer-motion';
import { AutoPurchaseForm } from './AutoPurchaseForm';
import { AutoPurchaseFormValues } from '@/lib/validators';

interface AutoPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AutoPurchaseFormValues) => void;
}

export const AutoPurchaseModal = ({ open, onClose, onSubmit }: AutoPurchaseModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#00FF87]/20 bg-[#0A0A0A] p-4 shadow-2xl sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <AutoPurchaseForm
            onSubmit={onSubmit}
            submitLabel="Añadir al carrito y pagar"
            showCancel
            onCancel={onClose}
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

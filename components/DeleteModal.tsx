import { Product } from '@/lib/types';
import { Trash2 } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: Product | null;
};

export default function DeleteModal({ isOpen, onClose, onConfirm, product }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-white to-[#F3F6FC] dark:from-[#1a1a2e] dark:to-[#16213e] border border-gray-200 dark:border-white/20 rounded-2xl p-7 w-full max-w-sm text-center shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="w-14 h-14 bg-red-100 dark:bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Trash2 size={28} className="text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-2">Delete Product?</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
          Are you sure you want to delete <span className="text-gray-800 dark:text-white font-medium">&ldquo;{product?.name}&rdquo;</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white text-sm font-semibold transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
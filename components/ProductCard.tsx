import { Product } from '@/lib/types';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  const badgeStyles = {
    'in-stock': 'bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30',
    'low-stock': 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30',
    'out-of-stock': 'bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30',
  };

  const badgeLabels = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
  };

  return (
    <div className="dark:bg-[#374151] bg-[#F3F4F6] border dark:border-[#4B5563] border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-40 dark:bg-[#4B5563] bg-[#E5E7EB] flex items-center justify-center text-4xl">
            🛍
          </div>
        )}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full font-mono ${badgeStyles[product.status]}`}>
          {badgeLabels[product.status]}
        </span>
      </div>

      <div className="p-4">
        <h3 className="dark:text-white text-[#1F2937] font-semibold text-sm truncate mb-1">{product.name}</h3>
        <p className="dark:text-blue-400 text-[#3B82F6] text-lg font-semibold font-mono mb-2">
          LKR {Number(product.price).toFixed(2)}
        </p>
        <p className="dark:text-gray-400 text-[#6B7280] text-xs leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 dark:bg-white/10 bg-[#E5E7EB] dark:border-white/10 border-[#D1D5DB] border rounded-xl dark:text-gray-300 text-[#1F2937] text-xs font-medium dark:hover:bg-white/20 hover:bg-[#D1D5DB] transition-all"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
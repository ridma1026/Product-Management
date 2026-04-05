'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  editingProduct: Product | null;
};

export default function ProductModal({ isOpen, onClose, onSave, editingProduct }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState<Product['status']>('in-stock');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setName(''); setPrice(''); setDescription('');
    setImage(''); setStatus('in-stock'); setCategory('');
    setErrors({});
  };

  useEffect(() => {
    if (!isOpen) return;
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(String(editingProduct.price));
      setDescription(editingProduct.description);
      setImage(editingProduct.image || '');
      setStatus(editingProduct.status);
      setCategory(editingProduct.category);
      setErrors({});
    } else {
      resetForm();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Product name is required.';
    if (!price || isNaN(Number(price)) || Number(price) < 0) errs.price = 'Enter a valid price.';
    if (!description.trim()) errs.description = 'Description is required.';
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave({ name, price: parseFloat(price), description, image, status, category: category || 'General' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-white to-[#F3F6FC] dark:from-[#1a1a2e] dark:to-[#16213e] border border-gray-200 dark:border-white/10 rounded-2xl p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#A5B4FC] to-[#C7D2FE] dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider block mb-2 font-semibold">
              Product Name
            </label>
            <input
              className={`w-full bg-white dark:bg-[#22222f] border rounded-xl px-4 py-2.5 text-gray-700 dark:text-white text-sm outline-none focus:border-[#A5B4FC] dark:focus:border-violet-500 transition-all placeholder:text-gray-400 ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
              placeholder="e.g. Wireless Headphones"
              value={name} 
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider block mb-2 font-semibold">
              Price (LKR)
            </label>
            <input
              type="number" min="0" step="0.01"
              className={`w-full bg-white dark:bg-[#22222f] border rounded-xl px-4 py-2.5 text-gray-700 dark:text-white text-sm outline-none focus:border-[#A5B4FC] dark:focus:border-violet-500 transition-all placeholder:text-gray-400 ${errors.price ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
              placeholder="e.g. 12999.00"
              value={price} 
              onChange={e => { setPrice(e.target.value); setErrors(p => ({ ...p, price: '' })); }}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider block mb-2 font-semibold">
            Description
          </label>
          <textarea
            className={`w-full bg-white dark:bg-[#22222f] border rounded-xl px-4 py-2.5 text-gray-700 dark:text-white text-sm outline-none focus:border-[#A5B4FC] dark:focus:border-violet-500 transition-all placeholder:text-gray-400 resize-none h-24 ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
            placeholder="Enter product description..."
            value={description} 
            onChange={e => { setDescription(e.target.value); setErrors(p => ({ ...p, description: '' })); }}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider block mb-2 font-semibold">
            Image URL (optional)
          </label>
          <div className="flex gap-3 items-start">
            <div className="w-24 h-24 flex-shrink-0 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#22222f] overflow-hidden flex items-center justify-center">
              {image ? (
                <img src={image} alt="preview" className="w-full h-full object-cover" onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
              ) : (
                <span className="text-3xl">🖼️</span>
              )}
            </div>
            <input
              className="flex-1 bg-white dark:bg-[#22222f] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-700 dark:text-white text-sm outline-none focus:border-[#A5B4FC] dark:focus:border-violet-500 transition-all placeholder:text-gray-400"
              placeholder="https://example.com/image.jpg"
              value={image} 
              onChange={e => setImage(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider block mb-2 font-semibold">
              Stock Status
            </label>
            <select
              className="w-full bg-white dark:bg-[#22222f] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-700 dark:text-white text-sm outline-none focus:border-[#A5B4FC] dark:focus:border-violet-500 transition-all"
              value={status} 
              onChange={e => setStatus(e.target.value as Product['status'])}
            >
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider block mb-2 font-semibold">
              Category
            </label>
            <input
              className="w-full bg-white dark:bg-[#22222f] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-700 dark:text-white text-sm outline-none focus:border-[#A5B4FC] dark:focus:border-violet-500 transition-all placeholder:text-gray-400"
              placeholder="e.g. Electronics"
              value={category} 
              onChange={e => setCategory(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="flex-1 py-2.5 bg-gradient-to-r from-[#A5B4FC] to-[#C7D2FE] hover:from-[#B8C4FC] hover:to-[#D6E0F5] dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 rounded-xl text-white text-sm font-semibold transition-all shadow-md"
          >
            {editingProduct ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
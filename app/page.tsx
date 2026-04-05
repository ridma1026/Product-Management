'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/lib/types';
import { getProducts, saveProducts } from '@/lib/storage';
import Sidebar from '@/components/Sidebar';
import StatsBar from '@/components/StatsBar';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import DeleteModal from '@/components/DeleteModal';
import Toast from '@/components/Toast';
import ThemeToggle from '@/components/ThemeToggle';
import { Search, Plus } from 'lucide-react';

export default function Home() {
  // STATE 
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState({ 
    message: '', 
    type: 'success' as 'success' | 'error' | 'info', 
    visible: false 
  });

  //  LOAD DATA
  useEffect(() => {
    const stored = getProducts();
    if (stored.length > 0) {
      setProducts(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TOAST NOTIFICATIONS 
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, visible: true });
  };

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  // CREATE & UPDATE PRODUCT 
  const handleSave = (data: Omit<Product, 'id'>) => {
    let updated: Product[];
    if (editingProduct) {
      // Update existing
      updated = products.map(p => 
        p.id === editingProduct.id ? { ...data, id: editingProduct.id } : p
      );
      showToast('Product updated successfully!', 'success');
    } else {
      // Create new
      const newProduct = { ...data, id: Date.now() };
      updated = [...products, newProduct];
      showToast('Product added successfully!', 'success');
    }
    setProducts(updated);
    saveProducts(updated);
    setEditingProduct(null);
  };

  //  EDIT PRODUCT 
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  //  DELETE PRODUCT 
  const handleDeleteClick = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    const updated = products.filter(p => p.id !== deletingProduct.id);
    setProducts(updated);
    saveProducts(updated);
    setIsDeleteModalOpen(false);
    setDeletingProduct(null);
    showToast('Product deleted successfully.', 'error');
  };

  //  SEARCH FILTER 
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-linear-to-br from-white via-[#E8EEF9] to-[#D6E0F5] dark:bg-linear-to-br dark:from-[#0f0c29] dark:via-[#1a1a3e] dark:to-[#24243e]">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-[#A5B4FC] to-[#C7D2FE] dark:bg-linear-to-r dark:from-[#818cf8] dark:to-[#a78bfa] bg-clip-text text-transparent">
              Products
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Create, update, and manage your products in one place.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* Search */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder:text-gray-400 w-48"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            {/* Add Button */}
            <button
              onClick={() => { 
                setEditingProduct(null); 
                setIsProductModalOpen(true); 
              }}
              className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-[#A5B4FC] to-[#C7D2FE] hover:from-[#B8C4FC] hover:to-[#D6E0F5] dark:bg-linear-to-r dark:from-[#6366f1] dark:to-[#8b5cf6] dark:hover:from-[#7c3aed] dark:hover:to-[#a78bfa] rounded-xl text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 pb-8">
          <StatsBar products={products} />

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white/40 backdrop-blur-sm dark:bg-gray-900/40 rounded-2xl">
              <p className="text-5xl mb-4">🛍</p>
              <p className="text-lg dark:text-white text-gray-700 mb-1 font-semibold">
                {search ? 'No products found.' : 'No products yet.'}
              </p>
              <p className="text-sm dark:text-gray-400 text-gray-500">
                {search 
                  ? 'Try a different search term.' 
                  : 'Click "+ Add Product" to get started.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => { 
          setIsProductModalOpen(false); 
          setEditingProduct(null); 
        }}
        onSave={handleSave}
        editingProduct={editingProduct}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => { 
          setIsDeleteModalOpen(false); 
          setDeletingProduct(null); 
        }}
        onConfirm={handleConfirmDelete}
        product={deletingProduct}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onHide={hideToast}
      />
    </div>
  );
}
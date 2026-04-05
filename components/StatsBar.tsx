import { Product } from '@/lib/types';
import { Package, CheckCircle, XCircle, Wallet } from 'lucide-react';

type Props = {
  products: Product[];
};

export default function StatsBar({ products }: Props) {
  const total = products.length;
  const inStock = products.filter(p => p.status === 'in-stock').length;
  const outOfStock = products.filter(p => p.status === 'out-of-stock').length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);

  const stats = [
    { label: 'Total Products', value: total, icon: Package, gradient: 'from-blue-500 to-blue-600' },
    { label: 'In Stock', value: inStock, icon: CheckCircle, gradient: 'from-green-500 to-emerald-600' },
    { label: 'Out of Stock', value: outOfStock, icon: XCircle, gradient: 'from-red-500 to-rose-600' },
    {
        label: 'Total Value',
        value: `LKR ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        icon: Wallet,
        gradient: 'from-purple-500 to-indigo-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon size={28} />
            <span className="text-3xl font-bold">{stat.value}</span>
          </div>
          <p className="text-white/90 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
import { LayoutDashboard, Package, Heart, Grid, BarChart3, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#9BB8F0] to-[#B5C8F5] dark:bg-gradient-to-b dark:from-[#1e1b4b] dark:to-[#2e1a5e] rounded-r-3xl shadow-xl flex flex-col">
      <div className="p-6 border-b border-white/40 dark:border-white/10">
        <div className="w-10 h-10 bg-white/35 dark:bg-white/20 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
          <Package className="text-white text-xl" size={20} />
        </div>
        <p className="text-white font-bold text-lg">Product Studio</p>
        <p className="text-white/85 dark:text-white/70 text-xs mt-1">Manage. Organize. Grow.</p>
      </div>

      <nav className="p-4 flex-1">
        {[
          { icon: LayoutDashboard, label: 'Dashboard', active: false },
          { icon: Package, label: 'Products', active: true },
          { icon: Heart, label: 'Favorites', active: false },
          { icon: Grid, label: 'Categories', active: false },
          { icon: BarChart3, label: 'Analytics', active: false },
          { icon: Settings, label: 'Settings', active: false },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl mb-2 cursor-pointer text-sm font-medium transition-all duration-200
              ${item.active
                ? 'bg-white/30 dark:bg-white/15 text-white shadow-md backdrop-blur-sm'
                : 'text-white/85 dark:text-white/70 hover:bg-white/25 dark:hover:bg-white/10 hover:text-white'
              }`}
          >
            <item.icon size={18} />
            {item.label}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/40 dark:border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-white/35 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm font-semibold">R</div>
          <div>
            <p className="text-white text-sm font-medium">Riya</p>
            <p className="text-white/75 dark:text-white/60 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
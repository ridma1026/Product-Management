import { useEffect } from 'react';
import { CheckCircle, Trash2, Info } from 'lucide-react';

type Props = {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onHide: () => void;
};

export default function Toast({ message, type, isVisible, onHide }: Props) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  const styles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-violet-600',
  };

  const icons = {
    success: <CheckCircle size={18} />,
    error: <Trash2 size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl text-white text-sm font-medium shadow-lg transition-all duration-300 ${styles[type]} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
      {icons[type]}
      {message}
    </div>
  );
}
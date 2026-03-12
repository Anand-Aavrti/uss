'use client';

import Icon from '@/components/ui/AppIcon';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0B1220]/90 backdrop-blur-2xl shadow-2xl shadow-[#0EA5E9]/20 p-6 animate-fadeIn">
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center shadow-lg">
            <Icon name="ExclamationTriangleIcon" size={28} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-white mb-2">{title}</h2>

        {/* Description */}
        <p className="text-sm text-white/60 text-center mb-6 leading-relaxed">{description}</p>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 transition-all"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] hover:opacity-90 transition-all shadow-lg shadow-[#0EA5E9]/20"
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}

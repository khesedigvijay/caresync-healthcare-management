import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  Calendar, 
  Truck, 
  Droplet, 
  AlertTriangle, 
  X,
  ExternalLink
} from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    currentUser, 
    setActiveTab 
  } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const relevantNotifications = notifications.filter(n => {
    if (!currentUser) return true;
    if (n.roleTarget === 'all') return true;
    return n.roleTarget === currentUser.role;
  });

  const filtered = filter === 'unread' 
    ? relevantNotifications.filter(n => !n.read) 
    : relevantNotifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-sky-600" />;
      case 'ambulance':
        return <Truck className="w-4 h-4 text-indigo-600" />;
      case 'blood':
        return <Droplet className="w-4 h-4 text-rose-600" />;
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleItemClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.linkTab) {
      setActiveTab(notif.linkTab);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Notifications</h3>
                <p className="text-xs text-slate-500">Live operational alerts & status changes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Filters */}
          <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between text-xs">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All ({relevantNotifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === 'unread'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Unread ({relevantNotifications.filter(n => !n.read).length})
              </button>
            </div>

            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-700">No notifications</p>
                <p className="text-xs text-slate-500 mt-1">You're all caught up with clinic updates.</p>
              </div>
            ) : (
              filtered.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleItemClick(notif)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-white border-slate-200/80 hover:border-slate-300'
                      : 'bg-sky-50/60 border-sky-200/90 shadow-2xs hover:bg-sky-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-2xs shrink-0 border border-slate-100">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      {notif.linkTab && (
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-800">
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-center text-slate-500">
            CareSync Administrative Alert Dispatcher
          </div>
        </div>
      </div>
    </div>
  );
};

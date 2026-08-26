import { useState } from 'react';
import {
  User,
  Mail,
  MapPin,
  CreditCard,
  Wifi,
  Tv,
  Phone,
  RefreshCw,
  CheckCircle2,
  Home,
  ChevronRight,
  Zap,
  Settings,
  Bell,
  Shield,
  LogOut,
} from 'lucide-react';
import { accountInfo, type Page } from '@/data/supportData';

interface AccountPageProps {
  onNavigate: (page: Page) => void;
}

export function AccountPage({ onNavigate }: AccountPageProps) {
  const [restartState, setRestartState] = useState<'idle' | 'sending' | 'restarting' | 'done'>('idle');
  const [autopay, setAutopay] = useState(accountInfo.autopay);

  const handleRestart = () => {
    setRestartState('sending');
    setTimeout(() => setRestartState('restarting'), 1500);
    setTimeout(() => setRestartState('done'), 5000);
    setTimeout(() => setRestartState('idle'), 9000);
  };

  const serviceIcons = [
    { match: 'Internet', icon: Wifi },
    { match: 'TV', icon: Tv },
    { match: 'Phone', icon: Phone },
  ];

  const getServiceIcon = (service: string) => {
    const match = serviceIcons.find((s) => service.includes(s.match));
    return match ? match.icon : Zap;
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-xfinity-gray-700 bg-xfinity-gray-950">
        <div className="section-container flex items-center gap-2 py-3 text-sm text-xfinity-gray-400">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            Support
          </button>
          <ChevronRight className="h-4 w-4 text-xfinity-gray-600" />
          <span className="text-white">My Account</span>
        </div>
      </div>

      {/* Account Header */}
      <section className="border-b border-xfinity-gray-700 bg-gradient-to-b from-xfinity-gray-900 to-xfinity-black">
        <div className="section-container py-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-red-dark text-2xl font-bold text-white">
                {accountInfo.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{accountInfo.name}</h1>
                <p className="mt-0.5 text-sm text-xfinity-gray-400">{accountInfo.email}</p>
                <p className="mt-0.5 text-xs text-xfinity-gray-500">
                  Account #{accountInfo.accountId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn-ghost flex items-center gap-1.5">
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button className="btn-ghost flex items-center gap-1.5">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-container grid grid-cols-1 gap-6 py-8 lg:grid-cols-[1fr_360px]">
        {/* Left column - main content */}
        <div className="flex flex-col gap-6">
          {/* Balance card */}
          <div className="card overflow-hidden">
            <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-xfinity-gray-400">
                  Current Balance
                </p>
                <p className="mt-1 text-3xl font-bold text-white">${accountInfo.balance.toFixed(2)}</p>
                <p className="mt-1 text-sm text-xfinity-gray-400">
                  Due {accountInfo.dueDate}
                  {autopay && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent-green/15 px-2 py-0.5 text-xs font-medium text-accent-green-light">
                      <CheckCircle2 className="h-3 w-3" />
                      Auto-Pay On
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onNavigate('billing')}
                  className="btn-primary"
                >
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </button>
                <button
                  onClick={() => onNavigate('billing')}
                  className="btn-secondary"
                >
                  View Bill
                </button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="card p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Your Services</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {accountInfo.services.map((service, idx) => {
                const ServiceIcon = getServiceIcon(service);
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-xfinity-gray-700 bg-xfinity-gray-850 p-4"
                  >
                    <div className="rounded-lg bg-xfinity-gray-800 p-2.5">
                      <ServiceIcon className="h-5 w-5 text-brand-red" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{service}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-accent-green-light">
                        <CheckCircle2 className="h-3 w-3" />
                        Active
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Equipment / Self-service actions */}
          <div className="card p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Self-Service Tools</h2>

            {/* Restart equipment */}
            <div className="rounded-xl border border-xfinity-gray-700 bg-xfinity-gray-850 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-xfinity-gray-800 p-2.5">
                    <RefreshCw className="h-5 w-5 text-brand-red" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Restart Your Equipment</p>
                    <p className="mt-1 text-xs text-xfinity-gray-400">
                      Send a remote restart signal to your Xfinity Gateway. This takes about 5
                      minutes and will briefly interrupt your service.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRestart}
                  disabled={restartState !== 'idle'}
                  className="shrink-0 rounded-full bg-brand-red px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-brand-red-hover disabled:opacity-50"
                >
                  {restartState === 'idle' && 'Restart'}
                  {restartState === 'sending' && 'Sending...'}
                  {restartState === 'restarting' && 'Restarting...'}
                  {restartState === 'done' && 'Done!'}
                </button>
              </div>

              {/* Progress indicator */}
              {restartState !== 'idle' && (
                <div className="mt-4 animate-slide-down">
                  {restartState === 'sending' && (
                    <div className="flex items-center gap-2 text-xs text-xfinity-gray-400">
                      <div className="h-3 w-3 animate-spin rounded-full border border-xfinity-gray-500 border-t-brand-red" />
                      Sending restart signal to your Gateway...
                    </div>
                  )}
                  {restartState === 'restarting' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-xfinity-gray-400">
                        <div className="h-3 w-3 animate-spin rounded-full border border-xfinity-gray-500 border-t-brand-red" />
                        Your Gateway is restarting. This takes 2–5 minutes.
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-xfinity-gray-700">
                        <div
                          className="h-full rounded-full bg-brand-red transition-all duration-[3500ms] ease-linear"
                          style={{ width: restartState === 'restarting' ? '100%' : '0%' }}
                        />
                      </div>
                    </div>
                  )}
                  {restartState === 'done' && (
                    <div className="flex items-center gap-2 text-xs text-accent-green-light">
                      <CheckCircle2 className="h-4 w-4" />
                      Your Gateway has been restarted successfully. Your services should be working
                      normally now.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Other quick actions */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { icon: Tv, label: 'Refresh TV Box', desc: 'Fix missing channels' },
                { icon: Shield, label: 'Manage xFi Security', desc: 'View network protection' },
                { icon: Bell, label: 'Notification Settings', desc: 'Manage alerts' },
                { icon: Settings, label: 'Device Settings', desc: 'Configure your devices' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="card card-hover flex items-start gap-3 p-4 text-left"
                >
                  <div className="rounded-lg bg-xfinity-gray-800 p-2">
                    <action.icon className="h-4 w-4 text-xfinity-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{action.label}</p>
                    <p className="mt-0.5 text-xs text-xfinity-gray-400">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - account details */}
        <div className="flex flex-col gap-6">
          {/* Account info */}
          <div className="card p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
              Account Details
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 shrink-0 text-xfinity-gray-500" />
                <div>
                  <p className="text-xs text-xfinity-gray-500">Account Holder</p>
                  <p className="text-sm text-white">{accountInfo.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-xfinity-gray-500" />
                <div>
                  <p className="text-xs text-xfinity-gray-500">Email</p>
                  <p className="text-sm text-white">{accountInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-xfinity-gray-500" />
                <div>
                  <p className="text-xs text-xfinity-gray-500">Service Address</p>
                  <p className="text-sm text-white">{accountInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 shrink-0 text-xfinity-gray-500" />
                <div>
                  <p className="text-xs text-xfinity-gray-500">Current Plan</p>
                  <p className="text-sm text-white">{accountInfo.plan}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-pay card */}
          <div className="card p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
              Auto-Pay
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">
                  {autopay ? 'Auto-Pay is active' : 'Auto-Pay is off'}
                </p>
                <p className="mt-0.5 text-xs text-xfinity-gray-400">
                  {autopay
                    ? `Next payment on ${accountInfo.dueDate}`
                    : 'Enroll to never miss a payment'}
                </p>
              </div>
              <button
                onClick={() => setAutopay(!autopay)}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  autopay ? 'bg-accent-green' : 'bg-xfinity-gray-600'
                }`}
                aria-label="Toggle auto-pay"
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform duration-200 ${
                    autopay ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Contact us */}
          <div className="card overflow-hidden">
            <div className="border-b border-xfinity-gray-700 px-5 py-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
                Need Help?
              </h2>
            </div>
            <div className="p-5">
              <p className="mb-3 text-sm text-xfinity-gray-300">
                Our support team is available 24/7.
              </p>
              <a
                href="tel:+18662403377"
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-red-hover active:scale-95"
              >
                <Phone className="h-4 w-4" />
                Call (+1) 866-240-3377
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="card overflow-hidden">
            <button
              onClick={() => onNavigate('billing')}
              className="card-hover flex w-full items-center justify-between p-4 text-left"
            >
              <span className="text-sm font-medium text-white">View full bill</span>
              <ChevronRight className="h-5 w-5 text-brand-red" />
            </button>
            <div className="border-t border-xfinity-gray-700" />
            <button
              onClick={() => onNavigate('outage')}
              className="card-hover flex w-full items-center justify-between p-4 text-left"
            >
              <span className="text-sm font-medium text-white">Check outage status</span>
              <ChevronRight className="h-5 w-5 text-brand-red" />
            </button>
            <div className="border-t border-xfinity-gray-700" />
            <button
              onClick={() => onNavigate('home')}
              className="card-hover flex w-full items-center justify-between p-4 text-left"
            >
              <span className="text-sm font-medium text-white">Browse support articles</span>
              <ChevronRight className="h-5 w-5 text-brand-red" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

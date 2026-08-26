import { useState } from 'react';
import {
  MapPin,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Bell,
  BellOff,
  Clock,
  Home,
  ChevronRight,
  RefreshCw,
  Map as MapIcon,
} from 'lucide-react';
import type { Page } from '@/data/supportData';

interface OutagePageProps {
  onNavigate: (page: Page) => void;
}

interface OutagePin {
  id: string;
  x: number;
  y: number;
  status: 'good' | 'degraded' | 'outage';
  area: string;
  details: string;
  affectedServices: string[];
  estimatedRestoration?: string;
}

const mockPins: OutagePin[] = [
  {
    id: 'pin1',
    x: 20,
    y: 30,
    status: 'good',
    area: 'Downtown Portland — 97201',
    details: 'All services operating normally.',
    affectedServices: [],
  },
  {
    id: 'pin2',
    x: 45,
    y: 25,
    status: 'degraded',
    area: 'Northeast Portland — 97212',
    details: 'Intermittent connectivity issues reported. Engineering teams are investigating.',
    affectedServices: ['Internet'],
    estimatedRestoration: 'Today by 6:00 PM',
  },
  {
    id: 'pin3',
    x: 62,
    y: 55,
    status: 'outage',
    area: 'Southeast Portland — 97215',
    details: 'Service outage detected. A fiber cut has been identified and crews are on-site.',
    affectedServices: ['Internet', 'Xfinity TV', 'Home Phone'],
    estimatedRestoration: 'Today by 8:00 PM',
  },
  {
    id: 'pin4',
    x: 35,
    y: 65,
    status: 'good',
    area: 'Beaverton — 97005',
    details: 'All services operating normally.',
    affectedServices: [],
  },
  {
    id: 'pin5',
    x: 75,
    y: 40,
    status: 'degraded',
    area: 'Gresham — 97030',
    details: 'Slow internet speeds reported in some areas. Capacity upgrades in progress.',
    affectedServices: ['Internet'],
    estimatedRestoration: 'Today by 7:00 PM',
  },
  {
    id: 'pin6',
    x: 15,
    y: 50,
    status: 'good',
    area: 'Hillsboro — 97124',
    details: 'All services operating normally.',
    affectedServices: [],
  },
  {
    id: 'pin7',
    x: 80,
    y: 70,
    status: 'good',
    area: 'Lake Oswego — 97034',
    details: 'All services operating normally.',
    affectedServices: [],
  },
  {
    id: 'pin8',
    x: 50,
    y: 75,
    status: 'outage',
    area: 'Milwaukie — 97267',
    details: 'Total service outage due to equipment failure. Replacement hardware is being deployed.',
    affectedServices: ['Internet', 'Xfinity TV'],
    estimatedRestoration: 'Today by 9:00 PM',
  },
];

export function OutagePage({ onNavigate }: OutagePageProps) {
  const [zipCode, setZipCode] = useState('');
  const [selectedPin, setSelectedPin] = useState<OutagePin | null>(null);
  const [searchedArea, setSearchedArea] = useState<OutagePin | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(false);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length < 5) return;
    setIsChecking(true);
    setSelectedPin(null);
    setTimeout(() => {
      const match = mockPins.find((p) => p.area.includes(zipCode)) || mockPins[0];
      setSearchedArea(match);
      setSelectedPin(match);
      setIsChecking(false);
    }, 1800);
  };

  const statusConfig = {
    good: {
      icon: CheckCircle2,
      color: 'text-accent-green-light',
      bg: 'bg-accent-green/15',
      border: 'border-accent-green/40',
      label: 'Good Service',
      pinColor: 'bg-accent-green',
      ringColor: 'ring-accent-green/40',
    },
    degraded: {
      icon: AlertTriangle,
      color: 'text-accent-yellow',
      bg: 'bg-accent-yellow/15',
      border: 'border-accent-yellow/40',
      label: 'Degraded Service',
      pinColor: 'bg-accent-yellow',
      ringColor: 'ring-accent-yellow/40',
    },
    outage: {
      icon: XCircle,
      color: 'text-brand-red',
      bg: 'bg-brand-red/15',
      border: 'border-brand-red/40',
      label: 'Service Outage',
      pinColor: 'bg-brand-red',
      ringColor: 'ring-brand-red/40',
    },
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
          <span className="text-white">Outage Status</span>
        </div>
      </div>

      {/* Header */}
      <section className="border-b border-xfinity-gray-700 bg-gradient-to-b from-xfinity-gray-900 to-xfinity-black">
        <div className="section-container py-10 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-brand-red/15 p-3">
            <MapIcon className="h-7 w-7 text-brand-red" />
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Service Outage Center</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-xfinity-gray-300 md:text-base">
            Check the status of Xfinity services in your area. Enter your ZIP code or select a
            location on the map below.
          </p>

          {/* ZIP code search */}
          <form onSubmit={handleZipCheck} className="mx-auto mt-8 flex max-w-md gap-2">
            <div className="relative flex-1">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-xfinity-gray-400" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Enter your ZIP code"
                className="w-full rounded-xl border border-xfinity-gray-600 bg-xfinity-gray-850 py-3 pl-11 pr-4 text-sm text-white placeholder-xfinity-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
              />
            </div>
            <button
              type="submit"
              disabled={zipCode.length < 5 || isChecking}
              className="shrink-0 rounded-xl bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-red-hover disabled:opacity-50"
            >
              {isChecking ? 'Checking...' : 'Check Status'}
            </button>
          </form>
        </div>
      </section>

      {/* Map + Details */}
      <div className="section-container grid grid-cols-1 gap-6 py-8 lg:grid-cols-[1fr_380px]">
        {/* Map */}
        <div className="card overflow-hidden">
          <div className="border-b border-xfinity-gray-700 px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Portland Metro Area</h2>
              <button className="flex items-center gap-1.5 text-xs text-xfinity-gray-400 transition-colors hover:text-white">
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </button>
            </div>
          </div>

          {/* Map area */}
          <div className="relative aspect-[4/3] w-full bg-xfinity-gray-850">
            {/* Grid lines for map look */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid h-full w-full grid-cols-8 grid-rows-6">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-xfinity-gray-700" />
                ))}
              </div>
            </div>

            {/* Fake roads/rivers */}
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <path
                d="M0,200 Q200,150 400,220 T800,180"
                stroke="#2e2e2e"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M100,0 Q150,150 80,300 Q50,350 120,450"
                stroke="#2e2e2e"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0,350 Q300,320 500,380 T800,360"
                stroke="#2e2e2e"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M300,0 Q350,200 280,450"
                stroke="#2a3a2a"
                strokeWidth="8"
                fill="none"
                opacity="0.5"
              />
            </svg>

            {/* City label */}
            <div className="absolute left-1/2 top-2 -translate-x-1/2 text-xs font-medium text-xfinity-gray-500">
              PORTLAND METRO
            </div>

            {/* Pins */}
            {mockPins.map((pin) => {
              const config = statusConfig[pin.status];
              const isSelected = selectedPin?.id === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => setSelectedPin(pin)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:z-20"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  aria-label={pin.area}
                >
                  <span
                    className={`block h-4 w-4 rounded-full ${config.pinColor} ring-2 ${config.ringColor} transition-all duration-200 ${
                      isSelected ? 'scale-150 ring-4' : 'hover:scale-125'
                    }`}
                  />
                  {pin.status === 'outage' && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2">
                      <span className="block h-6 w-6 animate-ping rounded-full bg-brand-red/40" />
                    </span>
                  )}
                </button>
              );
            })}

            {/* Legend overlay */}
            <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 rounded-xl border border-xfinity-gray-700 bg-xfinity-black/90 p-3 backdrop-blur-sm">
              {Object.entries(statusConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${config.pinColor}`} />
                  <span className="text-xs text-xfinity-gray-300">{config.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details panel */}
        <div className="flex flex-col gap-4">
          {isChecking ? (
            <div className="card flex flex-col items-center gap-4 p-8">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-xfinity-gray-600 border-t-brand-red" />
              <p className="text-sm text-xfinity-gray-300">Checking service status for ZIP {zipCode}...</p>
            </div>
          ) : searchedArea ? (
            <div className="card animate-slide-up overflow-hidden">
              {/* Status header */}
              <div className={`border-b border-xfinity-gray-700 p-5 ${statusConfig[searchedArea.status].bg}`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const StatusIcon = statusConfig[searchedArea.status].icon;
                    return (
                      <StatusIcon className={`h-7 w-7 ${statusConfig[searchedArea.status].color}`} />
                    );
                  })()}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {statusConfig[searchedArea.status].label}
                    </h3>
                    <p className="text-sm text-xfinity-gray-300">{searchedArea.area}</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <p className="text-sm leading-relaxed text-xfinity-gray-300">{searchedArea.details}</p>

                {searchedArea.affectedServices.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-xfinity-gray-400">
                      Affected Services
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {searchedArea.affectedServices.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-brand-red/15 px-3 py-1 text-xs font-medium text-brand-red-light"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {searchedArea.estimatedRestoration && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-xfinity-gray-700 bg-xfinity-gray-850 p-3">
                    <Clock className="h-5 w-5 shrink-0 text-accent-yellow" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-xfinity-gray-400">
                        Estimated Restoration
                      </p>
                      <p className="text-sm text-white">{searchedArea.estimatedRestoration}</p>
                    </div>
                  </div>
                )}

                {/* Notify toggle */}
                {searchedArea.status !== 'good' && (
                  <button
                    onClick={() => setNotifyEnabled(!notifyEnabled)}
                    className={`mt-4 flex w-full items-center justify-between rounded-xl border p-3 transition-all ${
                      notifyEnabled
                        ? 'border-accent-green/40 bg-accent-green/10'
                        : 'border-xfinity-gray-600 bg-xfinity-gray-850'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {notifyEnabled ? (
                        <Bell className="h-5 w-5 text-accent-green-light" />
                      ) : (
                        <BellOff className="h-5 w-5 text-xfinity-gray-400" />
                      )}
                      <span className="text-sm font-medium text-white">
                        {notifyEnabled ? 'Notifications enabled' : 'Notify me when resolved'}
                      </span>
                    </div>
                    <div
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        notifyEnabled ? 'bg-accent-green' : 'bg-xfinity-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
                          notifyEnabled ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </div>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="card flex flex-col items-center gap-3 p-8 text-center">
              <MapPin className="h-10 w-10 text-xfinity-gray-600" />
              <p className="text-sm text-xfinity-gray-400">
                Enter your ZIP code or click a pin on the map to see service details.
              </p>
            </div>
          )}

          {/* Quick stats */}
          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
              Area Summary
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(statusConfig).map(([key, config]) => {
                const count = mockPins.filter((p) => p.status === key).length;
                return (
                  <div
                    key={key}
                    className={`rounded-xl border ${config.border} ${config.bg} p-3 text-center`}
                  >
                    <p className={`text-2xl font-bold ${config.color}`}>{count}</p>
                    <p className="mt-1 text-xs text-xfinity-gray-400">{config.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Need help link */}
          <button
            onClick={() => onNavigate('home')}
            className="card card-hover flex items-center justify-between p-4 text-left"
          >
            <div>
              <p className="text-sm font-medium text-white">Need more help?</p>
              <p className="text-xs text-xfinity-gray-400">Browse support articles</p>
            </div>
            <ChevronRight className="h-5 w-5 text-brand-red" />
          </button>
        </div>
      </div>
    </div>
  );
}

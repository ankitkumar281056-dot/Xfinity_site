import { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Home,
  ChevronRight,
  Download,
  Wallet,
  Calendar,
  Bell,
  Plus,
  Banknote,
  Building2,
} from 'lucide-react';
import { accountInfo, billBreakdown, type Page } from '@/data/supportData';

interface BillingPageProps {
  onNavigate: (page: Page) => void;
}

export function BillingPage({ onNavigate }: BillingPageProps) {
  const [autopay, setAutopay] = useState(accountInfo.autopay);
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card'>('bank');
  const [paymentSent, setPaymentSent] = useState(false);
  const [paperless, setPaperless] = useState(true);

  const subtotal = billBreakdown
    .filter((b) => b.type !== 'tax')
    .reduce((sum, b) => sum + b.amount, 0);
  const taxes = billBreakdown
    .filter((b) => b.type === 'tax')
    .reduce((sum, b) => sum + b.amount, 0);
  const total = subtotal + taxes;

  const handlePayNow = () => {
    setPaymentSent(true);
    setTimeout(() => setPaymentSent(false), 4000);
  };

  const typeLabels: Record<string, string> = {
    service: 'Monthly Services',
    equipment: 'Equipment',
    addon: 'Add-Ons',
    adjustment: 'Adjustments',
    tax: 'Taxes & Fees',
  };

  const typeColors: Record<string, string> = {
    service: 'text-xfinity-gray-200',
    equipment: 'text-xfinity-gray-300',
    addon: 'text-xfinity-gray-300',
    adjustment: 'text-accent-green-light',
    tax: 'text-xfinity-gray-400',
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
          <button
            onClick={() => onNavigate('account')}
            className="transition-colors hover:text-white"
          >
            My Account
          </button>
          <ChevronRight className="h-4 w-4 text-xfinity-gray-600" />
          <span className="text-white">Billing</span>
        </div>
      </div>

      {/* Header */}
      <section className="border-b border-xfinity-gray-700 bg-gradient-to-b from-xfinity-gray-900 to-xfinity-black">
        <div className="section-container py-8">
          <h1 className="text-2xl font-bold text-white md:text-3xl">Billing & Payments</h1>
          <p className="mt-2 text-sm text-xfinity-gray-400">
            View your bill, manage payment methods, and update billing preferences.
          </p>
        </div>
      </section>

      <div className="section-container grid grid-cols-1 gap-6 py-8 lg:grid-cols-[1fr_360px]">
        {/* Left - Bill breakdown */}
        <div className="flex flex-col gap-6">
          {/* Payment success banner */}
          {paymentSent && (
            <div className="animate-slide-down flex items-center gap-3 rounded-xl border border-accent-green/40 bg-accent-green/10 p-4">
              <CheckCircle2 className="h-6 w-6 text-accent-green-light" />
              <div>
                <p className="text-sm font-medium text-white">Payment Successful</p>
                <p className="text-xs text-xfinity-gray-300">
                  Your payment of ${total.toFixed(2)} has been processed. A confirmation has been
                  sent to {accountInfo.email}.
                </p>
              </div>
            </div>
          )}

          {/* Current Bill Summary */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-xfinity-gray-700 px-6 py-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-brand-red" />
                <h2 className="text-lg font-semibold text-white">Current Bill Summary</h2>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-xfinity-gray-600 px-3 py-1.5 text-xs font-medium text-xfinity-gray-300 transition-colors hover:border-xfinity-gray-400 hover:text-white">
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </button>
            </div>

            <div className="p-6">
              {/* Billing period */}
              <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-xfinity-gray-700 bg-xfinity-gray-850 p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-xfinity-gray-500" />
                  <span className="text-xs text-xfinity-gray-400">Billing Period:</span>
                  <span className="text-sm text-white">Aug 5 – Sep 4, 2026</span>
                </div>
                <div className="h-4 w-px bg-xfinity-gray-700" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-xfinity-gray-400">Due Date:</span>
                  <span className="text-sm font-medium text-brand-red-light">
                    {accountInfo.dueDate}
                  </span>
                </div>
              </div>

              {/* Bill line items */}
              <div className="space-y-2">
                {billBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium uppercase tracking-wider ${typeColors[item.type]}`}>
                        {item.type === 'adjustment' && '↓ '}
                        {item.type === 'addon' && '+ '}
                      </span>
                      <span className={`text-sm ${item.type === 'adjustment' ? 'text-accent-green-light' : 'text-xfinity-gray-200'}`}>
                        {item.label}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        item.amount < 0 ? 'text-accent-green-light' : 'text-white'
                      }`}
                    >
                      {item.amount < 0 ? '-' : ''}${Math.abs(item.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 space-y-2 border-t border-xfinity-gray-700 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xfinity-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xfinity-gray-400">Taxes & Fees</span>
                  <span className="text-white">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-xfinity-gray-700 pt-2">
                  <span className="text-base font-bold text-white">Total Due</span>
                  <span className="text-2xl font-bold text-brand-red">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePayNow}
                disabled={paymentSent}
                className="btn-primary mt-6 w-full"
              >
                {paymentSent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Payment Processed
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Pay ${total.toFixed(2)} Now
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bill History */}
          <div className="card overflow-hidden">
            <div className="border-b border-xfinity-gray-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Recent Bills</h2>
            </div>
            <div className="divide-y divide-xfinity-gray-700">
              {[
                { date: 'Aug 5, 2026', amount: total, status: 'Due' },
                { date: 'Jul 5, 2026', amount: 142.83, status: 'Paid' },
                { date: 'Jun 5, 2026', amount: 142.83, status: 'Paid' },
                { date: 'May 5, 2026', amount: 135.50, status: 'Paid' },
                { date: 'Apr 5, 2026', amount: 135.50, status: 'Paid' },
              ].map((bill, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-6 py-3 transition-colors hover:bg-xfinity-gray-850"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-white">{bill.date}</div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        bill.status === 'Paid'
                          ? 'bg-accent-green/15 text-accent-green-light'
                          : 'bg-accent-yellow/15 text-accent-yellow'
                      }`}
                    >
                      {bill.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">
                      ${bill.amount.toFixed(2)}
                    </span>
                    <button className="text-xs text-brand-red transition-colors hover:text-brand-red-light">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Payment settings */}
        <div className="flex flex-col gap-6">
          {/* Auto-pay */}
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
                Auto-Pay
              </h2>
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
            <p className="text-sm text-xfinity-gray-300">
              {autopay
                ? 'Auto-Pay is active. Your bill will be automatically paid on the due date.'
                : 'Enroll in Auto-Pay to have your bill paid automatically each month.'}
            </p>
            {autopay && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-accent-green/30 bg-accent-green/10 p-3">
                <CheckCircle2 className="h-4 w-4 text-accent-green-light" />
                <span className="text-xs text-accent-green-light">
                  Next payment: {accountInfo.dueDate}
                </span>
              </div>
            )}
          </div>

          {/* Paperless billing */}
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-xfinity-gray-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
                  Paperless Billing
                </h2>
              </div>
              <button
                onClick={() => setPaperless(!paperless)}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  paperless ? 'bg-accent-green' : 'bg-xfinity-gray-600'
                }`}
                aria-label="Toggle paperless billing"
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform duration-200 ${
                    paperless ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            <p className="text-sm text-xfinity-gray-300">
              {paperless
                ? 'You receive your bills by email. No paper mail!'
                : 'Switch to paperless to get bills by email and reduce waste.'}
            </p>
          </div>

          {/* Payment methods */}
          <div className="card p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
              Payment Methods
            </h2>

            {/* Saved methods */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setPaymentMethod('bank')}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                  paymentMethod === 'bank'
                    ? 'border-brand-red bg-brand-red/10'
                    : 'border-xfinity-gray-700 bg-xfinity-gray-850 hover:border-xfinity-gray-500'
                }`}
              >
                <Building2 className="h-5 w-5 text-xfinity-gray-300" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white">Bank Account</p>
                  <p className="text-xs text-xfinity-gray-500">US Bank ••••4321</p>
                </div>
                {paymentMethod === 'bank' && (
                  <CheckCircle2 className="h-5 w-5 text-brand-red" />
                )}
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-red bg-brand-red/10'
                    : 'border-xfinity-gray-700 bg-xfinity-gray-850 hover:border-xfinity-gray-500'
                }`}
              >
                <CreditCard className="h-5 w-5 text-xfinity-gray-300" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white">Visa Debit</p>
                  <p className="text-xs text-xfinity-gray-500">••••8901 (Expires 09/28)</p>
                </div>
                {paymentMethod === 'card' && (
                  <CheckCircle2 className="h-5 w-5 text-brand-red" />
                )}
              </button>
            </div>

            <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-xfinity-gray-600 py-2.5 text-sm font-medium text-xfinity-gray-400 transition-colors hover:border-xfinity-gray-400 hover:text-white">
              <Plus className="h-4 w-4" />
              Add Payment Method
            </button>
          </div>

          {/* Payment summary */}
          <div className="card p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-xfinity-gray-400">
              Payment Summary
            </h2>
            <div className="flex items-center gap-3 rounded-xl bg-xfinity-gray-850 p-3">
              {paymentMethod === 'bank' ? (
                <Banknote className="h-8 w-8 text-accent-blue-light" />
              ) : (
                <CreditCard className="h-8 w-8 text-accent-blue-light" />
              )}
              <div>
                <p className="text-xs text-xfinity-gray-500">Paying with</p>
                <p className="text-sm font-medium text-white">
                  {paymentMethod === 'bank' ? 'US Bank Account' : 'Visa Debit'}
                </p>
              </div>
            </div>
            <button
              onClick={handlePayNow}
              disabled={paymentSent}
              className="btn-primary mt-3 w-full"
            >
              {paymentSent ? 'Payment Processed' : `Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

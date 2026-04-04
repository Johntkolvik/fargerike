"use client";

import { useCart } from "@/context/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, clear, totalItems, totalPrice } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-warm-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-warm-200 px-6 py-4">
          <h2 className="text-lg font-bold text-warm-900">
            Handlekurv
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-warm-400">
                ({totalItems} {totalItems === 1 ? "produkt" : "produkter"})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Lukk handlekurv"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-100 text-warm-600 hover:bg-warm-200 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <svg className="h-12 w-12 text-warm-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <div className="text-sm font-medium text-warm-900">Handlekurven er tom</div>
              <div className="mt-1 text-xs text-warm-400">Legg til maling fra en kulørside</div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-xl border border-warm-200 bg-white p-4">
                  <div className="flex gap-3">
                    <div
                      className="h-14 w-14 shrink-0 rounded-lg"
                      style={{ backgroundColor: item.colorHex }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-warm-900 truncate">{item.colorName}</div>
                      <div className="text-xs text-warm-500">{item.familyName} &middot; {item.finishName}</div>
                      <div className="text-xs text-warm-400">{item.fillLevel}L</div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 text-warm-400 hover:text-red-500 transition-colors"
                      title="Fjern"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-warm-300 text-sm text-warm-600 hover:bg-warm-100"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-sm font-semibold text-warm-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-warm-300 text-sm text-warm-600 hover:bg-warm-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-warm-900">
                      {(item.quantity * item.priceNOK).toLocaleString("nb-NO")},-
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-warm-200 px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-warm-500">Totalt</span>
              <span className="text-2xl font-bold text-warm-900">
                {totalPrice.toLocaleString("nb-NO")},-
              </span>
            </div>
            <button className="w-full rounded-xl bg-warm-900 py-4 text-sm font-semibold text-warm-50 transition-colors hover:bg-warm-800">
              Gå til kassen
            </button>
            <button
              onClick={clear}
              className="w-full text-center text-xs text-warm-400 hover:text-warm-600 transition-colors"
            >
              Tøm handlekurv
            </button>
          </div>
        )}
      </div>
    </>
  );
}

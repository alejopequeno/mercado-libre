/**
 * Payment Methods Component
 * Displays available payment methods organized by categories with dialog
 */
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PaymentMethod, Installment } from '@/types/product.types';
import { formatPrice } from '@/lib/utils';
import { CreditCard, Wallet, Banknote, Building2 } from 'lucide-react';

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  currency: string;
}

interface GroupedPaymentMethods {
  mercadopago: PaymentMethod[];
  creditCards: PaymentMethod[];
  debitCards: PaymentMethod[];
  cash: PaymentMethod[];
  bankTransfer: PaymentMethod[];
}

export function PaymentMethods({ paymentMethods, currency }: PaymentMethodsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Agrupar métodos de pago por categoría
  const groupedMethods = useMemo<GroupedPaymentMethods>(() => {
    return paymentMethods.reduce<GroupedPaymentMethods>(
      (acc, method) => {
        switch (method.type) {
          case 'mercadopago':
            acc.mercadopago.push(method);
            break;
          case 'credit_card':
            acc.creditCards.push(method);
            break;
          case 'debit_card':
            acc.debitCards.push(method);
            break;
          case 'cash':
            acc.cash.push(method);
            break;
          case 'bank_transfer':
            acc.bankTransfer.push(method);
            break;
        }
        return acc;
      },
      {
        mercadopago: [],
        creditCards: [],
        debitCards: [],
        cash: [],
        bankTransfer: [],
      }
    );
  }, [paymentMethods]);

  // Encontrar la mejor opción de cuotas sin interés (la mayor cantidad)
  const getBestInstallment = (): { quantity: number; amount: number; method: string } | null => {
    let bestInstallment: Installment & { method: string } | null = null;

    paymentMethods.forEach((method) => {
      if (method.installments) {
        method.installments.forEach((installment) => {
          if (
            installment.rate === 0 &&
            (!bestInstallment || installment.quantity > bestInstallment.quantity)
          ) {
            bestInstallment = { ...installment, method: method.name };
          }
        });
      }
    });

    return bestInstallment;
  };

  const bestInstallment = getBestInstallment();

  // Obtener todas las opciones de cuotas sin interés
  const getAllInterestFreeInstallments = () => {
    const installmentsMap = new Map<number, Installment & { methods: string[] }>();

    paymentMethods.forEach((method) => {
      if (method.installments) {
        method.installments.forEach((installment) => {
          if (installment.rate === 0) {
            const existing = installmentsMap.get(installment.quantity);
            if (existing) {
              existing.methods.push(method.name);
            } else {
              installmentsMap.set(installment.quantity, {
                ...installment,
                methods: [method.name],
              });
            }
          }
        });
      }
    });

    return Array.from(installmentsMap.values()).sort((a, b) => a.quantity - b.quantity);
  };

  const interestFreeInstallments = getAllInterestFreeInstallments();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Medios de pago</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cuotas sin interés destacadas */}
          {bestInstallment && (
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 mt-0.5 text-blue-600" />
                <div>
                  <p className="text-sm">
                    Mismo precio{' '}
                    <span className="font-semibold">
                      en {bestInstallment.quantity} cuotas de {formatPrice(bestInstallment.amount, currency)}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Sin interés con {bestInstallment.method}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resumen de métodos disponibles */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {groupedMethods.mercadopago.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" />
                <span>Mercado Pago</span>
              </div>
            )}
            {groupedMethods.creditCards.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>{groupedMethods.creditCards.length} tarjetas de crédito</span>
              </div>
            )}
            {groupedMethods.debitCards.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>{groupedMethods.debitCards.length} tarjetas de débito</span>
              </div>
            )}
            {groupedMethods.cash.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Banknote className="h-4 w-4" />
                <span>Efectivo</span>
              </div>
            )}
            {groupedMethods.bankTransfer.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>Débito bancario</span>
              </div>
            )}
          </div>

          {/* Link para abrir el dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                Conoce otros medios de pago
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Medios de pago disponibles</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Cuotas sin Tarjeta - Mercado Pago */}
                {groupedMethods.mercadopago.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Cuotas sin Tarjeta</h3>
                    </div>
                    {groupedMethods.mercadopago.map((method) => (
                      <div key={method.id} className="pl-7 space-y-2">
                        <p className="font-medium">{method.name}</p>
                        {method.installments && method.installments.length > 0 && (
                          <div className="space-y-1">
                            {method.installments.map((inst, idx) => (
                              <p key={idx} className="text-sm text-muted-foreground">
                                {inst.quantity} cuotas de {formatPrice(inst.amount, currency)}
                                {inst.rate === 0 ? ' sin interés' : ` (${inst.rate}% de interés)`}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tarjetas de Crédito */}
                {groupedMethods.creditCards.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Tarjetas de crédito</h3>
                    </div>
                    {groupedMethods.creditCards.map((method) => (
                      <div key={method.id} className="pl-7 space-y-2">
                        <p className="font-medium">{method.name}</p>
                        {method.installments && method.installments.length > 0 && (
                          <div className="space-y-1">
                            {method.installments.map((inst, idx) => (
                              <p key={idx} className="text-sm text-muted-foreground">
                                {inst.quantity} cuotas de {formatPrice(inst.amount, currency)}
                                {inst.rate === 0 ? ' sin interés' : ` (${inst.rate}% de interés)`}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tarjetas de Débito */}
                {groupedMethods.debitCards.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold">Tarjetas de débito</h3>
                    </div>
                    <div className="pl-7 space-y-2">
                      {groupedMethods.debitCards.map((method) => (
                        <p key={method.id} className="text-sm text-muted-foreground">
                          {method.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Efectivo */}
                {groupedMethods.cash.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold">Efectivo</h3>
                    </div>
                    <div className="pl-7 space-y-2">
                      {groupedMethods.cash.map((method) => (
                        <p key={method.id} className="text-sm text-muted-foreground">
                          {method.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Débito Bancario */}
                {groupedMethods.bankTransfer.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Débito bancario</h3>
                    </div>
                    <div className="pl-7 space-y-2">
                      {groupedMethods.bankTransfer.map((method) => (
                        <p key={method.id} className="text-sm text-muted-foreground">
                          {method.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Todas las opciones sin interés */}
                {interestFreeInstallments.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold">Todas las opciones sin interés</h3>
                    <div className="space-y-2">
                      {interestFreeInstallments.map((inst, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-sm font-medium">
                            {inst.quantity} cuotas de {formatPrice(inst.amount, currency)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Con: {inst.methods.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  );
}

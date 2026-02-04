/**
 * Seller Info Component
 * Displays seller information and reputation (MercadoLibre style)
 */
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Seller } from "@/types/product.types";
import { Award, MessageCircle, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReputationBar } from "./reputation-bar";

interface SellerInfoProps {
  seller: Seller;
}

export function SellerInfo({ seller }: SellerInfoProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `+${Math.floor(num / 1000)}mil`;
    }
    return num.toString();
  };

  const getReputationLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      green: "Platinum",
      light_green: "Gold",
      yellow: "Silver",
      orange: "Bronze",
      red: "Novato",
    };
    return labels[level] || level;
  };

  return (
    <Card className="p-6 gap-4">
      {/* Header: Avatar + Name + Follow Button */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Avatar className="size-12">
            <AvatarImage
              src={
                seller.avatarUrl ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${seller.nickname}`
              }
              alt={seller.nickname}
            />
            <AvatarFallback>
              {seller.nickname.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 w-full overflow-hidden">
              <h3 className="text-xl font-semibold truncate flex-1">
                {seller.nickname}
              </h3>
              <Button
                variant="light_blue"
                size="xs"
                className="shrink-0 px-3 font-semibold"
              >
                Seguir
              </Button>
            </div>
            <div className="text-xs text-muted-foreground flex gap-1">
              <p>
                <span className="font-semibold">
                  {formatNumber(seller.totalSales)}
                </span>{" "}
                Seguidores
              </p>
              <p>
                <span className="font-semibold">+100</span> Productos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MercadoLíder Badge */}
      {seller.reputation.powerSellerStatus && (
        <div className="space-y-1">
          <div className="flex w-fit text-sm font-semibold items-center gap-1.5 border-green-600 text-green-600 px-2 py-1">
            <Award className="h-4 w-4" />
            MercadoLíder {getReputationLevelLabel(seller.reputation.level)}
          </div>
        </div>
      )}

      {/* Reputation Bar */}
      <ReputationBar level={seller.reputation.level} />

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="">
          <p className="text-sm font-semibold">
            {formatNumber(seller.totalSales)}
          </p>
          <p className="text-xs text-muted-foreground">Ventas</p>
        </div>
        {seller.reputation.metrics.goodService && (
          <div className="space-y-1">
            <MessageCircle className="size-4 text-green-600 mx-auto" />
            <p className="text-xs text-muted-foreground">Buena atención</p>
          </div>
        )}
        {seller.reputation.metrics.onTimeDelivery && (
          <div className="space-y-1">
            <Clock className="size-4 text-green-600 mx-auto" />
            <p className="text-xs text-muted-foreground">Entrega a tiempo</p>
          </div>
        )}
      </div>

      {/* Visit Seller Page Button */}
      <Button variant="light_blue" className="w-full" size="lg">
        Ir a la página del vendedor
      </Button>
    </Card>
  );
}

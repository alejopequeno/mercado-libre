"use client";

import { useState } from "react";
import {
  ChevronDown,
  MapPinHouse,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";

interface Address {
  street: string;
  name: string;
}

const addresses: Address[] = [
  { street: "Calle Falsa 123", name: "Enviar a Alejo" },
  { street: "Av. Corrientes 456", name: "Enviar a María" },
  { street: "Calle San Martín 789", name: "Enviar a Carlos" },
  { street: "Av. Libertador 321", name: "Enviar a Ana" },
  { street: "Calle Rivadavia 654", name: "Enviar a Juan" },
];

const categories = [
  "Vehiculos",
  "Inmuebles",
  "Electrónica",
  "Hogar",
  "Moda",
  "Juegos y Juguetes",
  "Deportes",
  "Belleza y Cuidado Personal",
];

const SearchBar = () => (
  <div className="relative flex-1 max-w-2xl w-full">
    <Input
      className="relative z-10 pr-10"
      placeholder="Buscar productos, marcas y más..."
    />
    <button className="absolute cursor-pointer right-px top-1/2 -translate-y-1/2 text-neutral-600 z-10 border-l border-neutral-200 pl-2 pr-2.5 rounded-r-md hover:bg-neutral-100 transition-colors duration-100 h-[calc(100%-2px)]">
      <Search className="size-4" />
    </button>
  </div>
);

const AddressDropdown = ({
  selectedAddress,
  onSelectAddress,
}: {
  selectedAddress: Address;
  onSelectAddress: (address: Address) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex p-1 px-2 items-center gap-2 cursor-pointer border-2 border-white/50 transition-colors duration-100 hover:border-white/80 group rounded-lg">
        <MapPinHouse className="size-4.5" strokeWidth={2} />
        <div className="flex flex-col justify-start w-fit">
          <p className="w-fit text-xs leading-3.5! opacity-80">
            {selectedAddress.street}
          </p>
          <p className="w-fit text-sm leading-4!">{selectedAddress.name}</p>
        </div>
        <ChevronDown className="size-4.5 ml-2 opacity-50 group-hover:opacity-100 transition-opacity duration-100" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      className="w-64 rounded-xl max-h-64 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {addresses.map((address, index) => {
        const isSelected =
          selectedAddress.street === address.street &&
          selectedAddress.name === address.name;
        return (
          <div key={index}>
            <DropdownMenuItem
              onClick={() => onSelectAddress(address)}
              className={`flex flex-col items-start py-2 px-2.5 gap-0! cursor-pointer rounded-lg transition-colors ${
                isSelected
                  ? "bg-neutral-200/90 text-foreground"
                  : "hover:bg-accent"
              }`}
            >
              <p className="text-xs opacity-80 leading-3.5!">
                {address.street}
              </p>
              <p className="text-sm leading-4">{address.name}</p>
            </DropdownMenuItem>
            {index < addresses.length - 1 && <DropdownMenuSeparator />}
          </div>
        );
      })}
    </DropdownMenuContent>
  </DropdownMenu>
);

const CartButton = () => (
  <Button variant="ghost" className="relative hover:bg-white/30" size={"icon"}>
    <ShoppingCart className="size-5" strokeWidth={2} />
    <Badge
      variant="destructive"
      className="absolute top-0 right-0 size-4 flex items-center justify-center p-0 text-xs rounded-full"
    >
      3
    </Badge>
  </Button>
);

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-2 p-1 px-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors duration-100">
        <Avatar className="size-8">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/82184593?v=4"
            alt="Alejo"
          />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden lg:block">Alejo</span>
        <ChevronDown className="size-4 hidden lg:block" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48 rounded-xl">
      <DropdownMenuItem className="cursor-pointer rounded-lg">
        Compras
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer rounded-lg">
        Historial
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer rounded-lg">
        Preguntas
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer rounded-lg">
        Favoritos
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer rounded-lg text-red-600">
        Salir
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const MobileMenu = ({ selectedAddress }: { selectedAddress: Address }) => (
  <Sheet>
    <SheetTrigger asChild>
      <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-100">
        <Menu className="size-5" />
      </button>
    </SheetTrigger>
    <SheetContent side="left" className="flex flex-col py-4">
      <SheetHeader className="px-4">
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 pb-4 border-b px-4">
        <Avatar className="size-12">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/82184593?v=4"
            alt="Alejo"
          />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">Alejo</p>
          <p className="text-xs text-muted-foreground">
            {selectedAddress.name}
          </p>
        </div>
        <Link
          href="/cart"
          className="relative p-2 hover:bg-accent rounded-lg transition-colors duration-100"
        >
          <ShoppingCart className="size-5" strokeWidth={2} />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs rounded-full"
          >
            3
          </Badge>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Mi cuenta
            </p>
            <Link
              href="#"
              className="px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-100"
            >
              Compras
            </Link>
            <Link
              href="#"
              className="px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-100"
            >
              Historial
            </Link>
            <Link
              href="#"
              className="px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-100"
            >
              Preguntas
            </Link>
            <Link
              href="#"
              className="px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-100"
            >
              Favoritos
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Categorías
            </p>
            {categories.map((category) => (
              <Link
                key={category}
                href="#"
                className="px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-100"
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Acciones
            </p>
            <Link
              href="#"
              className="px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-100"
            >
              Ofertas
            </Link>
            <Link
              href="#"
              className="px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-100 flex items-center justify-between"
            >
              Mercado Play
              <Badge variant="green" className="text-xs px-1.5 py-0">
                Gratis
              </Badge>
            </Link>
            <Link
              href="#"
              className="px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-100"
            >
              Vender
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 px-4">
        <Button variant="destructive" className="w-full">
          Salir
        </Button>
      </div>
    </SheetContent>
  </Sheet>
);

const CategoriesDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex gap-1 text-sm items-center group font-medium cursor-pointer text-neutral-600 hover:text-neutral-900 transition-colors duration-100">
        Categorías
        <ChevronDown className="size-4 opacity-90 group-hover:opacity-100 transition-opacity duration-200" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-64 rounded-xl shadow-lg">
      {categories.map((category) => (
        <DropdownMenuItem
          key={category}
          className="p-2 px-3 rounded-lg cursor-pointer"
        >
          {category}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Navbar = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0]);

  return (
    <header className="bg-mercadolibre px-4 py-2 border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 gap-y-3 items-center flex flex-col gap-2">
        {/* Top Row */}
        <div className="flex gap-4 justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <MobileMenu selectedAddress={selectedAddress} />
            <Link href="/">
              <Image
                src="/mercado-libre-logo.png"
                alt="Mercado Libre"
                width={134}
                height={34}
                className="w-24 lg:w-32 h-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2">
            <UserMenu />
            <CartButton />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden w-full">
          <SearchBar />
        </div>

        {/* Bottom Row - Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2 w-full">
          <div className="flex gap-2 items-center">
            <AddressDropdown
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress}
            />
            <div className="flex gap-4 pl-2">
              <CategoriesDropdown />
              <button className="flex gap-1 text-sm items-center font-medium cursor-pointer text-neutral-600 hover:text-neutral-900 transition-colors duration-100">
                Ofertas
              </button>
              <button className="flex gap-1 text-sm items-center relative font-medium cursor-pointer text-neutral-600 hover:text-neutral-900 transition-colors duration-100">
                <Badge
                  variant="green"
                  className="absolute -top-[80%] text-xs px-1 py-0 left-1/2 -translate-x-1/2 scale-70"
                >
                  Gratis
                </Badge>
                Mercado Play
              </button>
              <button className="flex gap-1 text-sm items-center font-medium cursor-pointer text-neutral-600 hover:text-neutral-900 transition-colors duration-100">
                Vender
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

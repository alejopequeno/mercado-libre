"use client";

import { motion } from "motion/react";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChangeAction: (value: string) => void;
  className?: string;
  paddingContainer?: number;
}

export function Tabs({
  tabs,
  value,
  onChangeAction,
  className = "",
  paddingContainer = 0.25,
}: TabsProps) {
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [tabPosition, setTabPosition] = useState({ left: 0, width: 0 });
  const valueRef = useRef(value);

  // Mantener valueRef sincronizado
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Callback ref para cada tab - SOLO guarda la referencia, NO actualiza estado
  const setTabRef = useCallback((tabValue: string) => {
    return (node: HTMLButtonElement | null) => {
      if (node) {
        tabRefs.current.set(tabValue, node);
      } else {
        tabRefs.current.delete(tabValue);
      }
    };
  }, []);

  // Actualizar posición cuando cambia el value
  useLayoutEffect(() => {
    const activeTab = tabRefs.current.get(value);
    if (activeTab) {
      const { offsetLeft, offsetWidth } = activeTab;
      setTabPosition((prev) => {
        // Solo actualizar si realmente cambió
        if (prev.left !== offsetLeft || prev.width !== offsetWidth) {
          return { left: offsetLeft, width: offsetWidth };
        }
        return prev;
      });
    }
  }, [value]);

  // Actualizar posición después del montaje inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeTab = tabRefs.current.get(valueRef.current);
      if (activeTab) {
        const { offsetLeft, offsetWidth } = activeTab;
        setTabPosition({ left: offsetLeft, width: offsetWidth });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // También actualizar en resize
  useEffect(() => {
    const handleResize = () => {
      const activeTab = tabRefs.current.get(valueRef.current);
      if (activeTab) {
        const { offsetLeft, offsetWidth } = activeTab;
        setTabPosition((prev) => {
          if (prev.left !== offsetLeft || prev.width !== offsetWidth) {
            return { left: offsetLeft, width: offsetWidth };
          }
          return prev;
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      data-slot="container"
      className={`bg-card relative flex w-full border gap-2 rounded-xl overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}
      style={{ padding: `${paddingContainer}rem` }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={setTabRef(tab.value)}
            data-slot="tab"
            className={`relative z-10 flex-1 cursor-pointer rounded-lg p-2 text-sm transition-colors text-nowrap font-medium ${className} ${isActive ? "text-foreground" : "text-neutral-400"}`}
            onClick={() => onChangeAction(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
      {tabPosition.width > 0 && (
        <motion.div
          data-slot="indicator"
          className={`bg-background absolute top-1/2 left-0 -translate-y-1/2 rounded-lg ${className}`}
          style={{
            height: `calc(100% - ${paddingContainer * 2}rem)`,
          }}
          initial={{
            left: tabPosition.left,
            width: tabPosition.width,
          }}
          animate={{
            left: tabPosition.left,
            width: tabPosition.width,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
    </div>
  );
}

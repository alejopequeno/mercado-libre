/**
 * Product Questions Component
 * Displays product questions and allows users to ask new ones
 */
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Question } from "@/types/product.types";
import { MessageCircle, Send, ChevronDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { ProductBox } from "./product-box";

interface ProductQuestionsProps {
  questions?: Question[];
  productTitle: string;
}

export function ProductQuestions({ questions = [] }: ProductQuestionsProps) {
  const [questionText, setQuestionText] = useState("");
  const [showAll, setShowAll] = useState(false);

  const hasMoreQuestions = questions.length > 3;
  const displayedQuestions = showAll ? questions : questions.slice(0, 3);
  const remainingCount = questions.length - 3;

  const handleAskQuestion = useCallback(() => {
    // Esto es estático - solo limpia el input
    if (questionText.trim()) {
      setQuestionText("");
      // Aquí iría la lógica para enviar la pregunta al backend
    }
  }, [questionText]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleAskQuestion();
      }
    },
    [handleAskQuestion],
  );

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  // Formatear fecha de manera memoizada
  const formatDate = useCallback((date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: es,
    });
  }, []);

  return (
    <ProductBox title="Preguntas">
      <div className="space-y-6">
        {/* Input para hacer preguntas */}
        <div className="flex gap-2">
          <Input
            name="question"
            placeholder="Escribí tu pregunta..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className="flex-1"
          />
          <Button
            onClick={handleAskQuestion}
            disabled={!questionText.trim()}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="h-4 w-4 mr-2" />
            Preguntar
          </Button>
        </div>

        {/* Lista de preguntas */}
        {displayedQuestions.length > 0 && (
          <div className="space-y-4">
            {displayedQuestions.map((q) => (
              <div key={q.id} className="space-y-2">
                {/* Pregunta */}
                <div className="flex gap-2">
                  <MessageCircle className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{q.question}</p>
                    <p className="text-xs text-muted-foreground">
                      {q.askedBy} • {formatDate(q.askedAt)}
                    </p>
                  </div>
                </div>

                {/* Respuesta */}
                {q.answer && (
                  <div className="ml-6 pl-4 border-l-2 border-muted space-y-1">
                    <p className="text-sm">{q.answer}</p>
                    <p className="text-xs text-muted-foreground">
                      {q.answeredBy} •{" "}
                      {q.answeredAt && formatDate(q.answeredAt)}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Indicador de más preguntas + Botón para ver todas */}
            {hasMoreQuestions && !showAll && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="link"
                  onClick={toggleShowAll}
                  className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1 p-0 h-auto"
                >
                  Ver todas las preguntas ({remainingCount} más)
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Botón para colapsar */}
            {showAll && hasMoreQuestions && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="link"
                  onClick={toggleShowAll}
                  className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1 p-0 h-auto"
                >
                  Ver menos preguntas
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </Button>
              </div>
            )}
          </div>
        )}

        {questions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Aún no hay preguntas sobre este producto</p>
            <p className="text-xs">Sé el primero en preguntar</p>
          </div>
        )}
      </div>
    </ProductBox>
  );
}

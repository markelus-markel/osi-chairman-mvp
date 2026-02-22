"use client"

import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, AlertCircle, MessageSquare, Megaphone } from "lucide-react"

type CarouselItem = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const items: CarouselItem[] = [
  {
    id: "balance",
    title: "Баланс дома",
    description: "Текущий счёт и поступления",
    icon: <Home className="h-10 w-10 text-primary" />,
  },
  {
    id: "debtors",
    title: "Должники",
    description: "Список неплательщиков",
    icon: <AlertCircle className="h-10 w-10 text-destructive" />,
  },
  {
    id: "requests",
    title: "Заявки жильцов",
    description: "От жильцов",
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
  },
  {
    id: "announcements",
    title: "Объявления",
    description: "Создать или посмотреть",
    icon: <Megaphone className="h-10 w-10 text-primary" />,
  },
]

export default function DashboardCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "start",
  })

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className="relative px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 py-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="min-w-[85%] flex-shrink-0 cursor-pointer transition-transform hover:scale-105 md:min-w-[45%] lg:min-w-[30%]"
              onClick={() => alert(`Открыта карточка: ${item.id}`)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {item.icon}
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Стрелки для десктопа */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-md"
        onClick={scrollPrev}
      >
        ←
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-md"
        onClick={scrollNext}
      >
        →
      </button>
    </div>
  )
}
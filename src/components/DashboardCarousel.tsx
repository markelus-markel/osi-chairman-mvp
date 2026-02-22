"use client"

import { useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Home, AlertCircle, MessageSquare, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"

type CarouselItem = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  voiceText: string
}

const items: CarouselItem[] = [
  {
    id: "balance",
    title: "Баланс дома",
    description: "Текущий счёт и поступления",
    icon: <Home className="h-10 w-10 text-primary" />,
    voiceText: "Это экран баланса дома. Здесь вы видите текущий счёт, поступления и расходы.",
  },
  {
    id: "debtors",
    title: "Должники",
    description: "Список неплательщиков",
    icon: <AlertCircle className="h-10 w-10 text-destructive" />,
    voiceText: "Это экран должников. Здесь отображается список жильцов с задолженностью.",
  },
  {
    id: "requests",
    title: "Заявки жильцов",
    description: "От жильцов",
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    voiceText: "Это экран заявок от жильцов. Здесь вы можете просматривать и отвечать на обращения.",
  },
  {
    id: "announcements",
    title: "Объявления",
    description: "Создать или посмотреть",
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    voiceText: "Это экран объявлений. Здесь вы можете создавать и просматривать объявления для жильцов.",
  },
]

export default function DashboardCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true })
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null)

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ru-RU'
      utterance.volume = 1
      utterance.rate = 1
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleCardClick = (item: CarouselItem) => {
    setSelectedItem(item)
    setTimeout(() => {
      speak(item.voiceText)
    }, 800)
  }

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <>
      <div className="relative px-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 py-6">
            {items.map((item) => (
              <Card
                key={item.id}
                className="min-w-[85%] flex-shrink-0 cursor-pointer transition-all hover:scale-105 hover:shadow-lg md:min-w-[45%] lg:min-w-[30%]"
                onClick={() => handleCardClick(item)}
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

        {/* Стрелки */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-opacity opacity-70 hover:opacity-100"
          onClick={scrollPrev}
          type="button"
        >
          ←
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-opacity opacity-70 hover:opacity-100"
          onClick={scrollNext}
          type="button"
        >
          →
        </button>
      </div>

      {/* Диалог */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-4xl sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <p className="text-lg leading-relaxed">{selectedItem?.voiceText}</p>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-muted-foreground">Это экран управления для раздела: {selectedItem?.title}</p>
            </div>
            <div className="flex gap-4 mt-8">
              <Button onClick={() => selectedItem && speak(selectedItem.voiceText)}>
                Повторить голосом
              </Button>
              <Button variant="outline" onClick={() => setSelectedItem(null)}>
                Закрыть
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
import { NextRequest, NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma" // создай этот файл ниже

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 401 })
    }

    const isValid = await compare(password, user.passwordHash)

    if (!isValid) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
    }

    // Пока просто возвращаем успех (потом добавим сессию / JWT)
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
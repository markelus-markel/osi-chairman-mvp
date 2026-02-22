import fs from 'fs';
// @ts-ignore
import matter from 'gray-matter';
import { prisma } from './prisma';

export async function updateMkdConfig(newData: any) {
  const path = 'data/config/house.md';
  
  // 1. Обновляем Markdown (Источник правды)
  const file = matter.read(path);
  const updatedData = { ...file.data, ...newData, status: "CONFIGURED" };
  fs.writeFileSync(path, matter.stringify(file.content, updatedData));

  // 2. Обновляем Neon (Инструмент для аналитики и UI)
  return await prisma.osi.upsert({
    where: { bin: newData.bin || "temp" },
    update: newData,
    create: newData
  });
}
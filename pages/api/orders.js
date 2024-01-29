import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    // Obtener Ordenes
    const orders = await prisma.order.findMany({
      where: {
        state: false,
      },
    });
    res.status(200).json(orders);
  } else if (req.method === "POST") {
    // Crear Ordenes
    const orderPost = await prisma.order.create({
      data: {
        name: req.body.name,
        total: req.body.total,
        requested: req.body.order,
        date: req.body.date,
      },
    });
    res.status(200).json(orderPost);
  }
}

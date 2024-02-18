const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// Mostrar todas las ventas
router.get("/", async (req, res) => {
  try {
    const allSales = await prisma.venta.findMany();
    res.json(allSales);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

// Mostrar una venta en particular
router.get("/:id", async (req, res) => {
  try {
    const oneSale = await prisma.venta.findUnique({
      where: {
        ID_Venta: Number(req.params.id),
      },
    });
    res.json(oneSale);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

// Mostrar todas las ventas de un libro en particular
router.get("/book/:isbn", async (req, res) => {
    try {
      const oneBookSales = await prisma.venta.findMany({
        where: {
          ISBN: req.params.isbn,
        },
      });
      res.json(oneBookSales);
    } catch (e) {
      console.log(e);
      res.json("Server error");
    }
  });

module.exports = router;

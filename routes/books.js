const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// Mostrar todos los libros
router.get("/", async (req, res) => {
  try {
    const allBooks = await prisma.libro.findMany();
    res.json(allBooks);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

// Combinar tablas de Libros y Ventas usando el ISBN (devolvía null si la ponía debajo de las otras rutas)
router.get("/with-sales", async (req, res) => {
  try {
    const booksWithSales = await prisma.venta.findMany({
      include: {
        Libro: {
          select: {
            Titulo: true,
            Autor: true,
            Precio: true,
          },
        },
      },
    });
    res.json(booksWithSales);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

// Mostrar un libro en particular
router.get("/:isbn", async (req, res) => {
  try {
    const oneBook = await prisma.libro.findUnique({
      where: {
        ISBN: req.params.isbn,
      },
    });
    res.json(oneBook);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

// Mostrar todos los libros de un autor en particular
router.get("/author/:author", async (req, res) => {
  try {
    const oneAuthorBooks = await prisma.libro.findMany({
      where: {
        Autor: req.params.author,
      },
    });
    res.json(oneAuthorBooks);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

// Mostrar todos los libros con un precio superior a 20
router.get("/price/:price", async (req, res) => {
  try {
    const expensiveBooks = await prisma.libro.findMany({
      where: {
        Precio: {
          gt: Number(req.params.price),
        },
      },
    });
    res.json(expensiveBooks);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

module.exports = router;

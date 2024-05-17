const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello World");
});

mongoose
  .connect(
    "mongodb+srv://credence:credence9177@credence.jajlzkn.mongodb.net/?retryWrites=true&w=majority&appName=Credence",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected ot Database!");
    app.listen(3005, () => {
      console.log("Server is running on port 3005");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Create Book

app.post("/books", async (request, response) => {
  const book = new Book(request.body);
  try {
    await book.save();
    response.status(200).send(book);
  } catch (error) {
    response.status(400).send(error);
  }
});

// Get Books

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    response.status(200).send(books);
  } catch (error) {
    response.send(500).send(error);
  }
});

// Get Book

app.get("/books/:id", async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).send();
    }
    response.send(book);
  } catch (error) {
    response.status(500).send();
  }
});

// Update Book

app.put("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updatedBook = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return response.status(404).send();
    }
    response.send(updatedBook);
  } catch (error) {
    response.status(500).send();
  }
});

// Delete Book

app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return response.status(404).send();
    }
    response.send(deleteBook);
  } catch (error) {
    response.status(500).send();
  }
});

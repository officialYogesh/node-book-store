const Book = require("../Schemas/BookSchema");

function createTestBooksData() {
  Book.countDocuments((error, count) => {
    if (error) {
      console.log("error", error.message);
    } else {
      if (count > 0) return;

      Book.insertMany(
        [
          {
            title: "Eloquent JavaScript, Third Edition",
            author: "Marijn Haverbeke",
          },
          { title: "Practical Modern JavaScript", author: "Nicolás Bevacqua" },
          {
            title: "Understanding ECMAScript 6",
            author: "Nicholas C. Zakas",
          },
          { title: "Speaking JavaScript", author: "Axel Rauschmayer" },
          {
            title: "Learning JavaScript Design Patterns",
            author: "Addy Osmani",
          },
          {
            title: "You Don't Know JS Yet",
            author: "Kyle Simpson",
          },
          {
            title: "Pro Git",
            author: "Scott Chacon and Ben Straub",
          },
          {
            title: "Rethinking Productivity in Software Engineering",
            author: "Caitlin Sadowski, Thomas Zimmermann",
          },
          {
            title: "Agile Web Development with Rails",
            author: "Sam Ruby, Dave Thomas, David Heinemeier Hansson",
          },
          { title: "Flask Web Development", author: "Miguel Grinberg" },
          {
            title: "Alex Homer, ASP.NET 2.0 Visual Web Developer 2005",
            author: "David Sussman",
          },
          {
            title:
              "PHP Oracle Web Development: Data processing, Security, Caching, XML, Web Services, and Ajax: A practical guide to combining the power, performance, scalability, time, and high performance of PHP",
            author: "Yuli Vasiliev",
          },
        ],
        (error) => {
          if (error) {
            console.log("error", error);
          } else {
            console.log("Successfully Added Books to database!");
          }
        }
      );
    }
  });
}

module.exports = createTestBooksData;

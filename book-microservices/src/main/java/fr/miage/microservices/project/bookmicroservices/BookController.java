package fr.miage.microservices.project.bookmicroservices;

import fr.miage.microservices.project.bookmicroservices.exceptions.BookAlreadyExistsException;
import fr.miage.microservices.project.bookmicroservices.exceptions.BookNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@SpringBootApplication
@RestController
public class BookController {

    @Autowired
    private IBookRepository repository;

    /**
     * Get All Books (Uri: book/)
     * @return List of Book elements
     */
    @GetMapping("/book")
    public List<Book> getAll() {
        List<Book> books = repository.findAll();
        return books;
    }

    /**
     * Get one book from the database using the isbn identifier
     * @param isbn of the book required
     * @return the book bind to the isbn
     */
    @GetMapping("/book/{isbn}")
    public Book getBook(@PathVariable Long isbn) throws BookNotFoundException {
        Optional<Book> book = repository.findById(isbn);
        if(book.isPresent())
            return book.get();
        throw new BookNotFoundException();
    }

    /**
     * Add a book to the database
     * @param book
     */
    @PostMapping(path="/book/create", consumes="application/json", produces="application/json")
    public void addBook(@RequestBody Book book) throws BookAlreadyExistsException {
        if(repository.existsById(book.getIsbn()))
            throw new BookAlreadyExistsException();
        repository.save(book);
    }
    @PutMapping(path="/book/update", consumes="application/json", produces="application/json")
    public void updateBook(@RequestBody Book book) throws BookNotFoundException {
        if(repository.existsById(book.getIsbn()))
            repository.save(book);
        else
            throw new BookNotFoundException();
    }
    @DeleteMapping(path="/book/delete/{isbn}")
    public void DeleteBook(@PathVariable Long isbn) throws BookNotFoundException {
        Optional<Book> book = repository.findById(isbn);
        if(book.isPresent())
            repository.delete(book.get());
        else
            throw new BookNotFoundException();
    }
    @DeleteMapping(path="/book/delete", consumes = "application/json", produces = "application/json")
    public void DeleteBook(@RequestBody Book book) throws BookNotFoundException {
        if(repository.existsById(book.getIsbn()))
            repository.delete(book);
        else
            throw new BookNotFoundException();
    }
}

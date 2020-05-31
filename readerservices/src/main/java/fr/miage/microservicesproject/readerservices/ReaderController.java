package fr.miage.microservicesproject.readerservices;

import fr.miage.microservicesproject.readerservices.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost/front/*")
@RestController
public class ReaderController {

    @Autowired
    private IReaderRepository repository;

    @GetMapping("/reader")
    public List<Reader> getAll()
    {
        return repository.findAll();
    }

    @GetMapping("/reader/{id}")
    public Reader getReader(@PathVariable Long id) throws ReaderNotFoundException {
        Optional<Reader> reader = repository.findById(id);
        if(reader.isPresent())
            return reader.get();
        throw new ReaderNotFoundException();
    }
    @PostMapping(path="/reader/create", consumes = "application/json", produces="application/json")
    public void addReader(@RequestBody Reader reader) throws ReaderAlreadyExistsException {
        if(repository.existsById(reader.getId()))
            throw new ReaderAlreadyExistsException();
        repository.save(reader);
    }
    @DeleteMapping(path="/reader/delete/{id}")
    public void deleteReader(@PathVariable Long id) throws ReaderNotFoundException {
        if(repository.existsById(id))
            repository.deleteById(id);
        else
            throw new ReaderNotFoundException();
    }

    @PutMapping(path="/reader/update")
    public void updateReader(@RequestBody Reader reader) throws ReaderNotFoundException {
        if(repository.existsById(reader.getId()))
            repository.save(reader);
        else
            throw new ReaderNotFoundException();
    }
}
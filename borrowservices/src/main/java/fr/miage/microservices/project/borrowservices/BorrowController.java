package fr.miage.microservices.project.borrowservices;

import fr.miage.microservices.project.borrowservices.execptions.BorrowAlreadyReturnException;
import fr.miage.microservices.project.borrowservices.execptions.BorrowNotFoundException;
import fr.miage.microservices.project.borrowservices.execptions.DateFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
@RestController
public class BorrowController {
    @Autowired
    private IBorrowRepository repository;

    @GetMapping("/borrow")
    private List<Borrow> getAll()
    {
        return repository.findAll();
    }

    @GetMapping("/borrow/current")
    private List<Borrow> getCurrentBorrow()
    {
        return repository.findBorrowsByDateReturnIsNull();
        //return repository.findAll().stream().filter(x -> x.getDateReturn() == null).collect(Collectors.toList());
    }

    @GetMapping("/borrow/bydateborrow/{dateBorrow}")
    public List<Borrow> getBorrows(@PathVariable String dateBorrow) throws DateFormatException {
        try {
            Date dateBor = new SimpleDateFormat("yyyy-MM-dd").parse(dateBorrow);
            return repository.findBorrowsByDateBorrow(dateBor);
        }catch (ParseException ex)
        {
            throw new DateFormatException();
        }
    }
    @GetMapping("/borrow/byreader/{reader}")
    public List<Borrow> getBorrowsFromReader(@PathVariable Long reader)
    {
        return repository.findBorrowsByReaderEquals(reader);
    }

    @PostMapping(path="/borrow/create", consumes = "application/json", produces ="application/json")
    public void createBorrow(@RequestBody Borrow _borrow) throws BorrowAlreadyReturnException {
        if(repository.existsById(_borrow.getId()))
            throw new BorrowAlreadyReturnException();
        repository.save(_borrow);
    }
    @PutMapping("/borrow/return")
    public void returnBorrow(@RequestBody Borrow _borrow) throws BorrowNotFoundException, BorrowAlreadyReturnException {
        Optional<Borrow> borrow = repository.findById(_borrow.getId());
        if(borrow.isPresent()) {
            if (borrow.get().getDateReturn() == null)
                repository.save(_borrow);
            else
                throw new BorrowAlreadyReturnException();
        }
        else
            throw new BorrowNotFoundException();
    }
    @DeleteMapping("borrow/delete/{id]")
    public void deleteBorrow(@PathVariable Long id) throws BorrowNotFoundException {
        if(repository.existsById(id))
            repository.deleteById(id);
        else
            throw new BorrowNotFoundException();
    }

}

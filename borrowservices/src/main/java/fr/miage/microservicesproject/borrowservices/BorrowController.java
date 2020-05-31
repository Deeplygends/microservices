package fr.miage.microservicesproject.borrowservices;


import fr.miage.microservicesproject.borrowservices.exceptions.BorrowAlreadyReturnException;
import fr.miage.microservicesproject.borrowservices.exceptions.BorrowNotFoundException;
import fr.miage.microservicesproject.borrowservices.exceptions.DateFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

        if(_borrow.getId() != null)
            throw new BorrowAlreadyReturnException();
        Calendar today = Calendar.getInstance();
        _borrow.setDateBorrow(today.getTime());
        repository.save(_borrow);
    }
    @PostMapping("/borrow/return/{id}")
    public void returnBorrow(@PathVariable Long id) throws BorrowNotFoundException, BorrowAlreadyReturnException {
        Optional<Borrow> borrow = repository.findById(id);
        if(borrow.isPresent()) {
            Borrow toSave = borrow.get();
            if (toSave.getDateReturn() == null) {
                Calendar today = Calendar.getInstance();
                toSave.setDateReturn(today.getTime());
                repository.save(toSave);
            }
            else
                throw new BorrowAlreadyReturnException();
        }
        else
            throw new BorrowNotFoundException();
    }
    @DeleteMapping("/borrow/delete/{id}")
    public void deleteBorrow(@PathVariable Long id) throws BorrowNotFoundException {
        if(repository.existsById(id))
            repository.deleteById(id);
        else
            throw new BorrowNotFoundException();
    }
    @DeleteMapping("/borrow/deleteByBook/{isbn}")
    public void deleteBorrowBook(@PathVariable Long isbn) throws BorrowNotFoundException {
        repository.deleteAll(repository.findBorrowsByIsbnEquals(isbn));
    }
    @DeleteMapping("/borrow/deleteByReader/{reader}")
    public void deleteBorrowReader(@PathVariable Long reader)  {
        repository.deleteAll(repository.findBorrowsByReaderEquals(reader));
    }

}
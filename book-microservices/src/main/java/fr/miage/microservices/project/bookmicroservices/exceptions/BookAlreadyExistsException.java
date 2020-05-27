package fr.miage.microservices.project.bookmicroservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Book with this isbn already exits in database")
public class BookAlreadyExistsException extends Exception{
    public BookAlreadyExistsException(){}
}

package fr.miage.microservicesproject.bookservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Isbn not found")
public class BookNotFoundException extends Exception {
    public BookNotFoundException() {
    }
}

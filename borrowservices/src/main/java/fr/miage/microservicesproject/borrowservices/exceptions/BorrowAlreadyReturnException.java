package fr.miage.microservicesproject.borrowservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT, reason ="The borrow has already been return")
public class BorrowAlreadyReturnException extends Exception {
}


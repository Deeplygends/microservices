package fr.miage.microservicesproject.borrowservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND, reason = "Borrow id is not present in the database")
public class BorrowNotFoundException extends Exception{
}
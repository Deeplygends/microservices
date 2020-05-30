package fr.miage.microservicesproject.readerservices.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason= "Reader id does not exist")
public class ReaderNotFoundException extends Exception {
}

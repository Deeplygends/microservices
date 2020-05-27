package fr.miage.microservices.project.readermicroservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason= "Reader already exists in database")
public class ReaderAlreadyExistsException extends Exception{
}

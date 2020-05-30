package fr.miage.microservicesproject.borrowservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.BAD_REQUEST, reason = "Date is not at the correct format : format expected 'yyyy-MM-dd'")
public class DateFormatException extends Exception {
}
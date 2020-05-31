package fr.miage.microservicesproject.borrowservices;


import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name="borrow")
public class Borrow {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="isbn")
    private Long isbn;

    @Column(name="reader")
    private Long reader;

    @Column(name="date_borrow")
    private Date dateBorrow;


    @Column(name="date_return")
    private Date dateReturn;

    //proxy date
    private String dateBorrowString;
    private String dateReturnString;

    public Borrow(){}
    public Borrow(Long _isbn, Long _reader, Date _dateBorrow, Date _dateReturn)
    {
        this.isbn = _isbn;
        this.reader = _reader;
        this.dateBorrow = _dateBorrow;
        this.dateReturn = _dateReturn;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }

    public Long getReader() {
        return reader;
    }

    public void setReader(Long reader) {
        this.reader = reader;
    }

    public Date getDateBorrow() {
        return dateBorrow;
    }

    public void setDateBorrow(Date dateBorrow) {
        this.dateBorrow = dateBorrow;
    }

    public Date getDateReturn() {
        return dateReturn;
    }

    public void setDateReturn(Date dateReturn) {
        this.dateReturn = dateReturn;
    }

    public String getDateBorrowString() {
        return dateBorrowString;
    }

    public void setDateBorrowString(String dateBorrowString) throws ParseException {
        this.dateBorrowString = dateBorrowString;
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        dateBorrow =  format.parse(dateBorrowString);
    }

    public String getDateReturnString() {
        return dateReturnString;
    }

    public void setDateReturnString(String dateReturnString) throws ParseException {
        this.dateReturnString = dateReturnString;
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        dateReturn =  format.parse(dateReturnString);
    }
}
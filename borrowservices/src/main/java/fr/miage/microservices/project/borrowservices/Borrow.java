package fr.miage.microservices.project.borrowservices;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="borrow")
public class Borrow {
    @Id
    private Long id;

    @Column(name="isbn")
    private Long isbn;

    @Column(name="reader")
    private Long reader;

    @Column(name="dateBorrow")
    private Date dateBorrow;

    @Column(name="dateReturn")
    private Date dateReturn;

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
}

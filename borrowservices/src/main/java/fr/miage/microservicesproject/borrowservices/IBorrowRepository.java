package fr.miage.microservicesproject.borrowservices;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface IBorrowRepository extends JpaRepository<Borrow, Long> {

    List<Borrow> findBorrowsByDateBorrow(Date dateBorrow);
    List<Borrow> findBorrowsByDateReturnIsNull();
    List<Borrow> findBorrowsByReaderEquals(Long reader);
    List<Borrow> findBorrowsByIsbnEquals(Long isbn);
}

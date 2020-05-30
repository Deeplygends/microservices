package fr.miage.microservicesproject.readerservices;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IReaderRepository extends JpaRepository<Reader, Long> {
}


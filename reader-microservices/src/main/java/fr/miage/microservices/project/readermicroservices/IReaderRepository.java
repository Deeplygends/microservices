package fr.miage.microservices.project.readermicroservices;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IReaderRepository extends JpaRepository<Reader, Long> {
}

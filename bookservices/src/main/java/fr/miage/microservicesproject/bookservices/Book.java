package fr.miage.microservicesproject.bookservices;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "book")
public class Book {
    @Id
    private Long isbn;

    @Column(name = "auteur")
    private String auteur;

    @Column(name = "titre")
    private String titre;

    @Column(name = "editeur")
    private String editeur;

    @Column(name = "edition")
    private int edition;

    public Book() {
    }

    public Book(Long _isbn, String _auteur, String _titre, String _editeur, int _edition) {
        isbn = _isbn;
        titre = _titre;
        auteur = _auteur;
        editeur = _editeur;
        edition = _edition;
    }

    public Long getIsbn() {
        return isbn;
    }

    public String getAuteur() {
        return auteur;
    }

    public String getTitre() {
        return titre;
    }

    public String getEditeur() {
        return editeur;
    }

    public int getEdition() {
        return edition;
    }

    public void setIsbn(Long _isbn) {
        isbn = _isbn;
    }

    public void setAuteur(String _auteur) {
        auteur = _auteur;
    }

    public void setTitre(String _titre) {
        titre = _titre;
    }

    public void setEditeur(String _editeur) {
        editeur = _editeur;
    }

    public void setEdition(int _edition) {
        edition = _edition;
    }

}

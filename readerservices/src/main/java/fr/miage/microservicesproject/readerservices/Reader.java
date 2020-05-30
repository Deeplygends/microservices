package fr.miage.microservicesproject.readerservices;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="reader")
public class Reader {
    @Id
    private long id;

    @Column(name="last_name")
    private String lastName;

    @Column(name="first_name")
    private String firstName;

    @Column(name="gender")
    private char gender;

    @Column(name="date_birth")
    private Date dateBirth;

    @Column(name="address")
    private String address;

    public Reader() {}

    public Reader(Long _id, String _lastName, String _firstName, char _gender, Date _dateBirth, String _address)
    {
        id = _id;
        lastName = _lastName;
        firstName = _firstName;
        gender = _gender;
        dateBirth = _dateBirth;
        address = _address;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public Date getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(Date dateBirth) {
        this.dateBirth = dateBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}


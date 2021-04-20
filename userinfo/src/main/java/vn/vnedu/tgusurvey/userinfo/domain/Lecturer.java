package vn.vnedu.tgusurvey.userinfo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import vn.vnedu.tgusurvey.userinfo.domain.enumeration.Gender;

/**
 * A Lecturer.
 */
@Entity
@Table(name = "lecturer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Lecturer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 8, max = 20)
    @Column(name = "msgv", length = 20, nullable = false, unique = true)
    private String msgv;

    @NotNull
    @Column(name = "birth_day", nullable = false)
    private LocalDate birthDay;

    
    @Lob
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotNull
    @Size(max = 9)
    @Column(name = "cmnd", length = 9, nullable = false)
    private String cmnd;

    @NotNull
    @Size(max = 10)
    @Column(name = "phone_number", length = 10, nullable = false)
    private String phoneNumber;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne
    @JoinColumn(unique = true)
    private Position position;

    @ManyToOne
    @JsonIgnoreProperties(value = "lecturers", allowSetters = true)
    private Unit unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMsgv() {
        return msgv;
    }

    public Lecturer msgv(String msgv) {
        this.msgv = msgv;
        return this;
    }

    public void setMsgv(String msgv) {
        this.msgv = msgv;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }

    public Lecturer birthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
        return this;
    }

    public void setBirthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
    }

    public String getAddress() {
        return address;
    }

    public Lecturer address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Gender getGender() {
        return gender;
    }

    public Lecturer gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getCmnd() {
        return cmnd;
    }

    public Lecturer cmnd(String cmnd) {
        this.cmnd = cmnd;
        return this;
    }

    public void setCmnd(String cmnd) {
        this.cmnd = cmnd;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Lecturer phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public User getUser() {
        return user;
    }

    public Lecturer user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Position getPosition() {
        return position;
    }

    public Lecturer position(Position position) {
        this.position = position;
        return this;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Unit getUnit() {
        return unit;
    }

    public Lecturer unit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lecturer)) {
            return false;
        }
        return id != null && id.equals(((Lecturer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Lecturer{" +
            "id=" + getId() +
            ", msgv='" + getMsgv() + "'" +
            ", birthDay='" + getBirthDay() + "'" +
            ", address='" + getAddress() + "'" +
            ", gender='" + getGender() + "'" +
            ", cmnd='" + getCmnd() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            "}";
    }
}

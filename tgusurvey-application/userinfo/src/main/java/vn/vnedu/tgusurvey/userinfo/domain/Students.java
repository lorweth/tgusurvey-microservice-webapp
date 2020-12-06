package vn.vnedu.tgusurvey.userinfo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import vn.vnedu.tgusurvey.userinfo.domain.enumeration.Gender;

import vn.vnedu.tgusurvey.userinfo.domain.enumeration.GraduationStatus;

/**
 * A Students.
 */
@Entity
@Table(name = "students")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Students implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 8, max = 20)
    @Column(name = "mssv", length = 20, nullable = false, unique = true)
    private String mssv;

    @NotNull
    @Column(name = "birth_day", nullable = false)
    private LocalDate birthDay;

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

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "graduation_status", nullable = false)
    private GraduationStatus graduationStatus;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "students", allowSetters = true)
    private Classroom classroom;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMssv() {
        return mssv;
    }

    public Students mssv(String mssv) {
        this.mssv = mssv;
        return this;
    }

    public void setMssv(String mssv) {
        this.mssv = mssv;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }

    public Students birthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
        return this;
    }

    public void setBirthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
    }

    public Gender getGender() {
        return gender;
    }

    public Students gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getCmnd() {
        return cmnd;
    }

    public Students cmnd(String cmnd) {
        this.cmnd = cmnd;
        return this;
    }

    public void setCmnd(String cmnd) {
        this.cmnd = cmnd;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Students phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public GraduationStatus getGraduationStatus() {
        return graduationStatus;
    }

    public Students graduationStatus(GraduationStatus graduationStatus) {
        this.graduationStatus = graduationStatus;
        return this;
    }

    public void setGraduationStatus(GraduationStatus graduationStatus) {
        this.graduationStatus = graduationStatus;
    }

    public User getUser() {
        return user;
    }

    public Students user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public Students classroom(Classroom classroom) {
        this.classroom = classroom;
        return this;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Students)) {
            return false;
        }
        return id != null && id.equals(((Students) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Students{" +
            "id=" + getId() +
            ", mssv='" + getMssv() + "'" +
            ", birthDay='" + getBirthDay() + "'" +
            ", gender='" + getGender() + "'" +
            ", cmnd='" + getCmnd() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", graduationStatus='" + getGraduationStatus() + "'" +
            "}";
    }
}

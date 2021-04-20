package vn.vnedu.tgusurvey.userinfo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Enterprise.
 */
@Entity
@Table(name = "enterprise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Enterprise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Size(max = 10)
    @Column(name = "phone_number", length = 10, nullable = false)
    private String phoneNumber;

    @NotNull
    @Column(name = "representative", nullable = false)
    private String representative;

    @NotNull
    @Column(name = "line_of_bussiness", nullable = false)
    private String lineOfBussiness;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Enterprise name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Enterprise address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Enterprise phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRepresentative() {
        return representative;
    }

    public Enterprise representative(String representative) {
        this.representative = representative;
        return this;
    }

    public void setRepresentative(String representative) {
        this.representative = representative;
    }

    public String getLineOfBussiness() {
        return lineOfBussiness;
    }

    public Enterprise lineOfBussiness(String lineOfBussiness) {
        this.lineOfBussiness = lineOfBussiness;
        return this;
    }

    public void setLineOfBussiness(String lineOfBussiness) {
        this.lineOfBussiness = lineOfBussiness;
    }

    public User getUser() {
        return user;
    }

    public Enterprise user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Enterprise)) {
            return false;
        }
        return id != null && id.equals(((Enterprise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Enterprise{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", representative='" + getRepresentative() + "'" +
            ", lineOfBussiness='" + getLineOfBussiness() + "'" +
            "}";
    }
}

// Students, Lecturer, Enterprise, Classroom, Unit, Position

enum Gender {
    MALE
    FEMALE
}

enum GraduationStatus {
    GRADUATED
    PENDING
}

entity Classroom {
    mslh String minlength(3) maxlength(20) required unique
    name String required
}

entity Students {
    mssv String minlength(8) maxlength(20) required unique
    birthDay LocalDate required
    gender Gender required
    cmnd String maxlength(9) required
    phoneNumber String maxlength(10) required
    graduationStatus GraduationStatus required
}

// Đơn vị của Trường
entity Unit {
    name String required
}

// Giảng viên
entity Lecturer {
    msgv String minlength(8) maxlength(20) required unique
    birthDay LocalDate required
    address TextBlob required
    gender Gender required
    cmnd String maxlength(9) required
    phoneNumber String maxlength(10) required
}

// Chức vụ
entity Position {
    mscv String minlength(5) maxlength(20) required unique
    name String required
}

// Doanh nghiệp
entity Enterprise{
    name String required
    address String required
    phoneNumber String maxlength(10) required
    representative String required // Tên người đại diện
    lineOfBussiness String required // lĩnh vực kinh doanh
}

/**
 * Many to one relationship.
 */
relationship ManyToOne {
    Students{classroom(mslh)} to Classroom
    Lecturer{unit(name)} to Unit
}

/**
 * One to one relationship.
 */
relationship OneToOne {
    Lecturer{user(login)} to User
    Students{user(login)} to User
    Enterprise{user(login)} to User
    Lecturer{position(name)} to Position
}

paginate * with pagination

microservice Students, Lecturer, Enterprise, Classroom, Unit, Position with userinfo
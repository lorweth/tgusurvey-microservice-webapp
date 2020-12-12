package vn.vnedu.tgusurvey.tgusurvey.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String STUDENTS = "ROLE_STUDENTS"; // thêm tên quyền học sinh

    public static final String LECTURERS = "ROLE_LECTURERS"; // thêm tên quyền giảng viên

    public static final String ENTERPRISES = "ROLE_ENTERPRISES"; // thêm tên quyền doanh nghiệp

    private AuthoritiesConstants() {
    }
}

package ticket.booking.util;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class UserServiceUtil {
    public static String hashPassword(String plainPassword){
        if (plainPassword == null || plainPassword.trim().isEmpty()) {
            return null;
        }
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    public static boolean checkPassword(String plainPassword, String hashedPassword){
        if (plainPassword == null || hashedPassword == null) {
            return false;
        }
        try {
            return BCrypt.checkpw(plainPassword, hashedPassword);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
package ticket.booking.util;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthFilter implements Filter {
    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    private static final String[] PUBLIC_EXACT_PATHS = {
            "/api/users/signup",
            "/api/users/login",
            "/api/trains/search",
            "/api/trains/stations"
    };

    private boolean isPublicPath(String path) {
        for (String exact : PUBLIC_EXACT_PATHS) {
            if (path.equals(exact)) return true;
        }
        // matches /api/trains/{anything}/schedule
        return path.matches("^/api/trains/[^/]+/schedule$");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException{
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        String path = request.getRequestURI();

        if (isPublicPath(path)) {
            chain.doFilter(req, res);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Missing or malformed Authorization header");
            return;
        }

        String token = authHeader.substring(7);
        if(!jwtUtil.isTokenValid(token)){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired token");
            return;
        }

        request.setAttribute("authenticatedUserId", jwtUtil.extractUserId(token));
        chain.doFilter(req, res);
    }
}

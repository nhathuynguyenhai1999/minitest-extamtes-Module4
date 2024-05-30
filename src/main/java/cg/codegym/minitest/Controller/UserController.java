package cg.codegym.minitest.Controller;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

@Controller
@RequestMapping("/login")
public class UserController {
    @GetMapping("/success")
    public ModelAndView index() {
        return new ModelAndView("/index");
    }

    @GetMapping("/user")
    public ModelAndView user(Principal principal) {
        // Get authenticated username from Principal
        System.out.println(principal.getName());
        return new ModelAndView("/user");
    }

    @GetMapping("/admin")
    public ModelAndView admin() {
        // Get authenticated username from SecurityContext
        SecurityContext context = SecurityContextHolder.getContext();
        System.out.println(context.getAuthentication().getName());
        return new ModelAndView("/admin");
    }
}

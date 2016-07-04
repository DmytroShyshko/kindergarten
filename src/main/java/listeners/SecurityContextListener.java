package listeners;

import dao.UserEntity;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Dmytro Shyshko on 7/1/2016.
 */
public class SecurityContextListener implements ServletContextListener {
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        ServletContext context = servletContextEvent.getServletContext();
        context.setAttribute("tokens", new ConcurrentHashMap<String, UserEntity>());
    }

    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}

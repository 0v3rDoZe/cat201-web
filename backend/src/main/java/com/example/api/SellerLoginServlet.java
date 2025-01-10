package com.example.api;

import com.example.model.User;
import com.example.service.UserService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/seller-login")
public class SellerLoginServlet extends HttpServlet {
    private UserService userService;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        userService = new UserService("src/main/resources/sellerData.json");
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        BufferedReader reader = req.getReader();
        User loginUser = gson.fromJson(reader, User.class);

        boolean loginStatus = userService.validateLogin(loginUser.getEmail(), loginUser.getPassword());

        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("loginStatus", loginStatus);

        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().write(gson.toJson(jsonResponse));
    }
}

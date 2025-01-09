package com.example.api;

import com.example.service.AdminService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@WebServlet("/api/admin-login")
public class AdminLoginServlet extends HttpServlet {
    private AdminService adminService;

    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("AdminLoginServlet initialized.");
        adminService = new AdminService("src/main/resources/adminData.json");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

        // Read request body
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }

        // Parse JSON request body
        Gson gson = new Gson();
        Map<String, String> loginData = gson.fromJson(sb.toString(), Map.class);
        String email = loginData.get("email");
        String password = loginData.get("password");

        System.out.println("AdminLoginServlet POST request received with parameters: " + email + " = " + password);

        // Validate admin login
        boolean loginStatus = adminService.validateLogin(email, password);

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("loginStatus", loginStatus);

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();

        System.out.println("AdminLoginServlet response: " + jsonResponse.toString());
    }
}

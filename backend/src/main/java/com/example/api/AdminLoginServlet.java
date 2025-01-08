package com.example.api;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

@WebServlet("/api/admin-login")
public class AdminLoginServlet extends HttpServlet {
    private static final String ADMIN_DATA_FILE = "src/main/resources/adminData.json";
    private List<Map<String, String>> admins;

    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("AdminLoginServlet initialized.");

        // Load admin data from adminData.json
        try (BufferedReader reader = new BufferedReader(new FileReader(ADMIN_DATA_FILE))) {
            Type adminListType = new TypeToken<List<Map<String, String>>>() {}.getType();
            admins = new Gson().fromJson(reader, adminListType);
        } catch (IOException e) {
            throw new ServletException("Unable to read admin data", e);
        }
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
        boolean loginStatus = admins.stream()
                .anyMatch(admin -> admin.get("email").equals(email) && admin.get("password").equals(password));

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("loginStatus", loginStatus);

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }
}

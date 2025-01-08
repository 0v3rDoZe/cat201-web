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

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {
    private static final String USER_DATA_FILE = "src/main/resources/userData.json";
    private List<Map<String, String>> users;

    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("LoginServlet initialized.");

        // Load user data from userData.json
        try (BufferedReader reader = new BufferedReader(new FileReader(USER_DATA_FILE))) {
            Type userListType = new TypeToken<List<Map<String, String>>>() {}.getType();
            users = new Gson().fromJson(reader, userListType);
        } catch (IOException e) {
            throw new ServletException("Unable to read user data", e);
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

        System.out.println("LoginServlet POST request received with parameters: " + email + " = " + password);

        // Validate user login
        boolean loginStatus = users.stream()
                .anyMatch(user -> user.get("email").equals(email) && user.get("password").equals(password));

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("loginStatus", loginStatus);

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }
}

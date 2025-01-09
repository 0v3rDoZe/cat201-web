package com.example.api;

import com.example.model.User;
import com.example.service.UserService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@WebServlet("/api/users")
public class UserServlet extends HttpServlet {
    private UserService userService;

    @Override
    public void init() throws ServletException {
        super.init();
        userService = new UserService("src/main/resources/userData.json");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        // Create JSON response
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(userService.getUsers());

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
        User newUser = gson.fromJson(sb.toString(), User.class);

        // Add new user
        userService.addUser(newUser);

        // Save changes to file
        saveUsersToFile();

        // Create JSON response
        String jsonResponse = gson.toJson(newUser);

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
        User updatedUser = gson.fromJson(sb.toString(), User.class);

        // Update user
        userService.updateUser(updatedUser);

        // Save changes to file
        saveUsersToFile();

        // Create JSON response
        String jsonResponse = gson.toJson(updatedUser);

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
        Map<String, String> requestData = gson.fromJson(sb.toString(), Map.class);
        String email = requestData.get("email");

        // Delete user
        userService.deleteUser(email);

        // Save changes to file
        saveUsersToFile();

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("status", "success");

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }

    private void saveUsersToFile() throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter("src/main/resources/userData.json")) {
            gson.toJson(userService.getUsers(), writer);
        }
    }
}

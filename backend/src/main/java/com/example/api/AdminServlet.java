package com.example.api;

import com.example.model.Admin;
import com.example.service.AdminService;
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

@WebServlet("/api/admins")
public class AdminServlet extends HttpServlet {
    private AdminService adminService;

    @Override
    public void init() throws ServletException {
        super.init();
        adminService = new AdminService("src/main/resources/adminData.json");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        // Create JSON response
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(adminService.getAdmins());

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
        Admin newAdmin = gson.fromJson(sb.toString(), Admin.class);

        // Add new admin
        adminService.addAdmin(newAdmin);

        // Save changes to file
        adminService.saveAdminsToFile();

        // Create JSON response
        String jsonResponse = gson.toJson(newAdmin);

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
        Admin updatedAdmin = gson.fromJson(sb.toString(), Admin.class);

        // Update admin
        adminService.updateAdmin(updatedAdmin);

        // Save changes to file
        saveAdminsToFile();

        // Create JSON response
        String jsonResponse = gson.toJson(updatedAdmin);

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

        // Delete admin
        adminService.deleteAdmin(email);

        // Save changes to file
        saveAdminsToFile();

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("status", "success");

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }

    private void saveAdminsToFile() throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter("src/main/resources/adminData.json")) {
            gson.toJson(adminService.getAdmins(), writer);
        }
    }
}

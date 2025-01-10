package com.example.api;

import com.example.model.Car;
import com.example.service.CarService;
import com.example.service.TestDriveService;
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

@WebServlet("/api/cars")
public class CarServlet extends HttpServlet {
    private CarService carService;
    private TestDriveService testDriveService;

    @Override
    public void init() throws ServletException {
        super.init();
        carService = new CarService("src/main/resources/productData.json");
        testDriveService = new TestDriveService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        // Create JSON response
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(carService.getCars());

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
        Car newCar = gson.fromJson(sb.toString(), Car.class);

        // Add new car
        carService.addCar(newCar);

        // Save changes to file
        saveCarsToFile();

        // Create JSON response
        String jsonResponse = gson.toJson(newCar);

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
        Car updatedCar = gson.fromJson(sb.toString(), Car.class);

        // Update car
        carService.updateCar(updatedCar);

        // Save changes to file
        saveCarsToFile();

        // Create JSON response
        String jsonResponse = gson.toJson(updatedCar);

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
        String name = requestData.get("name");

        // Log the name to be deleted
        System.out.println("Deleting car with name: " + name);

        // Delete car
        carService.deleteCar(name);

        // Remove related test drive data
        testDriveService.deleteTestDriveRequestsByCarName(name);

        // Save changes to file
        saveCarsToFile();
        testDriveService.saveTestDriveData();

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("status", "success");

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }

    private void saveCarsToFile() throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter("src/main/resources/productData.json")) {
            gson.toJson(carService.getCars(), writer);
        }
    }
}

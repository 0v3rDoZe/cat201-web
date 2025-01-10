package com.example.api;

import com.example.service.CarService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@WebServlet("/api/purchase")
public class PurchaseServlet extends HttpServlet {
    private List<Map<String, Object>> purchases;
    private String dataFilePath = "src/main/resources/purchaseData.json";
    private CarService carService;

    @Override
    public void init() throws ServletException {
        super.init();
        loadPurchaseData();
        carService = new CarService("src/main/resources/productData.json");
    }

    private void loadPurchaseData() {
        try (BufferedReader reader = new BufferedReader(new FileReader(dataFilePath))) {
            Type purchaseListType = new TypeToken<List<Map<String, Object>>>() {}.getType();
            purchases = new Gson().fromJson(reader, purchaseListType);
        } catch (IOException e) {
            purchases = new ArrayList<>();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        Gson gson = new Gson();
        String jsonResponse = gson.toJson(purchases);

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
        Map<String, Object> purchaseDetails = gson.fromJson(sb.toString(), Map.class);

        // Add payment status based on payment method
        String paymentMethod = (String) purchaseDetails.get("paymentMethod");
        String paymentStatus = "Completed";
        String successMessage = "Congratulations, you have successfully purchased your new car, we will inform the seller of your shipping address. Enjoy your new car!!";
        if ("Cash on Delivery".equals(paymentMethod)) {
            paymentStatus = "Pending";
            successMessage = "Congratulations, you have successfully purchased your new car, we will inform the seller of your shipping address. Please ensure you have the cash ready by then and enjoy your new car!!";
        } else if ("Lease".equals(paymentMethod)) {
            paymentStatus = "Pending";
            successMessage = "Congratulations, you have successfully leased your new car, we will inform the seller of your shipping address. Enjoy your new car!!";
        }
        purchaseDetails.put("paymentStatus", paymentStatus);

        // Add new purchase
        purchases.add(purchaseDetails);

        // Remove car from productData.json
        String carName = (String) purchaseDetails.get("carName");
        carService.deleteCar(carName);

        // Save changes to file
        savePurchasesToFile();
        carService.saveCarsToFile();

        // Create JSON response
        String jsonResponse = gson.toJson(purchaseDetails);

        // Write the response
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }

    private void savePurchasesToFile() throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter(dataFilePath)) {
            gson.toJson(purchases, writer);
        }
    }
}

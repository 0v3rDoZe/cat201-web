package com.example.api;

import com.example.model.Seller;
import com.example.service.SellerService;
import com.example.service.CarService;
import com.example.service.PurchaseService;
import com.example.service.TestDriveService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/sellers")
public class SellerServlet extends HttpServlet {
    private SellerService sellerService;
    private CarService carService;
    private PurchaseService purchaseService;
    private TestDriveService testDriveService;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        sellerService = new SellerService("src/main/resources/sellerData.json");
        carService = new CarService("src/main/resources/productData.json");
        purchaseService = new PurchaseService("src/main/resources/purchaseData.json");
        testDriveService = new TestDriveService();
        gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        List<Seller> sellers = sellerService.getSellers();
        String jsonResponse = gson.toJson(sellers);

        PrintWriter out = resp.getWriter();
        out.write(jsonResponse);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        BufferedReader reader = req.getReader();
        Seller newSeller = gson.fromJson(reader, Seller.class);

        sellerService.addSeller(newSeller);

        saveSellersToFile();

        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().write(gson.toJson(newSeller));
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        BufferedReader reader = req.getReader();
        Seller sellerToDelete = gson.fromJson(reader, Seller.class);

        // Delete seller
        sellerService.deleteSeller(sellerToDelete.getEmail());

        // Remove related cars
        carService.deleteCarsBySellerEmail(sellerToDelete.getEmail());

        // Remove related purchase data
        purchaseService.deletePurchasesBySellerEmail(sellerToDelete.getEmail());

        // Remove related test drive data
        testDriveService.deleteTestDriveRequestsByOwnerEmail(sellerToDelete.getEmail());

        // Save changes to file
        saveSellersToFile();
        carService.saveCarsToFile();
        purchaseService.savePurchasesToFile();
        testDriveService.saveTestDriveData();

        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().write("{\"status\":\"success\"}");
    }

    private void saveSellersToFile() throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter("src/main/resources/sellerData.json")) {
            gson.toJson(sellerService.getSellers(), writer);
        }
    }
}

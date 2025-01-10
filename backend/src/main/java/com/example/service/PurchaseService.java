package com.example.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PurchaseService {
    private List<Map<String, Object>> purchases;
    private String dataFilePath;
    private Gson gson;

    public PurchaseService(String dataFilePath) {
        this.dataFilePath = dataFilePath;
        this.gson = new GsonBuilder().setPrettyPrinting().create();
        loadPurchaseData();
    }

    private void loadPurchaseData() {
        try (BufferedReader reader = new BufferedReader(new FileReader(dataFilePath))) {
            Type purchaseListType = new TypeToken<List<Map<String, Object>>>() {}.getType();
            purchases = gson.fromJson(reader, purchaseListType);
        } catch (IOException e) {
            purchases = new ArrayList<>();
        }
    }

    public List<Map<String, Object>> getPurchases() {
        return purchases;
    }

    public void addPurchase(Map<String, Object> purchase) {
        purchases.add(purchase);
    }

    public void deletePurchasesByUserEmail(String email) {
        purchases.removeIf(purchase -> purchase.get("userEmail").equals(email));
    }

    public void deletePurchasesBySellerEmail(String email) {
        purchases.removeIf(purchase -> purchase.get("ownerEmail").equals(email));
    }

    public void savePurchasesToFile() throws IOException {
        try (Writer writer = new FileWriter(dataFilePath)) {
            gson.toJson(purchases, writer);
        }
    }
}

package com.example.service;

import com.example.model.Seller;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class SellerService {
    private List<Seller> sellers;
    private String filePath;

    public SellerService(String filePath) {
        this.filePath = filePath;
        this.sellers = loadSellersFromFile();
    }

    private List<Seller> loadSellersFromFile() {
        try (FileReader reader = new FileReader(filePath)) {
            Type listType = new TypeToken<ArrayList<Seller>>() {}.getType();
            return new Gson().fromJson(reader, listType);
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveSellersToFile() {
        try (FileWriter writer = new FileWriter(filePath)) {
            new Gson().toJson(sellers, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Seller> getSellers() {
        return sellers;
    }

    public void addSeller(Seller seller) {
        sellers.add(seller);
        saveSellersToFile();
    }

    public void deleteSeller(String email) {
        sellers.removeIf(seller -> seller.getEmail().equals(email));
        saveSellersToFile();
    }
}

package com.example.service;

import com.example.model.Admin;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

public class AdminService {
    private List<Admin> admins;
    private String dataFilePath;

    public AdminService(String dataFilePath) throws ServletException {
        this.dataFilePath = dataFilePath;
        loadAdminData(dataFilePath);
    }

    private void loadAdminData(String dataFilePath) throws ServletException {
        try (BufferedReader reader = new BufferedReader(new FileReader(dataFilePath))) {
            Type adminListType = new TypeToken<List<Admin>>() {}.getType();
            admins = new Gson().fromJson(reader, adminListType);
        } catch (IOException e) {
            throw new ServletException("Unable to read admin data", e);
        }
    }

    public List<Admin> getAdmins() {
        return admins;
    }

    public void addAdmin(Admin admin) {
        admins.add(admin);
    }

    public void updateAdmin(Admin updatedAdmin) {
        for (int i = 0; i < admins.size(); i++) {
            if (admins.get(i).getEmail().equals(updatedAdmin.getEmail())) {
                admins.set(i, updatedAdmin);
                return;
            }
        }
    }

    public void deleteAdmin(String email) {
        admins.removeIf(admin -> admin.getEmail().equals(email));
    }

    public boolean validateLogin(String email, String password) {
        return admins.stream()
                .anyMatch(admin -> admin.getEmail().equals(email) && admin.getPassword().equals(password));
    }

    public void saveAdminsToFile() throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter(dataFilePath)) {
            gson.toJson(admins, writer);
        }
    }
}

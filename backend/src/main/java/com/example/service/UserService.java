package com.example.service;

import com.example.model.User;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

public class UserService {
    private List<User> users;

    public UserService(String dataFilePath) throws ServletException {
        loadUserData(dataFilePath);
    }

    private void loadUserData(String dataFilePath) throws ServletException {
        try (BufferedReader reader = new BufferedReader(new FileReader(dataFilePath))) {
            Type userListType = new TypeToken<List<User>>() {}.getType();
            users = new Gson().fromJson(reader, userListType);
        } catch (IOException e) {
            throw new ServletException("Unable to read user data", e);
        }
    }

    public List<User> getUsers() {
        return users;
    }

    public void addUser(User user) {
        users.add(user);
    }

    public void updateUser(User updatedUser) {
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getEmail().equals(updatedUser.getEmail())) {
                users.set(i, updatedUser);
                return;
            }
        }
    }

    public void deleteUser(String email) {
        users.removeIf(user -> user.getEmail().equals(email));
    }

    public boolean validateLogin(String email, String password) {
        return users.stream()
                .anyMatch(user -> user.getEmail().equals(email) && user.getPassword().equals(password));
    }
}

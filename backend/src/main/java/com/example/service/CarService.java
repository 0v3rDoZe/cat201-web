package com.example.service;

import com.example.model.Car;
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

public class CarService {
    private List<Car> cars;
    private String dataFilePath;

    public CarService(String dataFilePath) throws ServletException {
        this.dataFilePath = dataFilePath;
        loadCarData(dataFilePath);
    }

    private void loadCarData(String dataFilePath) throws ServletException {
        try (BufferedReader reader = new BufferedReader(new FileReader(dataFilePath))) {
            Type carListType = new TypeToken<List<Car>>() {}.getType();
            cars = new Gson().fromJson(reader, carListType);
        } catch (IOException e) {
            throw new ServletException("Unable to read car data", e);
        }
    }

    public List<Car> getCars() {
        return cars;
    }

    public void addCar(Car car) {
        cars.add(car);
    }

    public void updateCar(Car updatedCar) {
        for (int i = 0; i < cars.size(); i++) {
            if (cars.get(i).getName().equals(updatedCar.getName())) {
                cars.set(i, updatedCar);
                return;
            }
        }
    }

    public void deleteCar(String name) {
        cars.removeIf(car -> car.getName().equals(name));
    }

    public void saveCarsToFile() throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter(dataFilePath)) {
            gson.toJson(cars, writer);
        }
    }
}

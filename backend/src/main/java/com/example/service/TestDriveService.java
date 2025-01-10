package com.example.service;

import com.example.model.TestDriveRequest;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class TestDriveService {
    private static final String TEST_DRIVE_DATA_FILE = "src/main/resources/TestDriveData.json";
    private Gson gson;

    public TestDriveService() {
        gson = new GsonBuilder().setPrettyPrinting().create();
    }

    public void addTestDriveRequest(TestDriveRequest testDriveRequest) {
        List<TestDriveRequest> testDriveRequests = loadTestDriveData();
        testDriveRequests.add(testDriveRequest);
        saveTestDriveData(testDriveRequests);
    }

    public List<TestDriveRequest> getAllTestDriveRequests() {
        return loadTestDriveData();
    }

    public void deleteTestDriveRequest(String name, String email, String carModel, String date, String ownerEmail) {
        List<TestDriveRequest> testDriveRequests = loadTestDriveData();
        testDriveRequests.removeIf(request -> 
            request.getName().equals(name) && 
            request.getEmail().equals(email) && 
            request.getCarModel().equals(carModel) && 
            request.getDate().equals(date) && 
            request.getOwnerEmail().equals(ownerEmail)
        );
        saveTestDriveData(testDriveRequests);
    }

    public void deleteTestDriveRequestsByUserEmail(String email) {
        List<TestDriveRequest> testDriveRequests = loadTestDriveData();
        testDriveRequests.removeIf(request -> request.getEmail().equals(email));
        saveTestDriveData(testDriveRequests);
    }

    public void deleteTestDriveRequestsByOwnerEmail(String ownerEmail) {
        List<TestDriveRequest> testDriveRequests = loadTestDriveData();
        testDriveRequests.removeIf(request -> request.getOwnerEmail().equals(ownerEmail));
        saveTestDriveData(testDriveRequests);
    }

    public void deleteTestDriveRequestsByCarName(String carName) {
        List<TestDriveRequest> testDriveRequests = loadTestDriveData();
        testDriveRequests.removeIf(request -> request.getCarModel().equals(carName));
        saveTestDriveData(testDriveRequests);
    }

    private List<TestDriveRequest> loadTestDriveData() {
        try (Reader reader = new FileReader(TEST_DRIVE_DATA_FILE)) {
            Type listType = new TypeToken<ArrayList<TestDriveRequest>>() {}.getType();
            return gson.fromJson(reader, listType);
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    public void saveTestDriveData() {
        List<TestDriveRequest> testDriveRequests = loadTestDriveData();
        saveTestDriveData(testDriveRequests);
    }

    private void saveTestDriveData(List<TestDriveRequest> testDriveRequests) {
        try (Writer writer = new FileWriter(TEST_DRIVE_DATA_FILE)) {
            gson.toJson(testDriveRequests, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

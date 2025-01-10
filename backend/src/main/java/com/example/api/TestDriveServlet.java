package com.example.api;

import com.example.model.TestDriveRequest;
import com.example.service.TestDriveService;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@WebServlet("/api/test-drive")
public class TestDriveServlet extends HttpServlet {
    private TestDriveService testDriveService;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        testDriveService = new TestDriveService();
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        BufferedReader reader = req.getReader();
        TestDriveRequest testDriveRequest = gson.fromJson(reader, TestDriveRequest.class);

        testDriveService.addTestDriveRequest(testDriveRequest);

        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().write(gson.toJson(testDriveRequest));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        List<TestDriveRequest> testDriveRequests = testDriveService.getAllTestDriveRequests();
        resp.getWriter().write(gson.toJson(testDriveRequests));
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");

        BufferedReader reader = req.getReader();
        Map<String, String> requestData = gson.fromJson(reader, Map.class);

        String name = requestData.get("name");
        String email = requestData.get("email");
        String carModel = requestData.get("carModel");
        String date = requestData.get("date");
        String ownerEmail = requestData.get("ownerEmail");

        testDriveService.deleteTestDriveRequest(name, email, carModel, date, ownerEmail);

        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().write("{\"status\":\"success\"}");
    }
}

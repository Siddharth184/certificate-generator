package com.example.certificategenerator.controller;

import com.example.certificategenerator.model.Recipient;
import com.example.certificategenerator.service.RecipientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipients")
@CrossOrigin(origins = "*")
public class RecipientController {

    @Autowired
    private RecipientService service;

    @GetMapping
    public List<Recipient> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Recipient> getById(@PathVariable String id) {
        return service.getById(id);
    }

    @PostMapping("/upload")
    public List<Recipient> upload(@RequestBody List<Recipient> recipients) {
        return service.upload(recipients);
    }

    @PostMapping
    public Recipient insertOne(@RequestBody Recipient recipient) {
        return service.insertOne(recipient);
    }

    @PutMapping("/{id}")
    public Recipient updateById(@PathVariable String id, @RequestBody Recipient recipient) {
        return service.updateById(id, recipient);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        service.deleteById(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        service.deleteAll();
    }
}

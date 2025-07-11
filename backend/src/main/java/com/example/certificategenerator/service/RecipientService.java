package com.example.certificategenerator.service;


import com.example.certificategenerator.model.Recipient;
import com.example.certificategenerator.repository.RecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipientService {

    @Autowired
    private RecipientRepository repository;

    public List<Recipient> getAll() {
        return repository.findAll();
    }

    public Optional<Recipient> getById(String id) {
        return repository.findById(id);
    }

    public List<Recipient> upload(List<Recipient> recipients) {
        return repository.saveAll(recipients);
    }

    public Recipient insertOne(Recipient recipient) {
        return repository.save(recipient);
    }

    public Recipient updateById(String id, Recipient updatedRecipient) {
        return repository.findById(id)
                .map(r -> {
                    r.setName(updatedRecipient.getName());
                    r.setEmail(updatedRecipient.getEmail());
                    r.setCourse(updatedRecipient.getCourse());
                    r.setDate(updatedRecipient.getDate());
                    r.setScore(updatedRecipient.getScore());
                    return repository.save(r);
                })
                .orElseGet(() -> {
                    updatedRecipient.setId(id);
                    return repository.save(updatedRecipient);
                });
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }

    public void deleteAll() {
        repository.deleteAll();
    }
}

package com.example.certificategenerator.repository;


import com.example.certificategenerator.model.Recipient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipientRepository extends MongoRepository<Recipient, String> {
}

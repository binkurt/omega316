package com.example.imdb.repository;

import com.example.imdb.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository
             extends JpaRepository<Genre,Long>{
}

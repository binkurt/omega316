package com.example.imdb.repository;

import com.example.imdb.entity.Genre;
import com.example.imdb.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface MovieRepository extends JpaRepository<Movie,Long>{
    Collection<Movie> findAllByYearBetweenAndGenresName(int from,int to,String genre);
}

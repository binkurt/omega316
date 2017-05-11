package com.example.imdb.controller;

import com.example.imdb.entity.Genre;
import com.example.imdb.entity.Movie;
import com.example.imdb.repository.GenreRepository;
import com.example.imdb.repository.MovieRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin
@Api(description = " Imdb Search Restful Service", tags = {"Movie Search Services"})
public class ImdbRestController {
    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping(value="genres",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Get All Genre Resources")
    public Collection<Genre> allGenres(){
        return genreRepository.findAll();
    }

    @GetMapping(value="movies",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Search movies by year range and genre")
    public Collection<Movie> searchMovies(
            @RequestParam("from") Integer from,
            @RequestParam("to") Integer to,
            @RequestParam("genre") String genre){
        return movieRepository.findAllByYearBetweenAndGenresName(from,to,genre);
    }
}

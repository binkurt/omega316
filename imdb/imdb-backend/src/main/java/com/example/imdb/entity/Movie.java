package com.example.imdb.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="movieid")
    private Long id;
    private String title;
    private String imdb;
    private int year;
    @OneToMany
    @JoinTable(
        name="moviedirectors",
        joinColumns = {
            @JoinColumn(name="movieid",referencedColumnName = "movieid")
        },
        inverseJoinColumns = {
            @JoinColumn(name="directorid",referencedColumnName = "directorid")
        }
    )
    private List<Director> directors;

    @OneToMany
    @JoinTable(
        name="moviegenres",
        joinColumns = {
            @JoinColumn(name="movieid",
                    referencedColumnName = "movieid")
        },
        inverseJoinColumns = {
            @JoinColumn(name="genreid",
                    referencedColumnName = "genreid")
        }
    )
    private List<Genre> genres;

    public Movie() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImdb() {
        return imdb;
    }

    public void setImdb(String imdb) {
        this.imdb = imdb;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public List<Director> getDirectors() {
        return directors;
    }

    public void setDirectors(List<Director> directors) {
        this.directors = directors;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", imdb='" + imdb + '\'' +
                ", year=" + year +
                '}';
    }
}

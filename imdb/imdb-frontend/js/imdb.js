// Model - View (index.html) <-> ViewModel : MVVM
var ImdbViewModel = function () {
    var self = this;

    // View Model
    self.from = ko.observable(1970);
    self.to = ko.observable(1979);
    self.genre = ko.observable("Drama");

    // [data] Model
    self.genres = ko.observableArray([]);
    self.movies = ko.observableArray([]);

    self.search = function () {
        $.ajax({
            url: "http://localhost:7001/imdb/api/movies?from="
            + self.from()
            + "&to=" + self.to()
            + "&genre=" + self.genre(),
            method: "GET",
            success: function (movies) {
                self.movies(movies);
            }
        });
    };

    $.ajax({
        url: "http://localhost:7001/imdb/api/genres",
        method: "GET",
        success: function (genres) {
            var orderByName = function (a, b) {
                return a.name.localeCompare(b.name);
            };
            genres.sort(orderByName);
            self.genres(genres);
        }
    });
};

var vm = new ImdbViewModel();

$(document).ready(function () {
    ko.applyBindings(vm);
});
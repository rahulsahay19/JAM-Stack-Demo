import { Component, OnInit } from '@angular/core';
import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  private _listFilter: string;

  pageTitle = 'Movie List';
  imageWidth = 50;
  imageMargin = 2;
  filteredMovies: IMovie[];
  errorMessage = '';

  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(v: string) {
    this._listFilter = v;
    this.filteredMovies = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.movies;
  }

  movies: IMovie[];

  constructor(private movieService: MovieService) {}

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();

    return this.movies.filter((movie: IMovie) => {
      return movie.name.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies;
        this.filteredMovies = this.movies;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Movie List: ' + message;
  }
}

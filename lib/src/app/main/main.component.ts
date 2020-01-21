import { Component, OnInit } from '@angular/core';
import { book, favBtns } from '../../models/book.model';
import { FavService } from '../fav.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private favService: FavService,
    private dataService: DataService) {

  }
  books = new Array<book>();
  favBtns = new Array<favBtns>();

  ngOnInit() {

    this.books = this.dataService.books;

    // //Ультра закидывание данных с учетом жанров
    // this.dataService.books.forEach(el => {
    //   this.favService.genres.forEach(el2 => {
    //     if(el.genre === el2.genre){
    //       if(el2.activate){
    //         this.books.push(el);
    //       }
    //     }
    //   })
    // });

    this.books.forEach(element => {
      this.favService.searchList.push(element.name);
    });

    //Книги для отображения при поиске
    this.favService.books = this.books;

  }

  // ngAfterViewInit() {
  //   //Ультра закидывание данных с учетом жанров
  //   this.books = [];
  //   this.dataService.books.forEach(el => {
  //     this.favService.genres.forEach(el2 => {
  //       if(el.genre === el2.genre){
  //         if(el2.activate){
  //           this.books.push(el);
  //         }
  //       }
  //     })
  //   });
  // }

  

  //Добавляет и убирает из избранного, а также меняет кнопку
  fav(id: number) {

    if(this.books[id].favBtn){
      if(this.favService.favBooks.find(el=>el.id == id) == null){
        this.favService.favBooks.push(this.books.find(el=>el.id == id));
      }
      this.favService.favBtns[id] = false;
    }
    else{
      const delBook = this.favService.favBooks.find(el => el.id === id);
      if (delBook != null) {
        this.favService.favBooks.splice(this.favService.favBooks.indexOf(delBook), 1);
      }
      this.favService.favBtns[id] = true;
    }

    this.books[id].favBtn = this.favService.favBtns[id];

  }


  //Открывает книгу
  read(bookSrc: string){
    window.open(bookSrc, '_blank');
    
  }
}

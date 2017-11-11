import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface Post {
  id: Number;
  title: String;
  userId: Number;
  body: String;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  url = 'https://jsonplaceholder.typicode.com/posts/1';
  post: Post;
  message: String = '';

  constructor(private http: HttpClient) {
    console.log('constructor');
    this.getPost();
  }

  ngOnInit() {
  }

  getPost = function() {
    this.http.get(this.url, {observe: 'response', responseType: 'json'}).subscribe(data => {
      this.post = data;
      this.message = 'post with data';
      console.log(this.message);

    }, (err: HttpErrorResponse) => {
      console.log(err);
      if (err.status === 404) {
        this.message = 'no data found';
      } else if (err.status === 200) {
        this.message = 'okay';
      } else {
        this.message = 'server connection error ' + err.message;
      }

      /*if(err.error instanceof Error) {
        this.message = 'client error';
      } else {
        this.message = 'server error';
      }*/
      console.log(this.message);
    });


  };

}


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IData {
  useId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  fetchedData: IData[] = [];
  displayedData: IData[] = [];
  itemsPerPage: number = 10;
  allPages: number;

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData(): void {
    const dataConfig$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
    dataConfig$.subscribe((data: any) => {
        this.fetchedData = data;
        this.onPageChange();
        this.allPages = Math.ceil(this.fetchedData.length / this.itemsPerPage);
      }
    );
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedData = this.fetchedData.slice(startItem, endItem);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  data:any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 suggestions: string[] = [];
  textValue: any = '';
  //suggestions = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
  filteredSuggestions: string[] = [];
  showSuggestions = false;
  currentIndex = -1;
  inputText = '';

  Add(tdf: NgForm) {
    this.suggestions.push(tdf.value.textValue);
    console.log(this.suggestions);
    tdf.reset();
  }


  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      if (this.currentIndex < this.filteredSuggestions.length - 1) {
        this.currentIndex++;
      }
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (
        this.currentIndex >= 0 &&
        this.currentIndex < this.filteredSuggestions.length
      ) {
        this.selectSuggestion(this.filteredSuggestions[this.currentIndex]);
      }
      event.preventDefault();
    } else {
      const inputText = (event.target as HTMLTextAreaElement).value;
      const atIndex = inputText.lastIndexOf('@');

      if (atIndex >= 0) {
        const searchText = inputText
          .slice(atIndex + 1)
          .trim()
          .toLowerCase();
        this.filteredSuggestions = this.suggestions.filter((suggestion) =>
          suggestion.toLowerCase().startsWith(searchText)
        );

        if (this.filteredSuggestions.length > 0) {
          this.currentIndex = 0;
          this.showSuggestions = true;
        } else {
          this.currentIndex = -1;
          this.showSuggestions = false;
        }
      } else {
        this.currentIndex = -1;
        this.showSuggestions = false;
      }
    }
  }
  selectSuggestion(suggestion: string) {
    const inputElement = document.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    const atIndex = inputElement.value.lastIndexOf('@');
    const newValue = inputElement.value.slice(0, atIndex) + suggestion + ' ';
    inputElement.value = newValue;
    this.inputText = newValue;
    this.showSuggestions = false;

  }
}
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { templateModel } from './model';

import { ModalService } from '../modal.service';


@Component({
  selector: 'app-template-list',
  providers: [DecimalPipe],
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
	filter = new FormControl('', { nonNullable: true });
  closeResult = '';
  data: undefined|templateModel[];
  filteredData: templateModel[] = [];

  templateform!:FormGroup;

  private searchTerm$ = new Subject<string>();

	constructor(private api:ApiService,private modalService: ModalService) {
    this.setupSearchSubscription();
   }

  ngOnInit(): void {
    this.modalService.functionToBeCalled$.subscribe((data) => {
      this.filteredData.push(data);
    });
    this.gettemplate();
  }

	openModalWithData(data: any) {
    this.modalService.openModal(data);
  }

  gettemplate(){
    this.api.getTemplate().subscribe(res=>{
      this.data=res;
      this.filteredData = res;
    })
  }

  deleteTemplate(event: Event, id: any) {
    event.stopPropagation();
    this.api.deleteTemplate(id).subscribe((res => {
      this.filteredData = this.filteredData.filter((item: any) => item.id !== id);
    }))
  }

  searchData(event: any) {
    const text = event.target.value;
    this.searchTerm$.next(text);
  }

  private setupSearchSubscription() {
    this.searchTerm$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((term: string) => this.performSearch(term))
      )
      .subscribe((searchResults: any) => {
        this.filteredData = searchResults;
      });
  }

  private performSearch(term: string): Observable<any[]> {
    if (!this.data) {
      this.data = [];
    }

    const filteredData: any = this.data.filter((item: any) => {
      return item.title.toLowerCase().includes(term.toLowerCase())
    });

    return of(filteredData);
  }
}

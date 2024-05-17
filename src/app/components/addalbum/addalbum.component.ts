import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RepoAlbumsService } from '../../services/repo.albums.service';

@Component({
  selector: 'app-addalbum',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addalbum.component.html',
  styleUrl: './addalbum.component.css',
})
export default class AddalbumComponent {
  formBuilder = inject(FormBuilder);
  repo = inject(RepoAlbumsService);
  router = inject(Router);
  createAlbumForm: FormGroup;
  @ViewChild('cover') cover!: ElementRef;

  constructor() {
    this.createAlbumForm = this.formBuilder.group({
      artist: ['', Validators.required],
      album: ['', Validators.required],
      stock: ['', Validators.required],
      duration: ['', Validators.required],
      cover: null,
      price: ['', Validators.required],
      genre: ['', Validators.required],
      recordCompany: ['', Validators.required],
      producer: ['', Validators.required],
      moreInfo: ['', Validators.required],
    });
  }

  onFileChange() {
    const htmlElement: HTMLInputElement = this.cover.nativeElement;
    const file = htmlElement.files![0];
    console.log(file);
    this.createAlbumForm.patchValue({ cover: file });
  }

  onSubmit() {
    console.log(this.createAlbumForm.value);
    const fd = new FormData();
    fd.append('artist', this.createAlbumForm.value.artist);
    fd.append('album', this.createAlbumForm.value.album);
    fd.append('stock', this.createAlbumForm.value.stock);
    fd.append('duration', this.createAlbumForm.value.duration);
    fd.append('cover', this.createAlbumForm.value.cover);
    fd.append('price', this.createAlbumForm.value.price);
    fd.append('genre', this.createAlbumForm.value.genre);
    fd.append('recordCompany', this.createAlbumForm.value.recordCompany);
    fd.append('producer', this.createAlbumForm.value.producer);
    fd.append('moreInfo', this.createAlbumForm.value.moreInfo);

    return this.repo.createAlbum(fd).subscribe((data) => {
      console.log(data);
    });
  }
}

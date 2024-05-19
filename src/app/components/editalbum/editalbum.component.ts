import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RepoAlbumsService } from '../../services/repo.albums.service';
import { Album } from '../../models/albums.model';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-editalbum',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],

  templateUrl: './editalbum.component.html',
  styleUrl: './editalbum.component.css',
})
export default class EditalbumComponent {
  formBuilder = inject(FormBuilder);
  repo = inject(RepoAlbumsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  state = inject(StateService);
  editAlbumForm: FormGroup;
  album: Album | undefined;
  id: string | null = null;
  @ViewChild('cover') cover!: ElementRef;

  constructor() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.state.getState().subscribe((elements) => {
      this.album = elements.albums.find((album) => album.id === this.id);
    });

    this.editAlbumForm = this.formBuilder.group({
      artist: [this.album?.artist, Validators.required],
      album: [this.album?.album, Validators.required],
      stock: [this.album?.stock, Validators.required],
      duration: [this.album?.duration, Validators.required],
      cover: null,
      price: [this.album?.price, Validators.required],
      genre: [this.album?.genre, Validators.required],
      recordCompany: [this.album?.recordCompany, Validators.required],
      producer: [this.album?.producer, Validators.required],
      moreInfo: [this.album?.moreInfo, Validators.required],
    });
  }

  onFileChange() {
    const htmlElement: HTMLInputElement = this.cover.nativeElement;
    const file = htmlElement.files![0];
    console.log(file);
    this.editAlbumForm.patchValue({ cover: file });
  }

  onSubmit() {
    console.log(this.editAlbumForm.value);
    const fd = new FormData();
    fd.append('artist', this.editAlbumForm.value.artist);
    fd.append('album', this.editAlbumForm.value.album);
    fd.append('stock', this.editAlbumForm.value.stock);
    fd.append('duration', this.editAlbumForm.value.duration);
    fd.append('cover', this.editAlbumForm.value.cover);
    fd.append('price', this.editAlbumForm.value.price);
    fd.append('genre', this.editAlbumForm.value.genre);
    fd.append('recordCompany', this.editAlbumForm.value.recordCompany);
    fd.append('producer', this.editAlbumForm.value.producer);
    fd.append('moreInfo', this.editAlbumForm.value.moreInfo);

    return this.repo.patchAlbum(fd, this.album!.id).subscribe((data) => {
      console.log(data);
    });
  }
}

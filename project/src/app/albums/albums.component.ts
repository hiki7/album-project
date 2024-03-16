import {Component, OnInit, OnDestroy} from '@angular/core';
import {AlbumsService} from "../albums.service";
import {Album} from "../album/album.module";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit{

  albums!: Album[];
  filteredAlbums!: Album[];
  loaded: boolean = false;
  filterText: string = '';

  constructor(private albumService: AlbumsService) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe((albums) => {
      this.albums = albums;
      this.filteredAlbums = albums;
      this.loaded = true;
    });
  }

  filterResults() {
    const id = parseInt(this.filterText);
    if (!isNaN(id)) {
      this.filteredAlbums = this.albums.filter(album => album.id === id);
    } else {
      this.filteredAlbums = this.albums;
    }
  }

  deletePost(id: number) {
    this.filteredAlbums = this.filteredAlbums.filter(a => a.id !== id);
    this.albumService.deleteAlbum(id).subscribe(() => {
      console.log("Album deleted successfully!")
    });
  }
}

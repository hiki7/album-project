import { Component } from '@angular/core';
import {Album} from "../album/album.module";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {AlbumsService} from "../albums.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent {
  album!: Album;
  loaded: boolean = false;
  title: string = "";
  loading: boolean = false;
  constructor(private route: ActivatedRoute, private albumService: AlbumsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const postId = Number(params.get('id'));
        this.loaded = false;
        this.albumService.getAlbum(postId).subscribe((album) => {
          this.album = album;
          this.loaded = true;
        });
      }
    });
  }

  changeTitle() {
    if (this.title !== "") {
      this.loading = true;
      this.albumService.updateAlbum(this.album.id, `{"title":"${this.title}"}`).subscribe(() => {
        console.log("updated");
        this.album.title = this.title;
        this.title = "";
        this.loading = false;
      })
    }
  }
}

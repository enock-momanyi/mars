import { Component, OnInit} from '@angular/core';
import { ManifestService } from '../manifest.service';
import { RoverPhoto } from '../rover';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mr-view-photo',
  templateUrl: './view-photo.component.html',
  // styleUrls: ['./view-photo.component.css']
})
export class ViewPhotoComponent implements OnInit {
  photos !: {photos: RoverPhoto[]};
  sub !: Subscription;
  constructor(private roverService: ManifestService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const name = String(this.route.snapshot.paramMap.get('roverName'))
    const sol = Number(this.route.snapshot.paramMap.get('sol'))
    const camera = String(this.route.snapshot.paramMap.get('camName')).toLowerCase()
    console.log(name, sol, camera);
    this.sub = this.roverService.getPhotos(name,sol,camera).subscribe({
      next: feedback => {this.photos = feedback},
      error: err => {console.log(err)}
    })
  }

}

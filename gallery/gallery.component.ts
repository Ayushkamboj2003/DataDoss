import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  
  images = [
    { src: '/assets/images/macchie.jpeg', alt: 'Macchie', instruction:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus scelerisque arcu, eget vulputate erat maximus at. " },
    { src: '/assets/images/abrasione.jpeg', alt: 'abrasione', instruction:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus scelerisque arcu, eget vulputate erat maximus at. "  },
    { src: '/assets/images/bolle.jpeg', alt: 'bolle', instruction:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus scelerisque arcu, eget vulputate erat maximus at. "  },
    { src: '/assets/images/degradazione.jpeg', alt: 'degradazione', instruction:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus scelerisque arcu, eget vulputate erat maximus at. "  },
    // ... altre immagini
  ];

  selectedImage;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log("Loading Images");
  }

  showImage(image) {
    this.selectedImage = image;
    this.modalService.open(this.selectedImage, { size: 'lg' });
  }
}

## wlowe-basic



## Issues / requested changes

### Menu
- make drop down on hover.  ie Portfolio/birds and Portfolio/Landscapes
- make menu responsive for phones

### Blog posts tags
- Need to ensure the Tags stay below the blog content, just above the footer.  **22-12 Currently can move up beside image. 22-12 removed tags in the single html template**

### Portfolio
- ~~Have smaller images in a "rows / collumns" with padding and space between the images.~~  Images to be reduced in size proportionate to the original aspect ratio. 
Will end up with varying row heights or collumn widths.  *16-12 done with simple flex ccs.....align-items: center....*
- Make responsive for screen size
- ~~enable lihgtbox on click~~  **22-12 done but css changes also affect the home page carousel!**   Got lightbox modal on click working using `<a>` tag but need to get CSS style and captions working
- ~~Remove tags from from bottom~~ **22-12** done
- change to drop down menu


### Home page
- ~~Add Carousel~~ *15-12 done using danes carouslel
- can scroll vertically within each image that is smaller than the tallest one???
- play with image height width so image shows correctly.  either source image or CSS fill etc....
- move location dots to the top
- Remove tags  **22-12** Done for all pages until get around to enabling tags on only the post single template. 

### Blog posts
- ~~add thumbnail image to summary.~~  done 15-12-23.  Image must be named cover.jpg  
- ~~limit text summary length~~ Summary was not being displayed on list page. Fixed 15-12 using code from here https://yihui.org/en/2017/08/hugo-post-summary/


==============================================

## Images 

All of the images for a post are in the post's resource bundle. 
The markdown image tag renderer, and the gallery renderer each take a string .e.g `image.jpg`. 
**This is not a full URL**. 
If there is `image.jpg` in the post's resource bundle, it will find it and resize it and create proper URLs.

## Floating images

Add an image to the markdown with e.g.

`![.fl|Crepe](crepe.jpg)`

The `.fl` is a class that will float the image left. This is a customisation, and is not part of markdown standard.


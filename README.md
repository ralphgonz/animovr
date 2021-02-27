# animovr

_Transparent overlay to add animated sprites to a web page._ [Live example.](http://www.muskratworks.com)

## Web page setup

Add script prerequisites and initialize animation:

```
<script type="text/javascript" src="js/jquery-1.7.js"></script>
<script type="text/javascript" src="js/jQueryRotate.2.1.js"></script>
<script type="text/javascript" src="js/animovr.1.js"></script>
<script type="text/javascript">
    window.onload = function() {
        animovr.init('json/mySprites.json');
    }
</script>
```

Add an `id` to the element that will define the overlay boundaries, for example:

```
<div id="film" style="position:relative;overflow:hidden;">
  ...
</div>
```

## Define sprites

Create mySprites.json cfg file, specifying the `id` of the tag which will serve as the container. (In the example above the id is `film`.) This document defines animation parameters and details for each animated sprite:
* image file
* transformations
* motion profile

See `json/demo2.json` for detailed syntax and examples.



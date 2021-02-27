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
        animovr.init('json/<sprites file>.json');
    }
</script>
```

Add an `id` to the element that will define the overlay boundaries, for example:

```
<div id="<container id>" style="position:relative;overflow:hidden;">
  ...
</div>
```

Example: [animovrTest.html]

## Define sprites

Create `<sprites file>.json` cfg file, specifying the `id` of the tag which will serve as the container. This document defines animation parameters and details for each animated sprite:
* image file
* transformations
* motion profile

Detailed syntax and examples: [json/demo2.json]



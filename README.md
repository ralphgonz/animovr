# animovr

_Transparent overlay to add animated sprites to a web page._

Place these elements in your page. The `div` element defines the overlay boundaries.

```
<script type="text/javascript">
    window.onload = function() {
        animovr.init('json/mySprites.json');
    }
</script>
...
<div id="film" style="position:absolute;overflow:hidden;left:20;top:100;width:600px;height:300px">
</div>
```

Create mySprites.json cfg file, specifying id of the tag which will serve as the container, in this case 'film'.
This document will define the sprites: image files and motion profiles. See `json/demo2.json` for detailed syntax.

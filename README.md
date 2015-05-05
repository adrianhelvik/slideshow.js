# slideshow.js

HOW TO USE

 1. Load the javascript file at the bottom of your body-tag with:

    <script src="slideshow.js"></script>
    <script>
        [optional: your-settings]
        slideshow.start();
    </script>

 2. Replace [your-settings] with settings listed below.

 3. Add <link type="text/css" href="slideshow.css" /> to your head tag.

 4. Add a the following to your body tag (above the scripts):

    <div id="slideshow">
        [your-images]
    </div>

 5. Replace [your-images] with an arbitrary number of equal-sized images.

SETTINGS

set time between slides (the pause)

slideshow.setDelayTime( [time-in-seconds] );
default: 6

set transition time (fade time)

slideshow.setTransitionSpeed( [time-in-seconds] );
default: 5

set number of frames per second (fps)

slideshow.setFramesPerSecond( [frames-per-second] );
default: 10
tip: Don't set this too high or the website might lag


START / STOP

Start, stop or toggle the slideshow:

slideshow.start();
slideshow.stop();
slideshow.toggle();

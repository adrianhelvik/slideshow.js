/*

 -----------------------   H O W   T O   U S E   -----------------------

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

 -------------------------   S E T T I N G S   -------------------------

 -----------------------------------------
|                                         |
|   set time between slides (the pause)   |
|                                         |
|-----------------------------------------
|
·->   slideshow.setDelayTime( [time-in-seconds] );
|
·->   default: 6

 ---------------------------------------
|                                       |
|   set transition time (fade time)     |
|                                       |
|---------------------------------------
|
·->   slideshow.setTransitionSpeed( [time-in-seconds] );
|
·->   default: 5

 -------------------------------------------
|                                           |
|   set number of frames per second (fps)   |
|                                           |
|-------------------------------------------
|
·->   slideshow.setFramesPerSecond( [frames-per-second] );
|
·->   default: 10
|
·->   tip: Don't set this too high or the website might lag


 ---------------------   S T A R T   /   S T O P   ---------------------

 Start, stop or toggle the slideshow:

 slideshow.start();
 slideshow.stop();
 slideshow.toggle();



*/


"use strict";

var slideshowUtil, slideshow;

slideshowUtil = {

    difference: function (x, y) {
        return Math.abs(x - y);
    },

    /**
     * Determine whether two values are almost equal.
     *
     * @param x A numeric value
     * @param y Another numeric value
     * @param diff Maximum allowed difference for the values to be considered almost equal
     * @returns {boolean}
     */
    almostEqual: function (x, y, diff) {
        return slideshowUtil.difference(x, y) <= diff;
    },

    /**
     *
     * @param target HtmlObject
     * @param cssProp Any purely numeric css value
     * @param from Initial value
     * @param to Final value
     * @param transitionSpeed Number of seconds per transition
     * @returns Function that can be used to test whether the animation is complete.
     *
     * @TODO add support for percentage- and px-based animations
     */
    animate: function (target, cssProp, from, to, transitionSpeed, fps) {
        var numberOfFrames, animateHelper, incrementing, current, differencePerFrame, complete, secondsPerFrame, framesPerSecond;

        framesPerSecond = fps;
        differencePerFrame = slideshowUtil.difference(from, to) / (framesPerSecond * transitionSpeed);
        numberOfFrames = framesPerSecond * transitionSpeed;
        secondsPerFrame = numberOfFrames / transitionSpeed;

        // boolean
        incrementing = (from < to);
        current = from;

        animateHelper = function () {

            // This print is useful for debugging. Delete if you see fit.
            //
            // console.log('target: ' + target.src + ', differencePerFrame: ' + differencePerFrame + ', current: ' + current + ', from: ' + from + ', to: ' + to + ', complete: ' + complete);

            complete = slideshowUtil.almostEqual(current, to, differencePerFrame);

            if (incrementing) current += differencePerFrame;
            else current -= differencePerFrame;

            target.style[cssProp] = current;

            if (!complete) window.setTimeout(animateHelper, secondsPerFrame);
        };

        animateHelper();

        return function () {
            return complete;
        }
    },

    consoleCounter: function (x) {
        if (isNaN(x)) x = 0;
        console.log('seconds passed: ' + x);
        console.log(this);
        setTimeout(function () {
            slideshowUtil.consoleCounter(x + 1)
        }, 1000);
    }
};

slideshow = {
    _interval: undefined,
    delayTimeInMilis: 6000,
    transitionSpeed: 5,
    framesPerSecond: 10,

    setDelayTime: function (seconds) {
        slideshow.delayTimeInMilis = 1000 * seconds;
    },

    setTransitionSpeed: function (seconds) {
        slideshow.transitionSpeed = seconds;
    },

    setFramesPerSecond: function (numberOfFrames) {
        slideshow.framesPerSecond = numberOfFrames;
    },

    nodes: {
        slideshow: document.getElementById('slideshow'),
        images: document.querySelectorAll('#slideshow img')
    },

    slide: (function () {
        var counter = 0;

        return function () {
            console.log("slideshow.slide() called");

            var currNum = (counter + 1) % slideshow.nodes.images.length;
            var prevNum = counter % slideshow.nodes.images.length;

            var currNode = slideshow.nodes.images[currNum];
            var prevNode = slideshow.nodes.images[prevNum];

            slideshowUtil.animate(currNode, 'opacity', 0, 1, slideshow.transitionSpeed, slideshow.framesPerSecond);
            slideshowUtil.animate(prevNode, 'opacity', 1, 0, slideshow.transitionSpeed, slideshow.framesPerSecond);

            counter += 1;
        }
    })(),

    start: function () {
        slideshow._interval = setInterval(slideshow.slide, slideshow.delayTimeInMilis);
    },

    stop: function () {
        clearInterval(slideshow._interval);
        slideshow._interval = undefined;
    },

    toggle: function () {
        if (typeof slideshow._interval === 'undefined') {
            slideshow.start();
        } else {
            slideshow.stop();
        }
    }
};
Slide to CAPTCHA
================
###A unique way for your users to prove they're human!###

CAPTCHAs suck. Math problems are exclusionary. Color-based CAPTCHAs stop color-blind people from using your site.

Slide to Captcha is a new way to look at CAPTCHA. A user simply slides to unlock the submit functionality of your form (an interaction metaphor they are used to already).

[A REALLY basic example](http://joshbroton.com/projects/slide-to-captcha)

##Slide to CAPTCHA Basics##

####Include the CSS####
    <link href="path/to/slide-to-captcha.css" rel="stylesheet" />

####Including the Javascript####
    <script src="path/to/slide-to-captcha.js" type="text/javascript"></script>

####Recommended HTML Structure####
    <form>
      <!-- ... -->
      <div class="captcha">
        <input type="hidden" name="captcha" />
        <div class="handle"></div>
      </div>
      <!-- ... -->
    </form>

####Calling Slide to CAPTCHA####
    $(document).ready(function () {
        wrapperElement = '.captcha';

        // Default options
        options = {
            handle: '.handle',        // handle selector
            cursor: 'move',           // Cursor type on handle hover
            direction: 'x',           // x or y
            customValidation: false,  // Use your own validation function
            completedText: 'Done!'    // Value of data-content on success
        };
        captcha = new SliderCaptcha(wrapperElement, {});
    })


####Options####
    Option              Default
    -----------------------------------------
    handle:             ".handle"  // Class of handle inside #identifier-of-slidewrapper
    cursor:             "move"     // The cursor your mouse will use when hovering over handle
    direction:          "x"        // Can be x or y. Not done with y slide yet.
    customValidation:   false      // If you write your own validation, choose true

##To Do##
* Test in older browsers
* More options
* Vertical slide functionality

##Done##
* Basic horizontal functionality
* Tested in Chrome 30, 32, IE 8/9/10/11 (some styles don't work in 8/9), and Firefox 24

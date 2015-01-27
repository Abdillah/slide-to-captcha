Slide to CAPTCHA
================

### A unique way for your users to prove they're human!

CAPTCHAs suck. Math problems are exclusionary. Color-based CAPTCHAs stop color-blind people from using your site.

Slide to Captcha is a new way to look at CAPTCHA. A user simply slides to unlock the submit functionality of your form (an interaction metaphor they are used to already).

[A REALLY basic example](http://joshbroton.com/projects/slide-to-captcha)

## Slide to CAPTCHA Basics

#### Include the CSS
    <link href="path/to/slide-to-captcha.css" rel="stylesheet" />

#### Including the Javascript
    <script src="path/to/slide-to-captcha.js" type="text/javascript"></script>

#### Recommended HTML Structure
    <form>
      <!-- ... You may copy below structure ... -->
      <div class="captcha">
        <input type="hidden" name="captcha" />
        <div class="handle"></div>
      </div>
      <!-- ... You may copy above structure ... -->

      <!-- ... Permit multiple instance ... -->
      <div class="captcha1">
        <input type="hidden" name="captcha1" />
        <div class="handle1"></div>
      </div>
    </form>

#### Calling Slide to CAPTCHA
    $(document).ready(function () {
        wrapperElement = '.captcha';

        // Default options
        options = {
            completedText: 'Done!',   // Value of data-content on success
            cursor: 'move',           // Cursor type on handle hover
            customValidation: false,  // Use your own validation function
            direction: 'x',           // x or y, yet only support x
            handle: '.handle'         // handle selector
        };
        captcha = new SliderCaptcha(wrapperElement, {});
    });


#### Options
    Option              Default
    -----------------------------------------
    handle:             ".handle"  // Class of handle inside #identifier-of-slidewrapper
    cursor:             "move"     // The cursor your mouse will use when hovering over handle
    direction:          "x"        // Can be x or y. Not done with y slide yet.
    customValidation:   false      // If you write your own validation, choose true

## To Do
* [x] Basic horizontal functionality
* [ ] More flexible style
* [ ] Test in older browsers
* [ ] More options
* [ ] PHP authentication mechanism (use key-pair, php apc_store)
* [ ] Vertical slide functionality

## Browser Tested
* Chrome v30, v32
* IE v8, v9 (some styles don't work in 8/9), v10, v11
* Firefox v24, v34
* Opera

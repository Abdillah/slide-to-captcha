Slide to CAPTCHA
================

### A unique way for your users to prove they're human!

CAPTCHAs suck. Math problems are exclusionary. Color-based CAPTCHAs stop color-blind people from using your site.

Slide to Captcha is a new way to look at CAPTCHA. A user simply slides to unlock the submit functionality of your form (an interaction metaphor they are used to already).

[Demo and Usage Example](http://abdillah.github.io/slider-captcha/)

## Slide to CAPTCHA Basics

#### Include the CSS
    <link href="path/to/slide-to-captcha.css" rel="stylesheet" />

#### Including the Javascript
    <script src="path/to/slide-to-captcha.js"></script>

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
            authValue: 'Authenticated!',     // Value of hidden input on success
            cursor: 'move',                  // Cursor type on handle hover
            customValidation: true,          // Use your own onsubmit= function
            direction: 'x',                  // x or y, yet only support x
            handle: '.handle'                // Handle selector
            inputName: 'captcha',            // Hidden input where to fill the value
            completeHandler: defaultCompleteHandler  // Function to call when completed
        };
        captcha = new SliderCaptcha(wrapperElement, options);
    });

#### Options
    Option              Default
    -----------------------------------------
    authValue:          'Authenticated!',     // Value of hidden input on success
    handle:             '.handle'  // Class of handle inside #identifier-of-slidewrapper
    cursor:             'move'     // The cursor your mouse will use when hovering over handle
    direction:          'x'        // Can be x or y. Not done with y slide yet.
    customValidation:   true       // If you write your own validation, choose true
    inputName:          'captcha'               // Hidden input where to fill the success value
    completeHandler:    defaultCompleteHandler  // Function to call when completed

## To Do
* [x] Basic horizontal functionality
* [x] More flexible style
* [x] Reset-able captcha
* [x] Support complete handler
* [ ] Test in older browsers
* [ ] More options
* [ ] PHP authentication mechanism (use key-pair, php apc_store)
* [ ] Vertical slide functionality

## Browser Tested
* Chrome v30, v32
* IE v8, v9 (some styles don't work in 8/9), v10, v11
* Firefox v24, v34
* Opera

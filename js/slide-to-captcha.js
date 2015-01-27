/*
 * Require jQuery
 */
var SliderCaptcha = function(element, options) {
    // Object Composition
    this.data = {
        options: $.extend({
            completedText: 'Done!',
            cursor: 'move',
            customValidation: false,
            direction: 'x', //x or y
            handle: '.handle'
        }, options),
        handle: {
            obj: 0,
            active: 0,
            oWidth: 0
        },
        slide: {
            obj: $(element),
            width: 0,
            oWidth: 0
        },
        form: 0
    };

    // Object data alias : It's a relics, maybe future removed
    this.options = this.data.options;
    this.handle = this.data.handle;
    this.slide = this.data.slide;
    this.form = this.data.form;

    this.init = function () {
        // Init data
        this.slide.obj = $(element);
        this.slide.obj.addClass('slide-to-captcha');
        this.slide.width = this.slide.obj.width();
        this.slide.oWidth = this.slide.obj.outerWidth(true);

        /* Slider Logic
         *    --------------------
         *   |   _                |
         *   |  |_|-------------  |
         *   |                    |
         *    --------------------
         *      |--------------|
         *
         * start = slide.left + (slide.oWidth - slide.width) / 2;
         * end   = (start + )slide.width - handle.width/2
         *         ^ this practically not necessary, I don't know
         * handleCenterPos = e.pageX - handle.width/2
         */
        this.slide.start = this.slide.obj.offset().left + (this.slide.oWidth - this.slide.width) / 2;
        this.slide.end = this.slide.width;

        this.handle.obj = $(element).find(this.options.handle);
        this.handle.obj.addClass('slide-to-captcha-handle');
        this.handle.obj.offset({ left: this.slide.start });
        this.handle.width = this.handle.obj.width();
        this.handle.oWidth = this.handle.obj.outerWidth();
        // Substract half of the handle width from the track width
        this.slide.end = this.slide.end - (this.handle.width / 2);

        console.log("start %i = %i + (%i - %i) / 2", this.slide.start, this.slide.obj.offset().left, this.slide.oWidth, this.slide.width);
        console.log("end   %i = %i - (%i / 2)", this.slide.end, this.slide.width, this.handle.width);

        this.form = this.slide.obj.parents('form');
        this.form.attr('data-valid', 'false');

        // if(this.options.customValidation === false) {
        //     form.attr('onsubmit', "return $(this).attr('data-valid') === 'true';");
        // }

        this.handle.obj.css('cursor', this.options.cursor)
            .on('mousedown', this, this.onDrag);
    };

    this.destroy = function () {
        this.form.removeAttr('data-valid', 'false');
        this.slide.removeClass('slide-to-captcha');
        this.handle.removeClass('slide-to-captcha-handle');

        this.handle.css('cursor', 'normal')
            .on('mousedown', null);

        this.handle.active.offset({left: this.slideXPos});
    };

    this.reset = function () {
        this.destroy();
        this.init();
    };

    this.onDrag = function (e) {
        var data = e.data;

        data.handle.active = $(this).addClass('active-handle');

        // if(data.options.direction === 'y') {
        //    yPos = handle.offset().top + handleHeight = e.pageY;
        // }

        data.handle.active.on('mousemove', data, data.onMove)
            .on('mouseup', data, data.onRelease);

        e.preventDefault();
    };

    this.onMove = function (e) {
        var data = e.data;

        var handleXPos = e.pageX - (data.handle.width/2);
        if(handleXPos > data.slide.start && handleXPos < data.slide.end) {
            if (data.handle.obj.hasClass('active-handle')) {
                $('.active-handle').offset({left: handleXPos});
            }
        } else {
            if(handleXPos >= data.slide.end) {
                var ev = { data: data };
                data.onComplete(ev);
            }
            data.handle.active.mouseup();
        }
    };

    this.onComplete = function (e) {
        var data = e.data;

        data.handle.active.offset({ left: data.slide.end });
        data.handle.active.off();
        data.onRelease();
        data.form.attr('data-valid', 'true');
        data.slide.obj.addClass('valid');
        $('.slide-to-captcha').attr('data-content', data.options.completedText);
    };

    this.onRelease = function (e) {
        this.handle.active.removeClass('active-handle');
    };

    // Solo function
    this.init();
};

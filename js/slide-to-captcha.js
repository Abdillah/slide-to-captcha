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
            XPos: 0,
            width: 0,
            oWidth: 0
        },
        form: 0,
        mouse: {
            xPos: 0,
            yPos: 0
        }
    };

    // Object data alias : It's a relics, maybe future removed
    this.options = this.data.options;
    this.handle = this.data.handle;
    this.slide = this.data.slide;
    this.form = this.data.form;
    this.mouse = this.data.mouse;

    this.init = function () {
        // Init data
        this.slide.obj = $(element);
        this.slide.obj.addClass('slide-to-captcha');
        this.slide.Width = this.slide.obj.width();
        this.slide.OWidth = this.slide.obj.outerWidth();

        this.handle.obj = $(element).find(this.options.handle);
        this.handle.obj.addClass('slide-to-captcha-handle');
        this.handle.OWidth = this.handle.obj.outerWidth();

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

        data.mouse.xPos = $(this).offset().left + data.handle.OWidth - e.pageX;

        // if(data.options.direction === 'y') {
        //    yPos = handle.offset().top + handleHeight = e.pageY;
        // }

        data.slide.XPos = $(this).parent().offset().left + ((data.slide.OWidth - data.slide.Width) / 2);

        data.handle.active.on('mousemove', data, data.onMove)
            .on('mouseup', data, data.onRelease);

        e.preventDefault();
    };

    this.onMove = function (e) {
        var data = e.data;
        console.log('%o', data.slide);
        console.log('%o', data.handle);

        var handleXPos = e.pageX + data.mouse.xPos - data.handle.OWidth;
        console.log("hand-x : %i", handleXPos);
        if(handleXPos > data.slide.XPos && handleXPos < (data.slide.XPos + data.slide.Width - data.handle.OWidth)) {
            if (data.handle.obj.hasClass('active-handle')) {
                $('.active-handle').offset({left: handleXPos});
            }
        } else {
            if(handleXPos <= data.slide.XPos === false) {
                var ev = {
                    data: data
                };
                data.onComplete(ev);
            }
            data.handle.active.mouseup();
        }
    };

    this.onComplete = function (e) {
        var data = e.data;

        data.handle.active.offset({left: data.slide.XPos + data.slide.Width - data.handle.OWidth});
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

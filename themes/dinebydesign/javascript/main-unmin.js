var core = function() {
    this.init()
};
core.prototype = {
    init: function() {
        this._run()
    },
    _run: function() {
        document.imgSvgReplacer = new imgSvgReplacer, document.intro = new intro, document.slider = new slider, document.odometerInit = new odometerInit, document.tabs = new tabs, document.responsive = new responsive, document.contactMap = new contactMap, document.header = new header, document.menu = new menu
    }
}, $(document).ready(function() {
    new core
});
var imgSvgReplacer = function() {
    this.init()
};
imgSvgReplacer.prototype = {
    init: function() {
        this._setVars() && this._replace()
    },
    _setVars: function() {
        return this.vectorImage = $("img.svg"), "undefined" == typeof this.vectorImage ? !1 : !0
    },
    _replace: function() {
        this.vectorImage.each(function() {
            var img = $(this),
                imgID = img.attr("id"),
                imgClass = img.attr("class"),
                imgSrc = img.attr("src");
            $.get(imgSrc, function(data) {
                var svg = $(data).find("svg");
                "undefined" != typeof imgID && (svg = svg.attr("id", imgID)), "undefined" != typeof imgClass && (svg = svg.attr("class", imgClass + " svgReplaced")), svg = svg.removeAttr("xmlns:a"), img.replaceWith(svg)
            }, "xml")
        })
    }
};
var intro = function() {
    this.init()
};
intro.prototype = {
    init: function() {
        this._setVars() && (this._setEvents(), this._initParallax())
    },
    _setVars: function() {
        return this._container = $(".jsIntroContainer"), this._container ? (this._video = $(".jsIntroVideo"), this._video ? (this._videoContainer = $(".jsIntroVideoContainer"), this._videoContainer ? (this._scroll = $(".jsIntroScroll"), this._scroll ? (this._control = $(".jsIntroControl"), this._control ? (this._window = $(window), this._window ? (this._body = $("body"), this._body ? (this._header = $("header"), this._header ? (this.countIterationsAfterScroll = 0, this.videoStatus = 1, !0) : !1) : !1) : !1) : !1) : !1) : !1) : !1) : !1
    },
    _setEvents: function() {
        var $this = this;
        this._scroll.on("click", function(e) {
            e.preventDefault(), $this._scrollDown()
        }), this._control.on("click", function(e) {
            e.preventDefault(), $this._playToggle()
        }), $(document).on("scroll", function() {
            $this.countIterationsAfterScroll = 0, $this._videoParallax()
        })
    },
    _initParallax: function() {
        var $this = this;
        this._video.get(0) && (this._video.get(0).onloadedmetadata = function() {
            $this._container.height($this._video.height())
        })
    },
    _videoParallax: function() {
        var bodyScrollTop = parseInt(this._window.scrollTop());
        this._videoContainer.css("top", -(bodyScrollTop / 2)), 1 == this.videoStatus && bodyScrollTop > this._container.height() && this._playToggle()
    },
    _scrollDown: function() {
        var containerHeight = this._container.height();
        $("html, body").animate({
            scrollTop: containerHeight
        }, 1e3, "swing")
    },
    _playToggle: function() {
        this._video.text() && (this._video.get(0).paused ? (this._video.get(0).play(), this._control.removeClass("play"), this._control.addClass("pause"), this.videoStatus = 1) : (this._video.get(0).pause(), this._control.removeClass("pause"), this._control.addClass("play"), this.videoStatus = 0))
    }
};
var slider = function() {
    this.init()
};
slider.prototype = {
    init: function() {
        this._setVars() && this._runSliders()
    },
    _setVars: function() {
        return this._sliderMain = $(".jsSliderContainer"), this._sliderMainControlsName = ".slider .bx-controls .bx-pager .bx-pager-item", this._sliderTwitter = $(".jsSliderTwitter"), this._sliderTestimonials = $(".jsSliderTestimonials"), this._sliderTestimonialsName = ".jsSliderTestimonials", this._sliderTestimonialsWrapperName = ".jsSliderTestimonialsWrapper", this.singleSlidePrecentage = 0, this.sliderObject = null, this.sliderTestimonialsObject = null, this._sliderGallery = $(".jsSliderGallery"), !0
    },
    _runSliders: function() {
        var $this = this;
        if (this._sliderMain.length > 1) {
            var slidesCount = 2;
            $(window).width() <= 750 && (slidesCount = 1), this.sliderObject = this._sliderMain.bxSlider({
                minSlides: slidesCount,
                maxSlides: slidesCount,
                moveSlides: 1,
                slideWidth: 610,
                onSliderLoad: function() {
                    var countSlider = parseInt($this._sliderMain.getSlideCount());
                    countSlider > 0 && ($this.singleSlidePrecentage = 100 / countSlider, $($this._sliderMainControlsName).width($this.singleSlidePrecentage + "%"))
                }
            })
        }
        if (this._sliderTwitter && this._sliderTwitter.bxSlider(), this._sliderTestimonials) {
            var sliderTestimonialsTouchScroll = !0;
            $(window).width() <= 750 && (sliderTestimonialsTouchScroll = !1), this.sliderTestimonialsObject = this._sliderTestimonials.bxSlider({
                mode: "vertical",
                slideMargin: 1,
                touchEnabled: sliderTestimonialsTouchScroll,
                onSliderLoad: function() {
                    var pagerHeight = parseInt($($this._sliderTestimonialsWrapperName).find(".bx-pager").innerHeight());
                    pagerHeight > 0 && $($this._sliderTestimonialsWrapperName).find(".bx-pager").css("margin-top", -(pagerHeight / 2))
                }
            })
        }
        this._sliderGallery && this._sliderGallery.bxSlider()
    }
};
var odometerInit = function() {
    this.init()
};
odometerInit.prototype = {
    _inited: !1,
    init: function() {
        var $this = this;
        this._setVars() && (this._initAllOdometer(), setInterval(function() {
            var scroll = $(document).scrollTop();
            $this.onScroll(scroll)
        }, 200))
    },
    _setVars: function() {
        return $(window).width() <= 750 ? !1 : (this._odometers = $(".jsOdometer"), this._odometers.length ? (this._inited = !0, !0) : !1)
    },
    _initAllOdometer: function() {
        var $this = this;
        this._odometers.each(function() {
            $this._initOdometer($(this))
        })
    },
    _initOdometer: function(obj) {
        var val = obj.text(),
            vl = val.length;
        obj.attr("data-def-val", val);
        var nVal = Math.pow(10, vl - 1);
        1 == nVal && (nVal = 0), obj.attr("data-null-val", nVal), obj.text(nVal)
    },
    _checkAllOdometer: function(scrollBot) {
        var $this = this;
        this._odometers.each(function() {
            $this._checkOdometer($(this), scrollBot)
        })
    },
    _checkOdometer: function(obj, scrollBot) {
        var objTop = obj.offset().top;
        if (scrollBot > objTop) {
            var oldVal = obj.text(),
                newVal = obj.attr("data-def-val");
            newVal != oldVal && (obj.text(newVal), this._inited = !1)
        }
    },
    onScroll: function(scrollTop) {
        if (this._inited) {
            var scrollBot = scrollTop + $(window).height();
            this._checkAllOdometer(scrollBot)
        }
    }
};
var tabs = function() {
    this.init()
};
tabs.prototype = {
    init: function() {
        this._setVars() && (this._setEvents(), this._initHeight())
    },
    _setVars: function() {
        return this._button = $(".jsTabsButton"), this._button ? (this._content = $(".jsTabsContent"), this._content ? (this._contentParent = this._content.parent(".tabsContent"), this._contentParent ? (this._belt = $(".jsTabsBelt"), this._belt ? (this._headerContent = $(".jsTabsHeaderContent"), this._headerContent ? (this._header = this._headerContent.parent(), this._header ? (this._arrows = $(".jsTabArrows"), this._arrows ? (this._arrowLeft = this._arrows.find(".tabsArrowLeft"), this._arrowLeft ? (this._arrowRight = this._arrows.find(".tabsArrowRight"), this._arrowRight ? !0 : !1) : !1) : !1) : !1) : !1) : !1) : !1) : !1) : !1
    },
    _setEvents: function() {
        var $this = this;
        this._button.on("click", function(e) {
            e.preventDefault(), $this._tabToggle($(this))
        }), this._arrowLeft.on("click", function(e) {
            e.preventDefault(), $this._tabsMoveLeft()
        }), this._arrowRight.on("click", function(e) {
            e.preventDefault(), $this._tabsMoveRight()
        })
    },
    _initHeight: function() {
        this._contentParent.height(this._contentParent.find(".active").height())
    },
    _tabToggle: function(obj) {
        var $this = this;
        this._button.removeClass("active"), this._content.removeClass("active"), obj.addClass("active");
        var tabId = obj.attr("data-tab-id");
        this._content.each(function() {
            $(this).attr("data-tab-id") == tabId && ($(this).addClass("active"), $this._contentParent.height($(this).height()))
        });
        var position = obj.offset(),
            parentPosition = obj.parent().offset(),
            offset = {
                top: position.top - parentPosition.top,
                left: position.left - parentPosition.left
            }, leftOffset = offset.left + parseInt(this._headerContent.css("left"));
        this._belt.animate({
            left: leftOffset
        }, 300, "swing")
    },
    regenerateBelt: function(slideLeftWidth) {
        obj = $(".jsTabsButton.active");
        var jstc = $(".jsTabsContent"),
            jstb = $(".jsTabsBelt"),
            position = obj.offset(),
            parentPosition = obj.parent().offset(),
            offset = {
                top: position.top - parentPosition.top,
                left: position.left - parentPosition.left
            }, leftOffset = offset.left + parseInt(slideLeftWidth);
        0 > leftOffset && (leftOffset = 0), leftOffset > jstc.width() && (leftOffset = jstc.width() - 60), jstb.animate({
            left: leftOffset
        }, 300, "swing")
    },
    _tabsMoveLeft: function() {
        var containerLeft = parseInt(this._headerContent.css("left"));
        if (0 >= containerLeft) {
            var slideLeftWidth = 0,
                tmpContainerWidth = 0;
            this._button.each(function() {
                tmpContainerWidth += -1 * ($(this).width() + parseInt($(this).css("margin-right"))), tmpContainerWidth > containerLeft && (slideLeftWidth = tmpContainerWidth)
            }), this._headerContent.css("left", slideLeftWidth), this.regenerateBelt(slideLeftWidth)
        }
    },
    _tabsMoveRight: function() {
        var containerLeft = parseInt(this._headerContent.css("left")),
            containerWidth = 0;
        if (this._button.each(function() {
            containerWidth += $(this).width() + parseInt($(this).css("margin-right"))
        }), containerLeft >= -1 * (containerWidth - this._contentParent.width())) {
            var slideLeftWidth = 0,
                tmpContainerWidth = 0;
            this._button.each(function() {
                tmpContainerWidth += -1 * ($(this).width() + parseInt($(this).css("margin-right"))), containerLeft > tmpContainerWidth && !slideLeftWidth && (slideLeftWidth = tmpContainerWidth)
            }), this._headerContent.css("left", slideLeftWidth), this.regenerateBelt(slideLeftWidth)
        }
    }
};
var responsive = function() {
    this.init()
};
responsive.prototype = {
    init: function() {
        var $this = this;
        this._setVars() && (this._setEvents(), this._onResize(), this._videoVisibility(), setTimeout(function() {
            $this._regenerateBg()
        }, 100), this._video.ready(function() {
            setTimeout(function() {
                $this._resizeVideo()
            }, 1e3)
        }))
    },
    _setVars: function() {
        return this._window = $(window), this._body = $("body"), this._video = $(".jsIntroVideo"), this._videoContainer = $(".jsIntroVideoContainer"), this._videoSource = $(".jsIntroVideo source"), this._videoTmpUrl = $(".jsIntroVideo source").attr("src"), this._introContainer = $(".jsIntroContainer"), this._sliderMainControlsName = ".slider .bx-controls .bx-pager .bx-pager-item", this._slidesCount = 2, this._sliderTestimonials = $(".jsSliderTestimonials"), this._sliderTestimonialsWrapperName = ".jsSliderTestimonialsWrapper", this._tabsContentParent = $(".jsTabsContent").parent(".content"), this._grayBg = $(".rightGrayBg"), this._orangeBg = $(".rightOrangeBg"), this._violetBg = $(".rightVioletBg"), this._sidebar = $(".sidebar"), this._bgWrapper = $(".bgWrapper"), this._responsiveMenuButton = $(".jsResponsiveMenuButton"), this._responsiveMenuContainer = $(".jsResponsiveMenuContainer"), this._tabsContentParent = $(".jsTabsContent").parent(".tabsContent"), !0
    },
    _setEvents: function() {
        var $this = this;
        this._responsiveMenuButton.on("click", function(e) {
            e.preventDefault(), $this._menuToggle()
        })
    },
    _menuToggle: function() {
        this._responsiveMenuContainer.is(":visible") ? (this._responsiveMenuContainer.slideUp(), this._responsiveMenuButton.removeClass("active")) : (this._responsiveMenuContainer.slideDown(), this._responsiveMenuButton.addClass("active"))
    },
    _onResize: function() {
        var $this = this;
        this._window.on("resize", function() {
            $this._runResponsive()
        })
    },
    _runResponsive: function() {
        this._regenerateSliderControls(), this._regenerateSliderTocuhScroll(), this._regenerateSliderItemsOnScreen(), this._resizeTabs(), this._resizeVideo(), this._regenerateBg(), this._regenerateHeader(), this._regenerateTabs(), document.tabs.regenerateBelt($(".jsTabsHeaderContent").css("left"))
    },
    _regenerateBg: function() {
        if ((this._grayBg.text() || this._orangeBg.text() || this._violetBg.text()) && this._sidebar.text() && this._bgWrapper.is(":visible")) {
            if (this._grayBg.text()) var bgWrapper = this._grayBg;
            if (this._orangeBg.text()) var bgWrapper = this._orangeBg;
            if (this._violetBg.text()) var bgWrapper = this._violetBg;
            var bgHeight = bgWrapper.outerHeight(),
                sidebarOffset = this._sidebar.offset(),
                sidebarWidth = this._window.width() - sidebarOffset.left;
            this._bgWrapper.css({
                left: sidebarOffset.left,
                width: sidebarWidth,
                height: bgHeight
            })
        }
    },
    _regenerateTabs: function() {
        if (this._tabsContentParent.text()) {
            var tabActive = this._tabsContentParent.find(".active");
            tabActive.css("height", "auto"), this._tabsContentParent.height(tabActive.height())
        }
    },
    _videoVisibility: function() {
        this._video.text() && this._window.width() <= 750 && (this._videoSource.attr("src", ""), this._video.removeAttr("autoplay", ""))
    },
    _regenerateHeader: function() {
        this._window.width() <= 750 ? this._body.removeClass("fixedHeader") : this._responsiveMenuContainer.show()
    },
    _regenerateSliderControls: function() {
        var $this = this;
        $($this._sliderMainControlsName).text() && setTimeout(function() {
            document.slider.singleSlidePrecentage > 0 && $($this._sliderMainControlsName).width(document.slider.singleSlidePrecentage + "%")
        }, 50)
    },
    _regenerateSliderTocuhScroll: function() {
        var $this = this;
        if (this._sliderTestimonials.text() && document.slider.sliderTestimonialsObject.text()) {
            var sliderTestimonialsTouchScroll = !0;
            $(window).width() <= 750 && (sliderTestimonialsTouchScroll = !1), document.slider.sliderTestimonialsObject.reloadSlider({
                mode: "vertical",
                slideMargin: 1,
                touchEnabled: sliderTestimonialsTouchScroll,
                onSliderLoad: function() {
                    var pagerHeight = parseInt($($this._sliderTestimonialsWrapperName).find(".bx-pager").innerHeight());
                    pagerHeight > 0 && $($this._sliderTestimonialsWrapperName).find(".bx-pager").css("margin-top", -(pagerHeight / 2))
                }
            })
        }
    },
    _resizeTabs: function() {
        this._tabsContentParent.text() && this._tabsContentParent.height(this._tabsContentParent.find(".active").height())
    },
    _resizeVideo: function() {
        this._introContainer.text() && (this._window.width() > 750 ? (this._introContainer.height(this._videoContainer.height()), this._video.width(this._videoContainer.width() >= 1700 ? this._videoContainer.width() : "auto")) : (this._introContainer.height("auto"), this._video.width("auto")))
    },
    _regenerateSliderItemsOnScreen: function() {
        var $this = this;
        if (document.slider.sliderObject) {
            var oldSlidesCount = this._slidesCount;
            this._slidesCount = $(window).width() <= 750 ? 1 : 2, this._slidesCount != oldSlidesCount && document.slider.sliderObject.reloadSlider({
                minSlides: $this._slidesCount,
                maxSlides: $this._slidesCount,
                moveSlides: 1,
                slideWidth: 610
            })
        }
    }
};
var contactMap = function() {
    this.init()
};
contactMap.prototype = {
    init: function() {
        var $this = this;
        if ("undefined" != typeof google && "undefined" != typeof google.maps) {
            if (this._maps = $(".jsContactMap"), !this._maps.length) return !1;
            this._pin_s = new google.maps.MarkerImage("/themes/dinebydesign/images/marker_map.png", null, null, new google.maps.Point(18, 47));
            var zoom = this._maps.data("zoom");
            zoom = void 0 == zoom ? 15 : parseInt(zoom);
            var latString = this._maps.data("lat"),
                lngString = this._maps.data("lng"),
                latlng = new google.maps.LatLng(parseFloat(latString), parseFloat(lngString));
            $this._initMap(this._maps, latlng, zoom)
        }
    },
    _initMap: function(mapObj, latlng, zoom) {
        {
            var style = [{
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#444444"
                }]
            }, {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    color: "#f2f2f2"
                }]
            }, {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 45
                }]
            }, {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "water",
                elementType: "all",
                stylers: [{
                    color: "#425a68"
                }, {
                    visibility: "on"
                }]
            }],
                _mapOptions = {
                    zoom: zoom,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: !1,
                    zoomControl: !0,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL,
                        position: google.maps.ControlPosition.LEFT_TOP
                    },
                    mapTypeControl: !1,
                    scaleControl: !1,
                    streetViewControl: !1,
                    overviewMapControl: !1,
                    scrollwheel: !1,
                    draggable: !1,
                    styles: style
                }, _map = new google.maps.Map(mapObj[0], _mapOptions);
            new google.maps.Marker({
                position: latlng,
                map: _map,
                icon: this._pin_s,
                animation: google.maps.Animation.DROP
            })
        }
    }
};
var header = function() {
    this.init()
};
header.prototype = {
    init: function() {
        this._setVars() && this._setEvents()
    },
    _setVars: function() {
        return this._window = $(window), this._body = $("body"), !0
    },
    _setEvents: function() {
        var $this = this;
        $(document).on("scroll", function() {
            $this._fixedHeader()
        })
    },
    _fixedHeader: function() {
        if (this._window.width() > 750) {
            var bodyScrollTop = this._window.scrollTop();
            bodyScrollTop >= 69 ? this._body.addClass("fixedHeader") : this._body.removeClass("fixedHeader")
        }
    }
};
var menu = function() {
    this.init()
};
menu.prototype = {
    init: function() {
        !this._setVars()
    },
    _setVars: function() {
        var $this = this;
        if (this._tabs = $(".jsMenuOpen"), !this._tabs.length) return !1;
        var idx = 0;
        return this._instances = new Array, this._tabs.each(function() {
            $this._instances[idx] = new menuInstance($(this)), idx++
        }), !0
    },
    refresh: function() {
        "undefined" != typeof this._instances && (this._instances = null), this.init()
    }
};
var menuInstance = function(obj) {
    this.init(obj)
};
menuInstance.prototype = {
    init: function(obj) {
        this._setVars(obj) && this._setEvents()
    },
    _setVars: function(obj) {
        return this._handler = $(obj), this._handler.length ? (this._container = this._handler.next(".submenu"), this._container.length ? !0 : !1) : !1
    },
    _setEvents: function() {
        var $this = this;
        this._handler.on("click", function(e) {
            e.preventDefault(), $this._subMenuToggle()
        })
    },
    _subMenuToggle: function() {
        this._container.is(":hidden") ? (this._container.slideDown(), this._handler.addClass("active")) : (this._handler.removeClass("active"), this._container.slideUp())
    }
};
// Photoswipe Call
$(document).ready(function(){

	//var myPhotoSwipe = $("#gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });

});


// Other Scripts
$(document).bind("mobileinit", function(){
    $.mobile.touchOverflowEnabled = true;
    $.mobile.pushStateEnabled = false;
});
 
$(document).ready(function() {
    /* Footer Handle Code */
    var mpx;
    var hx;
    var isDraging 
    var dr;
    $(document).on("mousedown touchstart",".handle",function(e){
        e.preventDefault();
        dr = $(this);
        isDraging = true;
        mpx = (e.type != "touchstart")?e.screenX:e.originalEvent.touches[0].pageX;
        hx = parseInt($(this).css("margin-left").replace('px',''))
    })
    $(document).on("mousemove touchmove",".handle",function(e){
        e.preventDefault();
        var pointX = (e.type != "touchmove")?e.screenX:e.originalEvent.touches[0].pageX;
        if(isDraging){
            var $this = $(this);
            var parent = $this.parent();
            var px = Math.max(0, Math.min(parent.width()-$this.width(),hx+(pointX-mpx)));
            $this.css('margin-left',px+"px");
        }
    })
    $(document).on("mouseup touchend",function(e){
        if(isDraging){
            e.preventDefault();
            isDraging = false;
            var $this = dr;
            var parent = $this.parent();
            var posx = parseInt($this.css("margin-left").replace('px',''));
            if(posx > parent.width()/2 - $this.width()/2){
                $this.stop().animate({'margin-left':parent.width()-$this.width()},300);
            }else{
                $this.stop().animate({'margin-left':0},300);
            }
        }
    })
    /* END: Footer Handle Code */
});


/* Home Slider Script */
function slider( _slides, _titles, _nav, _fadeTime, _sliderDelay, _acNavFunc){
    var self = this;
    this.slides = _slides;
    this.slidesTitles = _titles;
    this.sliderNav = _nav;
    this.totalSlides = self.sliderNav.size();
    this.currentSlide = 0;
    this.fadeTime = _fadeTime;
    this.sliderDelay = _sliderDelay;
    this.name;

    if(self.sliderDelay != -1){
        this.timeOut = setTimeout(next,self.sliderDelay);
    }

    
    if(!!_acNavFunc){
        this.changeActiveNav = _acNavFunc;
    }else{
        this.changeActiveNav = function(openId){
            self.sliderNav.filter('.active').removeClass('active');
            self.sliderNav.eq(openId).addClass('active');
        }
    }
    this.stop = function(){
        if(self.sliderDelay != -1)
            clearTimeout(self.timeOut);
    }
    this.start = function(){
        if(self.sliderDelay != -1)
            setTimeOut();
    }
    /* Fade Out All Items */
    self.slides.animate({opacity:0},0);
    if(self.slidesTitles != -1)
        self.slidesTitles.animate({opacity:0},0);
    /* Open First One */
    animateSlider(0,null);
    /* Add Indexes */
    self.sliderNav.each(function(i,val){
        $(val).data('index',i);
    });
    function setTimeOut(){
        clearTimeout(self.timeOut);
        if(self.sliderDelay != -1)
        self.timeOut = setTimeout(next,self.sliderDelay);
    }
    function next(){
        nextSlide = (self.currentSlide+1)%self.totalSlides;
        animateSlider(nextSlide,self.currentSlide);
        setTimeOut();
    }
    /* Click Event */
    self.sliderNav.on('mouseup touchend', function(e){
        e.preventDefault();
        $this = $(this);
        console.log("[Thumb] - Click: ",$this);
        thisId = Number( $this.data('index') );
        if($this.data('disabled') != 'true' && thisId != self.currentSlide){
            animateSlider( thisId, self.currentSlide );
            setTimeOut();
        }
    })
    function animateSlider( openId, closeId ){
        /* Image */
        swapTransition( openId!=null ?self.slides.eq(openId) :false, 
                        closeId!=null ?self.slides.eq(closeId) :false );
        /* Title */ 
        if(self.slidesTitles != -1){
            swapTransition( openId!=null ?self.slidesTitles.eq(openId) :false, 
                            closeId!=null ?self.slidesTitles.eq(closeId) :false );
        }
        /* Nav */
        if(self.changeActiveNav != null)
            self.changeActiveNav(openId);
        self.currentSlide = openId;
    }
    function swapTransition( openElem, closeElem ){
        if(!!closeElem)
            closeElem.stop().animate({opacity:0},self.fadeTime);
        if(!!openElem)
            openElem.stop().animate({opacity:1},self.fadeTime);
    }   
    return self;
}
/* END: Home Slider Script */
var myPlugin = {
      name: 'debugger',
      params: {
        debugger: false,
      },
      on: {
        init: function () {
          if (!this.params.debugger) return;

        },
        click: function (e) {
          if (!this.params.debugger) return;

        },
        tap: function (e) {
          if (!this.params.debugger) return;

        },
        doubleTap: function (e) {
          if (!this.params.debugger) return;

        },
        sliderMove: function (e) {
          if (!this.params.debugger) return;

        },
        slideChange: function () {
          if (!this.params.debugger) return;

        },
        slideChangeTransitionStart: function () {
          if (!this.params.debugger) return;

        },
        slideChangeTransitionEnd: function () {
          if (!this.params.debugger) return;

        },
        transitionStart: function () {
          if (!this.params.debugger) return;

        },
        transitionEnd: function () {
          if (!this.params.debugger) return;

        },
        fromEdge: function () {
          if (!this.params.debugger) return;

        },
        reachBeginning: function () {
          if (!this.params.debugger) return;

        },
        reachEnd: function () {
          if (!this.params.debugger) return;

        },
      },
    };
    Swiper.use(myPlugin);

    // Init Swiper
    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // Enable debugger
      debugger: true,
      loop: true,
      autoplay :{
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      effect : 'fade',
    });
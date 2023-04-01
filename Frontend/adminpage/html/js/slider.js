(function(jQuery) {


    "use strict";

    if ($('.d2-post-slider').length > 0) {
        const options = {
            centeredSlides: false,
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 3000
            },
            spaceBetween: 30,
            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                480: {
                    slidesPerView: 1
                },
                640: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 1
                },
                1024: {
                    slidesPerView: 2
                }
            },
            pagination: {
                el: '.swiper-pagination'
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },  
    
            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar'  
            }
        } 
        let swiper = new Swiper('.d2-post-slider',options);
    
        document.addEventListener('ChangeRtl', (e) => {
            swiper.destroy(true, true)
            setTimeout(() => {
                swiper = new Swiper('.d2-post-slider',options);
            }, 500);
        })   
    }
    if( $('.swiper-container').length >0){
      const  option1= {
            centerPadding: 30,
            slidesPerView: 3,
            loop: true,
            centeredSlides: false,
            autoplay: {
              delay: 2000
            },
            breakpoints: {
              320: {
                slidesPerView: 1
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 1
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 1
              },
              768: {
                slidesPerView: 2
              },
              1020: {
                slidesPerView: 3
              }
            }
          }
          let swiper = new Swiper('.swiper-container',option1);
    
          document.addEventListener('ChangeRtl', (e) => {
              swiper.destroy(true, true)
              setTimeout(() => {
                  swiper = new Swiper('.swiper-container',option1);
              }, 500);
          })   
    }
    if( $('.e-commerce-product').length >0){
        const  option2=  {
            centerPadding: 30,
            loop: true,
            centeredSlides: false,
            slidesPerView: 4,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          }
            let swiper = new Swiper('.e-commerce-product',option2);
      
            document.addEventListener('ChangeRtl', (e) => {
                swiper.destroy(true, true)
                setTimeout(() => {
                    swiper = new Swiper('.e-commerce-product',option2);
                }, 500);
            })   
    }
})(jQuery);
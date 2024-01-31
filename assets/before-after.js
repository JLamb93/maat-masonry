/* eslint-disable no-undef */
class BeforeAfter extends HTMLElement {
    constructor() {
      super();
      const slider = this;
      const before = document.getElementById('before-image');
      const beforeImage = before.getElementsByTagName('img')[0];
      const resizer = document.getElementById('resizer');
      if (document.readyState === 'complete') {
        this.init(slider, before, beforeImage, resizer);
      } else {
        window.addEventListener('load', () => {
          this.init(slider, before, beforeImage, resizer);
        });
      }
    }

    init(slider, before, beforeImage, resizer) {
      
      console.log('Before after slider init...')
      
      let active = false;

      const slideIt = (x) => {
        let transform = Math.max(25,(Math.min(x,slider.offsetWidth - 25)));
        before.style.width = transform-0+"px";
        resizer.style.left = transform+25+"px";  
      }
  
      //stop divs being selected.
      const pauseEvent = (e) => {
          if(e.stopPropagation) e.stopPropagation();
          if(e.preventDefault) e.preventDefault();
          e.cancelBubble=true;
          e.returnValue=false;
          return false;
      }

      //Sort overflow out for Overlay Image
      document.addEventListener("DOMContentLoaded", function() {
        let width = slider.offsetWidth;
        console.log(width);
        beforeImage.style.width = width + 'px';
      });

      //Adjust width of image on resize 
      window.addEventListener('resize', function() {
        let width = slider.offsetWidth - 25;
        console.log(width);
        beforeImage.style.width = width + 'px';
      })

      resizer.addEventListener('mousedown',function(){
        active = true;
      resizer.classList.add('resize');

      });

      document.body.addEventListener('mouseup',function(){
        active = false;
      resizer.classList.remove('resize');
      });

      document.body.addEventListener('mouseleave', function() {
        active = false;
        resizer.classList.remove('resize');
      });

      document.body.addEventListener('mousemove',function(e){
        if (!active) return;
        let x = e.pageX;
        x -= slider.getBoundingClientRect().left - 25;
        slideIt(x, before, resizer);
        pauseEvent(e);
      });

      resizer.addEventListener('touchstart',function(){
        active = true;
        resizer.classList.add('resize');
      });

      document.body.addEventListener('touchend',function(){
        active = false;
        resizer.classList.remove('resize');
      });

      document.body.addEventListener('touchcancel',function(){
        active = false;
        resizer.classList.remove('resize');
      });

      //calculation for dragging on touch devices
      document.body.addEventListener('touchmove',function(e){
        if (!active) return;
        let x;
        
        let i;
        for (i=0; i < e.changedTouches.length; i++) {
        x = e.changedTouches[i].pageX; 
        }
        
        x -= slider.getBoundingClientRect().left;
        slideIt(x, before, resizer);
        pauseEvent(e);
      });
    }
  }
  
  customElements.define('before-after', BeforeAfter);

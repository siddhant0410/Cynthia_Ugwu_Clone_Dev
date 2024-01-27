const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
       document.querySelector("#cursorcircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

function firstPageAnim() {
    var timeLine = gsap.timeline();
    timeLine.from("#nav",{
        y:'-10',
        opacity:0,
        ease : Expo,
        duration: 1.5,
    })
    .to(".boundingelem",{
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        stagger : .2,
        delay:-1,

    })
    .from("#landingfooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease : Expo.easeInOut,
        delay:-1,
    });
}

function skewCircle(){
    var xscale = 1;
    var yscale = 1;

    var xprev=0;
    var yprev=0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX-xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY-yprev);
      xprev = dets.clientX;
      yprev = dets.clientY;

      circleMouseFollower(xscale,yscale);

      timeout = setTimeout(() => {
        document.querySelector("#cursorcircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;

      }, 100);
      
    })
}


circleMouseFollower();
firstPageAnim();
skewCircle();


document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function(dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease :Power1,
            top : diff,
            left : dets.clientX,
            rotate : gsap.utils.clamp(-20, 20, diffrot * 0.5)

        });
    });

    elem.addEventListener("mousemove", function(dets){
        
    });
});

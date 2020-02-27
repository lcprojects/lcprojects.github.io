let resizeBg = () => {
    let wh = window.innerHeight;
    let hh = document.querySelector('.header-menu').clientHeight;
    let bgh = wh - hh;
    document.querySelector('.bg').style.height = bgh + 'px';
};

window.addEventListener('resize', resizeBg);

resizeBg();

let ul = document.querySelector('.slider ul')
let imgs = document.querySelectorAll('.slider ul li img')
let imgWidth = imgs[0].width;
let imgsLen = imgs.length;
let totalImgsWidth = imgsLen * imgWidth;
let current = 1;
ul.style.marginLeft = '0px';

document.querySelector('.slider-wrap').addEventListener('click', (e) => {
    prev = current;

    if (e.target.matches('.left')) {
        current--;
    } else if (e.target.matches('.right')) {
        current++;
    }

    if (prev !== current) {
        if (current === 0 ) {
            current = imgsLen / 3;
            myMove(-(((imgsLen) / 3)-1) * 900);
        } else if ((current - 1) === (imgsLen / 3)) {
            current = 1;
            myMove(0);
        } else {
            myMove(-((current - 1) * 900));
        }    
    }

    function myMove(marginLeftFinal) {
        let id = setInterval(frame, 5);
        let margin = 0;
        let i = 0;
        function frame() {
            let a = parseInt(ul.style.marginLeft.slice(0,-2));

            if (marginLeftFinal > a) {
                margin = 10;
            } else {
                margin = -10;
            }

            ul.style.marginLeft = a + margin + 'px';

            if (ul.style.marginLeft === marginLeftFinal + 'px') {
                clearInterval(id);
            }
        }
    }
});

$(document).ready(function() {
    $('.js--about').waypoint(function(direction) {
        if (direction == "down") {
            $('.header-menu').addClass('sticky');
        } else {
            $('.header-menu').removeClass('sticky');
        }
    }, {
        offset: '50px'
    });
});

$('.mobile-nav-icon').click(function() {
    var nav = $('.main-nav');
    var icon = $('.mobile-nav-icon i');


    nav.slideToggle(200);
    if (icon.hasClass('fa-times')) {
        icon.addClass('fa-bars');
        icon.removeClass('fa-times');
    } else {
        icon.removeClass('fa-bars');
        icon.addClass('fa-times');
    }
});
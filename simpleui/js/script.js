window.onload = function() {
    window.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown, .dropdown *')) {
            document.querySelectorAll('.dropdown-menu').forEach(el => {
                el.classList.remove('show')
            })
        }
    });

    document.querySelectorAll('.dropdown-trigger').forEach((el, index) => {
        el.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-menu').forEach(eldm => {
                if (el.nextElementSibling !== eldm) {
                    eldm.classList.remove('show');
                }
            });
            el.nextElementSibling.classList.toggle('show');
        })
    });

    document.querySelectorAll('.progress').forEach(el => {
        el.children[0].style.width = el.dataset.percentage;
    });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.querySelectorAll('.tab-h-item').forEach((tabhitem, index) => {
            tabhitem.addEventListener('click', (e) => {
                tab.querySelectorAll('.tab-h-item').forEach((tabhitem) => {
                    tabhitem.classList.remove('active');
                });
                tabhitem.classList.add('active');

                tab.querySelectorAll('.tab-b-item').forEach((tabhitem) => {
                    tabhitem.classList.remove('active');
                });
                tab.querySelectorAll('.tab-b-item')[index].classList.add('active');
            })
        })
    });

}
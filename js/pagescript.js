//global VARs

	var pos0 = 0;
	var pos1 = 1;
	var pos2 = 2;
	var pos3 = 3;

	var block = document.getElementById('block');

	var move = pos0;

	var iHolder = 0;

	// PAGE RESIZE SCRIPT

	function autoResize(){
        var blockWidth = block.offsetWidth;
        pos0 = 0;
        pos1 = -(0.25*(1 * blockWidth));
        pos2 = -(0.25*(2 * blockWidth));
        pos3 = -(0.25*(3 * blockWidth));

        var e = 0;

        if (iHolder == 1) {
        	e = pos1;
        }
        else if (iHolder == 2) {
        	e = pos2;
        }
        else if (iHolder == 3) {
        	e = pos3;
		}
		else {
			e = 0;
		}
		block.classList.remove("ease");
		block.style.left= e + 'px';
    };
    window.onresize = autoResize;
    autoResize();

	// PAGE SWAP SCRIPT

	// sliding pages
	function blockSwap(i) {
		move = i;
		block.classList.add("ease");
		block.style.left=move+'px';

		if (move == 0) {
			iHolder = 0;
		} 
		else if (move == pos1) {
			iHolder = 1;
		} 
		else if (move == pos2) {
			iHolder = 2;
		}
		else {
			iHolder = 3;
		}
	};

	// -------------------------------------------------

	// NAVBAR SCRIPT
		(function (window, document) {
			var menu = document.getElementById('menu'),

			WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

			function toggleHorizontal() {
				[].forEach.call(
					document.getElementById('menu').querySelectorAll('.menu-can-transform'),
					function(el){
						el.classList.toggle('menu-horizontal');
					}
				);
			};

			function toggleMenu() {
				// set timeout so that the panel has a chance to roll up
				// before the menu switches states
				if (menu.classList.contains('open')) {
					setTimeout(toggleHorizontal, 300);
				}
				else {
					toggleHorizontal();
				}
				menu.classList.toggle('open');
				document.getElementById('toggle').classList.toggle('x');
			};

			function closeMenu() {
				if (menu.classList.contains('open')) {
					toggleMenu();
				}
			}

			document.getElementById('toggle').addEventListener('click', function (e) {
				toggleMenu();
			});

			window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
		})(this, this.document);

//
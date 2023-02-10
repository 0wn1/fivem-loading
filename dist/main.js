
// Keybind Tips

// Examples:
// Bold: "<b>Text</b>"
// Italic: "<i>Text</b>"
// Line Break: "Line 1 \n Line 2"
// Colored: "<a style='color: yellow;'> Text </a>"

let keybinds = [
    "<b> LOADING SCREEN </b> \n\n <b>Volume</b> Arrow Up, Down or Scroll \n <b>Next Tip</b> Arrow Left / Right \n <b>Pause Music</b> Spacebar \n <b>Hide Tips</b> Escape",
    "<b> GAME INTERACTION </b> \n\n <b>Keybind1</b> Example \n <b>Keybind2</b> Example \n <b>Keybind3</b> Example \n <b>Keybind4</b> Example \n <b>Keybind5</b> Example",
	"<b> GAME INTERACTION </b> \n\n <b>Keybind6</b> Example \n <b>Keybind7</b> Example \n <b>Keybind8</b> Example \n <b>Keybind9</b> Example \n <b>Keybind10</b> Example",
	"<b> GAME INTERACTION </b> \n\n <b>Keybind11</b> Example \n <b>Keybind12</b> Example \n <b>Keybind13</b> Example \n <b>Keybind14</b> Example \n <b>Keybind15</b> Example",
	"<b> GAME INTERACTION </b> \n\n <b>Keybind16</b> Example \n <b>Keybind17</b> Example \n <b>Keybind18</b> Example \n <b>Keybind19</b> Example \n <b>Keybind20</b> Example",
	"<b> GAME INTERACTION </b> \n\n <b>Keybind21</b> Example \n <b>Keybind22</b> Example \n <b>Keybind23</b> Example \n <b>Keybind24</b> Example \n <b>Keybind25</b> Example"
];

//////////////////////////////
$(document).ready(function() {
	// Load Audio
    const audio = new Audio();
    audio.src = "assets/music.mp3";
	audio.load();
	audio.loop = true;
	audio.volume = 0.50;
	
	// Keybind Variables
    let currentKeybind = -1;
    let intervalId;
    // Pressed Keys
    document.addEventListener("keydown", function(event) {
        // Arrow Up/Down: Volume Control
        if (event.code === "ArrowUp") {
            audio.volume = Math.min(audio.volume + 0.1, 1);
			$('#volume').val(audio.volume * 100);
        } else if (event.code === "ArrowDown") {
            audio.volume = Math.max(audio.volume - 0.1, 0);
			$('#volume').val(audio.volume * 100);
		// Spacebar: Pause/Play Audio
        } else if (event.code === 'Space') {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
		// Escape Button: Show/Hide Keybind Tips
        } else if (event.code === "Escape") {
            let element = document.getElementById("tips");
            if (element.style.display === "none") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
		// Previous/Next Keybind Tips: Arrow Left/Right
        } else if (event.code === 'ArrowRight') {
			nextKeybind();
		}	else if (event.code === 'ArrowLeft') {
			prevKeybind();
		}
    });
    // Volume Control: Scroll Mouse Button
    document.addEventListener('mousewheel', function(event) {
        if (event.deltaY > 0) {
            audio.volume = Math.max(audio.volume - 0.1, 0);
        } else {
            audio.volume = Math.min(audio.volume + 0.1, 1);
        }
        $('#volume').val(audio.volume * 100);
    });
    // Disables Right Mouse Click Button (RMB)
    document.addEventListener('contextmenu',
        event => event.preventDefault()
    );
    // Hides the cursor when not moving
    let timer;
    document.addEventListener("mousemove", function() {
        document.body.style.cursor = "default";
        clearTimeout(timer);
        timer = setTimeout(() => {
            document.body.style.cursor = "none";
        }, 5000);
    });
	// Keybind Function: Show Previous Dialog
    function prevKeybind() {
        currentKeybind = (currentKeybind - 1 + keybinds.length) % keybinds.length;
        showKeybind(currentKeybind);
    }
	// Keybind Function: Show Next Dialog
    function nextKeybind() {
        currentKeybind = (currentKeybind + 1) % keybinds.length;
        showKeybind(currentKeybind);
    }
	// Keybind Function: Auto Scroll Dialog
    function autoScroll() {
        let tipsElement = document.getElementById("tips");
        if (tipsElement.style.display !== "none") {
            nextKeybind();
        }
    }
	// Keybind Function: Show Keybind
    function showKeybind(index) {
        let keybindTip = document.querySelector("#keybind-tip");
        keybindTip.classList.remove("fade-in");
		clearTimeout(intervalId);
        setTimeout(function() {
            let keybindTip = document.querySelector("#keybind-tip");
            keybindTip.innerHTML = keybinds[index].replace(/\n/g, "<br>");
            keybindTip.classList.add("fade-in");
        }, 500);
		intervalId = setTimeout(autoScroll, 10000);
    }
	// Keybind Events Listener
    document.querySelector("#prev").addEventListener("click", prevKeybind);
    document.querySelector("#next").addEventListener("click", nextKeybind);
	// Volume Slider
    const volumeSlider = document.getElementById("volume");
    volumeSlider.addEventListener("input", function() {
        const volume = this.value / 100;
        audio.volume = volume;
    });
    audio.play();
    autoScroll();
	// Make Keybind Tips Element Draggable
    $("#tips").draggable();
});
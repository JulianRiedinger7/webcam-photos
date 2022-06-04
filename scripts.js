const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((localMediaStream) => {
			console.log(localMediaStream);
			video.src = window.URL.createObjectURL(localMediaStream);
			video.play();
		})
		.catch((err) => console.error(`Oh no! ${err}`));
};

const paintToCanvas = () => {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(0, 0, video, width, height);
	}, 16);
};

const takePhoto = () => {
	//played the sound
	snap.currentTime = 0;
	snap.play();
	//take the data out of the canvas
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	link.textContent = 'Download Image';
	link.innerHTML = `<img src='${data}' alt='Handsome man'>`;
	strip.insertBefore(link, strip.firstChild);
};

video.addEventListener('canplay', paintToCanvas);

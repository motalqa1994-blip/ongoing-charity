// تهيئة مكتبة Wavesurfer
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#ffc107', // لون الموجة (ذهبي)
    progressColor: '#17a2b8', // لون تقدم التشغيل (سماوي)
    cursorColor: '#ffffff', // لون المؤشر
    barWidth: 3,
    barRadius: 3,
    barGap: 2,
    height: 100,
    responsive: true,
    hideScrollbar: true,
    backend: 'MediaElement', // استخدام MediaElement لتجنب مشاكل فك التشفير
});

// تحميل الملف الصوتي
        wavesurfer.load('https://drive.google.com/uc?export=download&id=15w3QhjxczkhJJSof7VNpo5JoxnxVErte');
// عناصر التحكم
const playPauseBtn = document.getElementById('playPauseBtn');
const timeDisplay = document.getElementById('time-display');

// دالة لتحويل الثواني إلى تنسيق (دقيقة:ثانية)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// تحديث عرض الوقت عند تحميل الملف
wavesurfer.on('ready', function () {
    const duration = wavesurfer.getDuration();
    timeDisplay.textContent = `0:00 / ${formatTime(duration)}`;
});

// تحديث عرض الوقت أثناء التشغيل
wavesurfer.on('audioprocess', function () {
    const currentTime = wavesurfer.getCurrentTime();
    const duration = wavesurfer.getDuration();
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
});

// تحديث زر التشغيل/الإيقاف
wavesurfer.on('play', function () {
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

wavesurfer.on('pause', function () {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
});

wavesurfer.on('finish', function () {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    wavesurfer.seekTo(0); // العودة إلى البداية
});

// وظيفة التشغيل/الإيقاف المؤقت
playPauseBtn.addEventListener('click', function () {
    wavesurfer.playPause();
});

// وظيفة النقر على الموجة للقفز في الصوت
wavesurfer.on('seek', function () {
    const currentTime = wavesurfer.getCurrentTime();
    const duration = wavesurfer.getDuration();
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
});

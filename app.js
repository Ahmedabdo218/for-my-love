/* ==========================================================================
   ROMANTIC LOVE LETTER & ENVELOPE - COMPLETE JAVASCRIPT ENGINE
   Includes: Dual Password Authentication (LOVE & Admin Ahmed), Admin Dashboard,
             WhatsApp Integration, 2-Year Counter Baseline, Canvas FX
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Calculate 2 Years Ago Default Date ---
    const now = new Date();
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
    const defaultStartDate = twoYearsAgo.toISOString().split('T')[0]; // e.g. 2024-08-08

    // --- State & Settings ---
    const defaultSettings = {
        partnerName: 'حبيبتي وروحي',
        yourName: 'أحمد',
        adminPhone: '201000000000',
        startDate: defaultStartDate,
        songUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
        letterText: 'حبيبتي الغالية، أريد أن أقول لكِ في هذه السطور البسيطة كم أنتِ غالية على قلبي. منذ سنتين دخلت فيها حياتي، تغير كل شيء إلى الأجمل. ابتسامتك تشفي كل جروحي، وصوتك يبعث في روحي الطمأنينة والسلام. أسأل الله أن يحفظك لي وأن تظل أيامي معك مليئة بالحب والدفء والضحكات التي لا تنتهي.. بحبك جداً!'
    };

    let settings = JSON.parse(localStorage.getItem('romantic_settings')) || defaultSettings;
    let herMessages = JSON.parse(localStorage.getItem('romantic_her_messages')) || [];

    // --- Elements ---
    const loginOverlay = document.getElementById('loginOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const loginError = document.getElementById('loginError');
    const userBadge = document.getElementById('userBadge');
    const logoutBtn = document.getElementById('logoutBtn');

    const introOverlay = document.getElementById('introOverlay');
    const envelope = document.getElementById('envelope');
    const sealBtn = document.getElementById('sealBtn');
    const openActionBtn = document.getElementById('openActionBtn');

    const bgAudio = document.getElementById('bgAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const discIcon = document.getElementById('discIcon');
    const soundWave = document.getElementById('soundWave');

    const partnerNameDisplay = document.getElementById('partnerNameDisplay');
    const yourNameDisplay = document.getElementById('yourNameDisplay');
    const typingText = document.getElementById('typingText');

    const yearsVal = document.getElementById('yearsVal');
    const daysVal = document.getElementById('daysVal');
    const hoursVal = document.getElementById('hoursVal');
    const minutesVal = document.getElementById('minutesVal');
    const secondsVal = document.getElementById('secondsVal');

    const sheReplyInput = document.getElementById('sheReplyInput');
    const saveReplyBtn = document.getElementById('saveReplyBtn');
    const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');
    const replyStatus = document.getElementById('replyStatus');

    // Admin Dashboard View Elements
    const saveAdminModal = document.getElementById('saveAdminModal');

    const tabMessagesBtn = document.getElementById('tabMessagesBtn');
    const tabSettingsBtn = document.getElementById('tabSettingsBtn');
    const tabMessages = document.getElementById('tabMessages');
    const tabSettings = document.getElementById('tabSettings');

    const receivedMessagesList = document.getElementById('receivedMessagesList');
    const messagesCountBadge = document.getElementById('messagesCountBadge');

    const partnerNameInput = document.getElementById('partnerNameInput');
    const yourNameInput = document.getElementById('yourNameInput');
    const adminPhoneInput = document.getElementById('adminPhoneInput');
    const songUrlInput = document.getElementById('songUrlInput');
    const startDateInput = document.getElementById('startDateInput');
    const letterTextInput = document.getElementById('letterTextInput');

    // Secret Gift
    const secretModalBtn = document.getElementById('secretModalBtn');
    const secretModal = document.getElementById('secretModal');
    const closeSecretModal = document.getElementById('closeSecretModal');
    const acceptSecretBtn = document.getElementById('acceptSecretBtn');
    const sendHugBtn = document.getElementById('sendHugBtn');

    // --- 1. Apply Settings ---
    function applySettings() {
        partnerNameDisplay.textContent = settings.partnerName;
        yourNameDisplay.textContent = `${settings.yourName} ✍️`;
        partnerNameInput.value = settings.partnerName;
        yourNameInput.value = settings.yourName;
        adminPhoneInput.value = settings.adminPhone || '';
        songUrlInput.value = settings.songUrl;
        startDateInput.value = settings.startDate;
        letterTextInput.value = settings.letterText;

        if (settings.songUrl && bgAudio.src !== settings.songUrl) {
            bgAudio.src = settings.songUrl;
        }
    }
    applySettings();

    // --- 2. Dual Password Authentication Engine ---
    sessionStorage.removeItem('romantic_user_role');
    let currentUserRole = null;

    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const saveStatus = document.getElementById('saveStatus');

    function checkLoginSession() {
        if (currentUserRole === 'admin') {
            loginOverlay.classList.add('hidden');
            document.body.classList.add('admin-mode');
            renderReceivedMessages();
            applySettings();
        } else if (currentUserRole === 'girlfriend') {
            loginOverlay.classList.add('hidden');
            document.body.classList.remove('admin-mode');
            userBadge.innerHTML = `<i class="fa-solid fa-heart"></i> أهلاً بحبيبتي ❤️`;
            introOverlay.classList.remove('hidden-by-default');
        } else {
            loginOverlay.classList.remove('hidden');
            document.body.classList.remove('admin-mode');
            introOverlay.classList.add('hidden-by-default');
        }
    }
    checkLoginSession();

    loginSubmitBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    function handleLogin() {
        const pass = passwordInput.value.trim();
        loginError.textContent = '';

        if (pass.toLowerCase() === 'love') {
            currentUserRole = 'girlfriend';
            sessionStorage.setItem('romantic_user_role', 'girlfriend');
            checkLoginSession();
            triggerHeartBurst(30);
        } else if (pass.toLowerCase() === 'admin ahmed' || pass === 'Admin Ahmed') {
            currentUserRole = 'admin';
            sessionStorage.setItem('romantic_user_role', 'admin');
            checkLoginSession();
            triggerHeartBurst(20);
        } else {
            loginError.textContent = 'رمز السر غير صحيح، أدخلي LOVE للعبور ❤️';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);
        }
    }

    function doLogout() {
        sessionStorage.removeItem('romantic_user_role');
        currentUserRole = null;
        checkLoginSession();
        passwordInput.value = '';
    }

    logoutBtn.addEventListener('click', doLogout);
    if (adminLogoutBtn) adminLogoutBtn.addEventListener('click', doLogout);

    // --- 3. Opening 3D Envelope & Audio ---
    let isEnvelopeOpen = false;

    function openEnvelope() {
        if (isEnvelopeOpen) return;
        isEnvelopeOpen = true;

        envelope.classList.add('open');
        playAudio();

        setTimeout(() => {
            introOverlay.classList.add('fade-out');
            setTimeout(() => {
                introOverlay.style.display = 'none';
                startTypingEffect(settings.letterText);
            }, 1200);
        }, 1000);
    }

    sealBtn.addEventListener('click', openEnvelope);
    openActionBtn.addEventListener('click', openEnvelope);
    envelope.addEventListener('click', (e) => {
        if (!isEnvelopeOpen && !e.target.closest('.seal-btn')) {
            openEnvelope();
        }
    });

    // --- 4. Advanced Multi-Track Audio Engine ---
    const songTitleDisplay = document.getElementById('songTitleDisplay');
    const prevTrackBtn = document.getElementById('prevTrackBtn');
    const nextTrackBtn = document.getElementById('nextTrackBtn');
    const volumeMuteBtn = document.getElementById('volumeMuteBtn');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBarWrapper = document.getElementById('progressBarWrapper');
    const progressBarFill = document.getElementById('progressBarFill');
    const currentTimeDisplay = document.getElementById('currentTimeDisplay');
    const durationTimeDisplay = document.getElementById('durationTimeDisplay');

    const playlist = [
        { title: 'أغنيتنا الخاصة 💖', url: settings.songUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3' },
        { title: 'لحن العشق الدافئ 🎻', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b9d3bf62.mp3?filename=romantic-love-piano-14732.mp3' },
        { title: 'أنغام شروق الحب ✨', url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_2d813898bd.mp3?filename=soft-romantic-piano-124976.mp3' }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    function loadTrack(index) {
        if (index < 0) index = playlist.length - 1;
        if (index >= playlist.length) index = 0;
        currentTrackIndex = index;

        const track = playlist[currentTrackIndex];
        songTitleDisplay.textContent = track.title;
        bgAudio.src = track.url;
        bgAudio.load();
    }
    loadTrack(0);

    function playAudio() {
        bgAudio.play().then(() => {
            isPlaying = true;
            updateAudioUI();
        }).catch(err => {
            console.log("Audio waiting for interaction", err);
        });
    }

    function pauseAudio() {
        bgAudio.pause();
        isPlaying = false;
        updateAudioUI();
    }

    function updateAudioUI() {
        if (isPlaying) {
            playIcon.className = 'fa-solid fa-pause';
            discIcon.classList.remove('paused');
            soundWave.classList.remove('paused');
        } else {
            playIcon.className = 'fa-solid fa-play';
            discIcon.classList.add('paused');
            soundWave.classList.add('paused');
        }
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) pauseAudio();
        else playAudio();
    });

    nextTrackBtn.addEventListener('click', () => {
        loadTrack(currentTrackIndex + 1);
        playAudio();
    });

    prevTrackBtn.addEventListener('click', () => {
        loadTrack(currentTrackIndex - 1);
        playAudio();
    });

    // Auto next when audio ends
    bgAudio.addEventListener('ended', () => {
        loadTrack(currentTrackIndex + 1);
        playAudio();
    });

    // Audio Progress Bar & Time Update
    bgAudio.addEventListener('timeupdate', () => {
        if (isNaN(bgAudio.duration)) return;
        const pct = (bgAudio.currentTime / bgAudio.duration) * 100;
        progressBarFill.style.width = pct + '%';
        currentTimeDisplay.textContent = formatAudioTime(bgAudio.currentTime);
        durationTimeDisplay.textContent = formatAudioTime(bgAudio.duration);
    });

    progressBarWrapper.addEventListener('click', (e) => {
        const rect = progressBarWrapper.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = clickX / rect.width;
        if (!isNaN(bgAudio.duration)) {
            bgAudio.currentTime = pct * bgAudio.duration;
        }
    });

    function formatAudioTime(secs) {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    }

    // Load saved volume level from localStorage
    let savedVolume = localStorage.getItem('romantic_volume');
    if (savedVolume !== null) {
        savedVolume = parseFloat(savedVolume);
        bgAudio.volume = savedVolume;
        if (volumeSlider) volumeSlider.value = savedVolume;
        updateVolumeIcon(savedVolume);
    } else {
        bgAudio.volume = 0.8;
    }

    // Volume Slider & Mute Engine
    volumeSlider.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        bgAudio.volume = vol;
        bgAudio.muted = (vol === 0);
        localStorage.setItem('romantic_volume', vol);
        updateVolumeIcon(vol);
    });

    volumeMuteBtn.addEventListener('click', () => {
        bgAudio.muted = !bgAudio.muted;
        if (bgAudio.muted) {
            volumeIcon.className = 'fa-solid fa-volume-xmark';
        } else {
            updateVolumeIcon(bgAudio.volume);
        }
        localStorage.setItem('romantic_volume', bgAudio.muted ? 0 : bgAudio.volume);
    });

    function updateVolumeIcon(vol) {
        if (vol === 0 || bgAudio.muted) {
            volumeIcon.className = 'fa-solid fa-volume-xmark';
        } else if (vol < 0.5) {
            volumeIcon.className = 'fa-solid fa-volume-low';
        } else {
            volumeIcon.className = 'fa-solid fa-volume-high';
        }
    }

    // --- 5. Love Counter (2 Years Default Baseline) ---
    function updateCounter() {
        const start = new Date(settings.startDate).getTime();
        const now = new Date().getTime();
        const diff = now - start;

        if (isNaN(diff) || diff < 0) {
            yearsVal.textContent = '0';
            daysVal.textContent = '0';
            hoursVal.textContent = '00';
            minutesVal.textContent = '00';
            secondsVal.textContent = '00';
            return;
        }

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        const years = Math.floor(totalDays / 365);
        const remainingDays = totalDays % 365;

        yearsVal.textContent = years;
        daysVal.textContent = remainingDays;
        hoursVal.textContent = hours < 10 ? '0' + hours : hours;
        minutesVal.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsVal.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateCounter, 1000);
    updateCounter();

    // --- 6. Typing Effect ---
    let typingIndex = 0;
    let typingTimer = null;

    function startTypingEffect(text) {
        typingText.textContent = '';
        typingIndex = 0;
        if (typingTimer) clearInterval(typingTimer);

        typingTimer = setInterval(() => {
            if (typingIndex < text.length) {
                typingText.textContent += text.charAt(typingIndex);
                typingIndex++;
            } else {
                clearInterval(typingTimer);
            }
        }, 40);
    }

    // --- 7. She Writes Back & WhatsApp Direct ---
    saveReplyBtn.addEventListener('click', () => {
        const msg = sheReplyInput.value.trim();
        if (!msg) {
            replyStatus.style.color = '#ff5252';
            replyStatus.textContent = 'من فضلكِ اكتبي رسالتكِ أولاً يا حبيبتي ❤️';
            return;
        }

        const newMsgObj = {
            id: Date.now(),
            text: msg,
            date: new Date().toLocaleString('ar-EG')
        };

        herMessages.unshift(newMsgObj);
        localStorage.setItem('romantic_her_messages', JSON.stringify(herMessages));

        replyStatus.style.color = '#4caf50';
        replyStatus.textContent = 'تم حفظ رسالتكِ بنجاح! وسيراها حبيبك أحمد في لوحة تحكمه ❤️';
        triggerHeartBurst(30);
    });

    sendWhatsappBtn.addEventListener('click', () => {
        const msg = sheReplyInput.value.trim();
        if (!msg) {
            replyStatus.style.color = '#ff5252';
            replyStatus.textContent = 'من فضلكِ اكتبي رسالتكِ أولاً ليتم إرسالها عبر الواتساب ❤️';
            return;
        }

        const phone = settings.adminPhone || '';
        const encodedText = encodeURIComponent(`رسالة حب من حبيبتك 💌:\n\n"${msg}"\n\n- أُرسلت من موقعنا الرومانسي ❤️`);
        const waUrl = phone ? `https://wa.me/${phone}?text=${encodedText}` : `https://wa.me/?text=${encodedText}`;

        window.open(waUrl, '_blank');
        triggerHeartBurst(25);
    });

    // --- 8. Admin Dashboard Controls & Tab Switching ---
    if (tabMessagesBtn && tabSettingsBtn) {
        tabMessagesBtn.addEventListener('click', () => {
            tabMessagesBtn.classList.add('active');
            tabSettingsBtn.classList.remove('active');
            tabMessages.classList.add('active');
            tabSettings.classList.remove('active');
        });

        tabSettingsBtn.addEventListener('click', () => {
            tabSettingsBtn.classList.add('active');
            tabMessagesBtn.classList.remove('active');
            tabSettings.classList.add('active');
            tabMessages.classList.remove('active');
        });
    }

    function renderReceivedMessages() {
        messagesCountBadge.textContent = herMessages.length;
        if (herMessages.length === 0) {
            receivedMessagesList.innerHTML = `<div class="no-msgs"><i class="fa-solid fa-envelope-open" style="font-size: 32px; margin-bottom: 10px; opacity: 0.5;"></i><p>لم تكتب لك حبيبتك أي رسالة بعد.. ستظهر الرسائل هنا فور إرسالها!</p></div>`;
            return;
        }

        receivedMessagesList.innerHTML = herMessages.map(m => `
            <div class="msg-item">
                <div class="msg-item-header">
                    <span><i class="fa-solid fa-calendar-check"></i> ${m.date}</span>
                    <button class="delete-msg-btn" onclick="deleteMessage(${m.id})" title="حذف الرسالة"><i class="fa-solid fa-trash"></i></button>
                </div>
                <div class="msg-text">"${m.text}"</div>
            </div>
        `).join('');
    }

    window.deleteMessage = function(id) {
        herMessages = herMessages.filter(m => m.id !== id);
        localStorage.setItem('romantic_her_messages', JSON.stringify(herMessages));
        renderReceivedMessages();
    };

    saveAdminModal.addEventListener('click', () => {
        settings.partnerName = partnerNameInput.value.trim() || defaultSettings.partnerName;
        settings.yourName = yourNameInput.value.trim() || defaultSettings.yourName;
        settings.adminPhone = adminPhoneInput.value.trim() || defaultSettings.adminPhone;
        settings.songUrl = songUrlInput.value.trim() || defaultSettings.songUrl;
        settings.startDate = startDateInput.value || defaultSettings.startDate;
        settings.letterText = letterTextInput.value.trim() || defaultSettings.letterText;

        localStorage.setItem('romantic_settings', JSON.stringify(settings));
        applySettings();
        updateCounter();
        startTypingEffect(settings.letterText);

        if (isPlaying) {
            bgAudio.load();
            playAudio();
        }

        if (saveStatus) {
            saveStatus.textContent = 'تم حفظ جميع التغييرات وتحديث الموقع بنجاح! ✨';
            setTimeout(() => saveStatus.textContent = '', 4000);
        }
        triggerHeartBurst(30);
    });

    // --- 9. Secret Gift Modal ---
    secretModalBtn.addEventListener('click', () => {
        secretModal.classList.add('active');
        triggerHeartBurst(30);
    });

    closeSecretModal.addEventListener('click', () => secretModal.classList.remove('active'));
    acceptSecretBtn.addEventListener('click', () => {
        secretModal.classList.remove('active');
        triggerHeartBurst(50);
    });

    sendHugBtn.addEventListener('click', () => triggerHeartBurst(40));

    function triggerHeartBurst(count = 30) {
        for (let i = 0; i < count; i++) createBurstHeart();
    }

    function createBurstHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = ['💖', '❤️', '💕', '🌹', '✨'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.zIndex = '999999';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'transform 3s cubic-bezier(0.25, 1, 0.5, 1), opacity 3s ease';
        
        document.body.appendChild(heart);

        setTimeout(() => {
            const tx = (Math.random() - 0.5) * 300;
            const ty = -(Math.random() * 600 + 400);
            heart.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg) scale(1.5)`;
            heart.style.opacity = '0';
        }, 50);

        setTimeout(() => heart.remove(), 3100);
    }

    // --- 10. Rich HTML5 Canvas Particle Engine ---
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 55;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height + height;
            this.size = Math.random() * 14 + 8;
            this.speedY = Math.random() * 1.6 + 0.6;
            this.speedX = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.type = Math.random() > 0.4 ? 'heart' : 'petal';
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }

        update() {
            this.y -= this.speedY;
            this.x += Math.sin(this.y * 0.01) + this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y < -30) {
                this.reset();
                this.y = height + 20;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;

            if (this.type === 'heart') {
                ctx.fillStyle = '#ff4081';
                ctx.beginPath();
                const d = this.size;
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
                ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
                ctx.fill();
            } else {
                ctx.fillStyle = '#d81b60';
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size / 2, this.size, Math.PI / 4, 0, 2 * Math.PI);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        p.y = Math.random() * height;
        particles.push(p);
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const calendar = document.getElementById('calendar');

        // 🎄 Takvim 7 Kasım 2025'te başlıyor
        const startDate = new Date('2025-11-06');
        const today = new Date();

        // Kaç gün geçtiğini hesapla (1. gün = 6 Kasım)
        const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

        // Başlangıçtan önceyse 0, 35 günden fazlaysa 35 yap
        const currentDay = diffDays < 1 ? 0 : diffDays > 35 ? 35 : diffDays;

        data.forEach(item => {
            const dayBox = document.createElement('div');
            dayBox.classList.add('day');
            dayBox.textContent = item.day;

            // 🎁 Gerçek mod (bugüne kadar açılabilir)
            if (item.day <= currentDay) {
                dayBox.addEventListener('click', () => openModal(item));
                dayBox.style.opacity = "1";
                dayBox.style.cursor = "pointer";
            } else {
                dayBox.style.opacity = "0.5";
                dayBox.style.cursor = "not-allowed";
            }

            // 💡 TEST MODU (istersen aktif et, yukarıyı kapat)
            /*
            dayBox.addEventListener('click', () => openModal(item));
            dayBox.style.opacity = "1";
            dayBox.style.cursor = "pointer";
            */

            calendar.appendChild(dayBox);
        });
    });

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal_image');
const modalStory = document.getElementById('modal_story');
const closeBtn = document.getElementById('close');

function openModal(item) {
    modal.style.display = 'block';
    modalImg.src = item.image;
    modalStory.textContent = item.story;

    // Kutuyu yeşile dönüştür (açıldı olarak işaretle)
    const dayBoxes = document.querySelectorAll('.day');
    dayBoxes.forEach(box => {
        if (box.textContent == item.day) {
            box.classList.add('open'); // yeşil class
        }
    });
}


// Kapatma işlemleri
closeBtn.onclick = () => (modal.style.display = 'none');
window.onclick = e => {
    if (e.target == modal) modal.style.display = 'none';
};

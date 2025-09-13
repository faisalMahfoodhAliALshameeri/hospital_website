// Mobile Menu Toggle
let menubar = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menubar.onclick = () => {
    menubar.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

// ============ Hero Carousel ============
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlides() {
    // إخفاء كل الصور
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // إزالة active من كل النقاط
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // عرض الصورة التالية
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    
    // عرض الصورة الحالية
    slides[slideIndex].classList.add('active');
    indicators[slideIndex].classList.add('active');
    
    // تكرار كل 5 ثواني
    setTimeout(showSlides, 5000);
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

// بدء السلايدر عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0 && indicators.length > 0) {
        // عرض أول صورة عند التحميل
        slides[0].classList.add('active');
        indicators[0].classList.add('active');
        
        // بدء التدوير بعد 5 ثواني
        setTimeout(showSlides, 5000);
    } else if (slides.length > 0) {
        // إذا ما فيش indicators - نعرض أول صورة بس
        slides[0].classList.add('active');
        setTimeout(showSlides, 5000);
    }
});

// ============ Patient Search Functionality ============
function searchPatientInHeader() {
    const query = document.getElementById('searchPatientInput').value.trim().toLowerCase();
    if (!query) {
        document.getElementById('searchResultsHeader').innerHTML = 
            `<p style="text-align:center; color:#e74c3c; font-size:1.5rem;">❌ يرجى إدخال نص للبحث</p>`;
        document.getElementById('searchResultsHeader').classList.add('show');
        return;
    }

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

    const results = patients.filter(p => 
        p.name.toLowerCase().includes(query) || p.phone.includes(query)
    );

    if (results.length === 0) {
        document.getElementById('searchResultsHeader').innerHTML = 
            `<p style="text-align:center; color:#e74c3c; font-size:1.5rem;">❌ لا يوجد مريض بهذا الاسم أو الرقم</p>`;
        document.getElementById('searchResultsHeader').classList.add('show');
        return;
    }

    let html = '';
    results.forEach(patient => {
        html += `
            <h4><i class="fa-solid fa-user-injured"></i> ${patient.name}</h4>
            <p><i class="fa-solid fa-phone"></i> ${patient.phone}</p>
            <p><i class="fa-solid fa-envelope"></i> ${patient.email || 'غير متوفر'}</p>
            <p><i class="fa-solid fa-cake-candles"></i> ${patient.dob || 'غير متوفر'}</p>
        `;

        const patientAppointments = appointments.filter(a => a.patientId === patient.id);
        if (patientAppointments.length > 0) {
            html += `<p style="margin-top:1rem; padding-top:1rem; border-top:2px dashed #bdc3c7; font-weight:700;">
                        <i class="fa-solid fa-calendar-days"></i> عدد المواعيد: ${patientAppointments.length}
                     </p>`;
        }
    });

    document.getElementById('searchResultsHeader').innerHTML = html;
    document.getElementById('searchResultsHeader').classList.add('show');
}
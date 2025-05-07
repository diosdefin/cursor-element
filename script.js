const face = document.querySelector('.eyes-container');
const mouth = document.querySelector('.mouth');

document.addEventListener('mousemove', function(event) {
    const faceRect = face.getBoundingClientRect();
    const isInsideFace = (
        event.clientX >= faceRect.left &&
        event.clientX <= faceRect.right &&
        event.clientY >= faceRect.top &&
        event.clientY <= faceRect.bottom
    );
    
    if (isInsideFace) {
        mouth.classList.add('open');   // рот открывается
    } else {
        mouth.classList.remove('open'); // рот закрывается с улыбкой
    }
});



// Создаем отражения в зрачках
document.querySelectorAll('.pupil').forEach(pupil => {
    const reflection = document.createElement('div');
    reflection.className = 'reflection';
    pupil.appendChild(reflection);
});

let mouseMoveTimer;
const eyes = document.querySelectorAll('.eye');
const returnDelay = 3000; // 3 секунды до возврата в центр

// Функция моргания
function blinkEyes() {
    // Первое закрытие
    eyes.forEach(eye => {
        eye.style.transition = 'all 0.1s ease-out';
        eye.style.height = '5px';
        eye.querySelector('.pupil').style.opacity = '0';
    });
    
    // Открытие через короткий промежуток
    setTimeout(() => {
        eyes.forEach(eye => {
            eye.style.height = '100px';
            eye.querySelector('.pupil').style.opacity = '1';
        });
        
        // Второе закрытие (двойное моргание)
        setTimeout(() => {
            eyes.forEach(eye => {
                eye.style.height = '5px';
                eye.querySelector('.pupil').style.opacity = '0';
            });
            
            // Финальное открытие
            setTimeout(() => {
                eyes.forEach(eye => {
                    eye.style.height = '100px';
                    eye.querySelector('.pupil').style.opacity = '1';
                });
            }, 200);
        }, 200);
    }, 200);
}

function startBlinking() {
    const delay = Math.random() * 3000 + 5000; // 3000–5000 мс
    setTimeout(() => {
        blinkEyes();         // моргание
        startBlinking();     // запустить следующее моргание
    }, delay);
}

startBlinking(); // старт моргания
document.addEventListener('mousemove', function(event) {
    // Сбрасываем таймер при движении мыши
    clearTimeout(mouseMoveTimer);
    
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const dx = event.clientX - eyeCenterX;
        const dy = event.clientY - eyeCenterY;
        const cursorDistance = Math.sqrt(dx * dx + dy * dy);
        
        const pupil = eye.querySelector('.pupil');
        const angle = Math.atan2(dy, dx);
        
        const eyeRadius = rect.width / 2;
        const pupilRadius = 25; // Половина ширины зрачка (50px/2)
        const maxPupilDistance = eyeRadius - pupilRadius - 2;
        
        if (cursorDistance < eyeRadius * 2) {
            const pupilDistance = cursorDistance * 0.1;
            const x = Math.cos(angle) * pupilDistance;
            const y = Math.sin(angle) * pupilDistance;
            pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)`;
        } else {
            const normalizedDistance = Math.min(1, (cursorDistance - eyeRadius * 0.5) / (eyeRadius * 10));
            const pupilDistance = maxPupilDistance * (0.3 + 0.7 * normalizedDistance);
            const x = Math.cos(angle) * pupilDistance;
            const y = Math.sin(angle) * pupilDistance;
            pupil.style.transform = `translate(calc(-40% + ${x}px), calc(-40% + ${y}px)`;
        }
    });
    
    mouseMoveTimer = setTimeout(returnPupilsToCenter, returnDelay);
});

function returnPupilsToCenter() {
    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        pupil.style.transition = 'transform 0.3s ease-out';
        pupil.style.transform = 'translate(-50%, -50%)';
        
        setTimeout(() => {
            pupil.style.transition = 'transform 0.2s ease-out';
        }, 500);
    });
}







// Проверка нахождения курсора внутри головы
const isInsideFace = (
    event.clientX >= faceRect.left &&
    event.clientX <= faceRect.right &&
    event.clientY >= faceRect.top &&
    event.clientY <= faceRect.bottom
);

// Анимация рта
if (isInsideFace) {
    mouth.classList.add('open');
} else {
    mouth.classList.remove('open');
}
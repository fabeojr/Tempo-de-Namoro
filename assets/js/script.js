// Data de início do relacionamento
const targetDate = new Date('2024-06-14T00:00:00');
// Nova data para a segunda contagem
const secondTargetDate = new Date('2024-03-14T00:00:00'); 


function convertDaysToMonths(days) {
    return Math.floor(days / 30.00); 
}

function updateCountdown() {
    const now = new Date();

    
    const timeDifference = now - targetDate;
    const seconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(secs).padStart(2, '0');

   
    document.getElementById('days-passed').textContent = days;
    document.getElementById('months-passed').textContent = convertDaysToMonths(days);

    
    const secondTimeDifference = now - secondTargetDate;
    const secondSeconds = Math.floor(secondTimeDifference / 1000);
    const secondDays = Math.floor(secondSeconds / (24 * 3600));

    
    document.getElementById('total-days').textContent = secondDays;
    document.getElementById('total-months').textContent = convertDaysToMonths(secondDays);
}


let currentSlide = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const totalSlides = document.querySelectorAll('.carousel-item').length;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}


function addCarouselJumpEffect() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transition = 'transform 0.3s ease-out, transform 0.3s ease-in';
            item.style.transform = 'scale(1.05)'; 
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
        });
    });
}


setInterval(updateCountdown, 1000);
updateCountdown(); 


function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = `
        <span></span><span></span><span></span> Digitando...
    `;
    return typingIndicator;
}


function sendResponse(option) {
    const chat = document.getElementById('chat');
    const chatOptions = document.getElementById('chat-options');
    const resetButton = document.getElementById('reset-button');

    
    chatOptions.style.display = 'none';

    
    let userMessage = '';
    let typingMessage = '';

    if (option === '1') {
        userMessage = `
            <div class="message sent">
                <span style= "color: #fff"class="text">Pode, sim, meu amor.</span>
                <span class="time">18:12</span>
            </div>`;
        typingMessage = `
            <div class="message received">
                <span  style= "color: #d1d0d0" class="text">Eu te amo de um jeito que dói e acalma ao mesmo tempo. É como se cada batida do meu coração dependesse de você. Não consigo imaginar um segundo sem te querer, sem te sentir, como se a tua presença fosse o ar que me mantém vivo.❤️</span>
                <span class="time">18:12</span>
            </div>`;
    } else if (option === '2') {
        userMessage = `
            <div class="message sent">
                <span style= "color: #fff" class="text">Não, lixorrr.</span>
                <span class="time">18:12</span>
            </div>`;
        typingMessage = `
            <div class="message received">
                <span style= "color: #d1d0d0" class="text">Tudo bem, então 💔.</span>
                <span class="time">18:12</span>
            </div>`;
    }

    chat.innerHTML += userMessage;

    
    setTimeout(() => {
        const typingIndicator = showTypingIndicator();
        chat.appendChild(typingIndicator);

      
        setTimeout(() => {
            chat.removeChild(typingIndicator); 
            chat.innerHTML += typingMessage;

            
            chat.scrollTop = chat.scrollHeight;

            
            if (option === '2') {
                document.getElementById('reset-button').style.display = 'block';
            }
        }, 4000); 
    }, 2000); 
    
}


function resetChat() {
    const chat = document.getElementById('chat');
    const chatOptions = document.getElementById('chat-options');
    const resetButton = document.getElementById('reset-button');

    
    chat.innerHTML = `
        <div class="message received">
            <span style= "color: #d1d0d0" class="text">Posso te contar um segredo, amor?</span>
            <span class="time">18:11</span>
        </div>
    `;
    chatOptions.style.display = 'block';
    
    
    resetButton.style.display = 'none';
}


document.getElementById('reset-button').addEventListener('click', resetChat);


addCarouselJumpEffect();

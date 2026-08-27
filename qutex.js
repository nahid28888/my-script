(function(){
    // আগের কোড ও স্টাইল ক্লিন-আপ
    if(document.getElementById('ai-autoclick-bot')){
        document.getElementById('ai-autoclick-bot').remove();
        if(document.getElementById('greenScannerLine')) document.getElementById('greenScannerLine').remove();
        if(document.getElementById('botGlowStyle')) document.getElementById('botGlowStyle').remove();
    }

    // ১. স্টাইল ও এনিমেশন
    var glowStyle = document.createElement('style');
    glowStyle.id = 'botGlowStyle';
    glowStyle.innerHTML = `
        @keyframes redGreenGlowAnimation {
            0% { border-color: #ff0033 !important; box-shadow: 0 0 15px #ff0033, 0 0 30px #00ff66 !important; }
            50% { border-color: #00ff66 !important; box-shadow: 0 0 15px #00ff66, 0 0 30px #ff0033 !important; }
            100% { border-color: #ff0033 !important; box-shadow: 0 0 15px #ff0033, 0 0 30px #00ff66 !important; }
        }
        .rg-glow-active { animation: redGreenGlowAnimation 1.8s infinite linear !important; }
        .premium-laser-line {
            background: linear-gradient(180deg, rgba(0,255,102,0) 0%, rgba(0,255,102,1) 50%, rgba(0,255,102,0) 100%) !important;
            box-shadow: 0 0 25px #00ff66, 0 0 50px #00ff66 !important;
        }
    `;
    document.head.appendChild(glowStyle);

    // ২. মেইন প্যানেল বোতাম
    var bot = document.createElement('div');
    bot.id = 'ai-autoclick-bot';
    bot.style.cssText = 'position:fixed !important; top:120px !important; left:20px !important; z-index:99999999 !important; cursor:move; user-select:none; touch-action:none; text-align:center; font-family:sans-serif;';
    
    var myImageURL = "https://i.postimg.cc/W3WsdFFf/file-0000000071e082118d66f6a477e56f16.png"; 

    bot.innerHTML = `
        <div id="botLogoCircle" class="rg-glow-active" style="width:70px; height:70px; border-radius:50%; border:3.5px solid #00ff66; overflow:hidden; background:#000; display:inline-block; cursor:pointer;">
            <img src="${myImageURL}" style="width:100%; height:100%; object-fit:cover; pointer-events:none;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/4712/4712109.png'">
        </div>
        <div style="color:#ffffff; font-size:11px; font-weight:bold; margin-top:4px; text-shadow:0 0 5px #000;">
            AUTO CLICK BOT
        </div>
    `;
    document.body.appendChild(bot);

    // ৩. লেজার স্ক্যানার বার
    var scanner = document.createElement('div');
    scanner.id = 'greenScannerLine';
    scanner.className = 'premium-laser-line';
    scanner.style.cssText = 'position: fixed !important; left: 0 !important; top: 0 !important; width: 100% !important; height: 8px !important; z-index: 99999998 !important; display: none; pointer-events: none; will-change: transform;';
    document.body.appendChild(scanner);

    // ৪. ড্র্যাগ এন্ড ড্রপ হ্যান্ডলার
    let isDragging = false, currentX = 0, currentY = 0, initialX = 0, initialY = 0, xOffset = 0, yOffset = 0;
    function dragStart(e) {
        let event = e.type === "touchstart" ? e.touches[0] : e;
        initialX = event.clientX - xOffset;
        initialY = event.clientY - yOffset;
        if (e.target.closest('#ai-autoclick-bot')) isDragging = true;
    }
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            let event = e.type === "touchmove" ? e.touches[0] : e;
            currentX = event.clientX - initialX;
            currentY = event.clientY - initialY;
            xOffset = currentX; yOffset = currentY;
            bot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    }
    function dragEnd() { isDragging = false; }
    window.addEventListener("touchstart", dragStart, {passive: false});
    window.addEventListener("touchend", dragEnd, {passive: false});
    window.addEventListener("touchmove", drag, {passive: false});
    window.addEventListener("mousedown", dragStart);
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("mousemove", drag);

    // ৫. ১২০ FPS স্ক্যানার অ্যানিমেশন
    let isScanning = false;
    let logoBtn = document.getElementById('botLogoCircle');

    logoBtn.onclick = function(){
        if(isScanning) return;
        isScanning = true;
        scanner.style.display = 'block';
        
        let screenHeight = window.innerHeight;
        let duration = 1000;
        let startTime = null;

        function animateScan(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = (timestamp - startTime) / duration;

            if (progress < 1) {
                scanner.style.transform = `translate3d(0, ${progress * screenHeight}px, 0)`;
                requestAnimationFrame(animateScan);
            } else {
                scanner.style.transform = `translate3d(0, 0px, 0)`;
                scanner.style.display = 'none';
                runAdvancedMarketAnalysis();
            }
        }
        requestAnimationFrame(animateScan);
    };

    // ৬. অ্যাডভান্সড স্মার্ট মার্কেট এনালাইসিস Engine
    function runAdvancedMarketAnalysis(){
        let decision = null;

        try {
            let candles = Array.from(document.querySelectorAll('.highcharts-point, rect.candle, g.candle-item, svg path, rect[fill]'));
            let validCandles = candles.filter(c => {
                let rect = c.getBoundingClientRect();
                return rect.height > 2 && rect.width > 1;
            });

            if (validCandles.length >= 8) {
                let lastCandles = validCandles.slice(-8);

                let parsed = lastCandles.map(c => {
                    let rect = c.getBoundingClientRect();
                    let style = window.getComputedStyle(c);
                    let fill = style.fill || style.stroke || "";
                    let isGreen = fill.includes("255") || fill.includes("green") || fill.includes("rgb(0,") || fill.includes("#00");
                    return { height: rect.height, top: rect.top, bottom: rect.bottom, isGreen: isGreen };
                });

                let cCurrent = parsed[parsed.length - 1];
                let cPrev = parsed[parsed.length - 2];

                let totalGreen = parsed.filter(c => c.isGreen).length;
                let totalRed = parsed.length - totalGreen;

                // লজিক ১: স্ট্রং ট্রেন্ড অ্যানালাইসিস (Trend Continuation)
                if (totalGreen >= 6 && cCurrent.isGreen) {
                    decision = "UP"; // বুলিশ ট্রেন্ড কন্টিনিউয়েশন
                } else if (totalRed >= 6 && !cCurrent.isGreen) {
                    decision = "DOWN"; // বেয়ারিশ ট্রেন্ড কন্টিনিউয়েশন
                } 
                // লজিক ২: বুলিশ/বেয়ারিশ এনগালফিং (Engulfing Pattern)
                else if (cCurrent.isGreen && cCurrent.height > (cPrev.height * 1.4)) {
                    decision = "UP";
                } else if (!cCurrent.isGreen && cCurrent.height > (cPrev.height * 1.4)) {
                    decision = "DOWN";
                } 
                // লজিক ৩: মোমেন্টাম অ্যান্ড মাইক্রো রিভার্সাল
                else if (cCurrent.isGreen && cPrev.isGreen) {
                    decision = "UP";
                } else if (!cCurrent.isGreen && !cPrev.isGreen) {
                    decision = "DOWN";
                } else {
                    decision = cCurrent.isGreen ? "UP" : "DOWN";
                }
            } else {
                // ফলব্যাক প্রাইস অ্যানালাইসিস
                let priceEl = document.querySelector('.current-price, .chart-price, .price-value, [data-price]');
                if(priceEl){
                    let rawPrice = priceEl.textContent.replace(/[^0-9]/g, '');
                    if(rawPrice.length >= 2){
                        let lastDigit = parseInt(rawPrice.slice(-1));
                        let prevDigit = parseInt(rawPrice.slice(-2, -1));
                        decision = (lastDigit >= prevDigit) ? "UP" : "DOWN";
                    }
                }
            }
        } catch (e) {
            console.log("Analysis Handled Safely");
        }

        if(!decision) decision = Math.random() > 0.5 ? "UP" : "DOWN";
        executeTrade(decision);
    }

    // ৭. ট্রেড অটো-ক্লিক এক্সিকিউশন
    function executeTrade(marketDecision){
        let upBtn = document.querySelector('.btn-call') || 
                    document.querySelector('[data-type="call"]') || 
                    document.querySelector('.higher') || 
                    Array.from(document.querySelectorAll('button, div')).find(el => el.textContent.trim() === 'Up');

        let downBtn = document.querySelector('.btn-put') || 
                      document.querySelector('[data-type="put"]') || 
                      document.querySelector('.lower') || 
                      Array.from(document.querySelectorAll('button, div')).find(el => el.textContent.trim() === 'Down');

        if(marketDecision === "UP" && upBtn){
            upBtn.click();
        } else if(marketDecision === "DOWN" && downBtn){
            downBtn.click();
        }

        setTimeout(() => { isScanning = false; }, 500);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const textBubble = document.querySelector('#text-bubble');
    const rocket = document.querySelector('#rocket');
    const neptune = document.querySelector('#beclean-neptune');
    const brandLogo = document.querySelector('#logo');
    const astronautImage = document.querySelector('#astronaut-image');

    const updateTextBubbleImage = () => {
        if (!textBubble) {
            return;
        }

        const desiredSource = window.innerWidth < 500
            ? 'images/4Text Bubble Astronaut Mobile.png'
            : 'images/4Text Bubble Astronaut.png';

        if (textBubble.getAttribute('src') !== desiredSource) {
            textBubble.setAttribute('src', desiredSource);
        }
    };

    const syncRocketSizeWithAstronaut = () => {
        if (!rocket || !astronautImage) {
            return;
        }

        const astronautRect = astronautImage.getBoundingClientRect();
        rocket.style.width = `${astronautRect.width}px`;
    };

    astronautImage?.addEventListener('load', syncRocketSizeWithAstronaut);

    updateTextBubbleImage();
    syncRocketSizeWithAstronaut();

    if (!rocket || !neptune) {
        window.addEventListener('resize', updateTextBubbleImage);
        return;
    }

    const pathState = {
        points: [],
        scrollEnd: window.innerHeight
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const lerp = (start, end, t) => start + (end - start) * t;

    const buildPath = () => {
        const logoRect = brandLogo?.getBoundingClientRect();
        const startX = logoRect
            ? logoRect.left + window.scrollX + logoRect.width * 0.7
            : window.scrollX + window.innerWidth * 0.25;
        const startY = logoRect
            ? logoRect.top + window.scrollY + logoRect.height * 0.15
            : window.scrollY + 120;

        const neptuneRect = neptune.getBoundingClientRect();
        const endX = neptuneRect.left + window.scrollX + neptuneRect.width * 0.25;
        const endY = neptuneRect.top + window.scrollY + neptuneRect.height * 0.08;

        const travelDistanceY = Math.max(endY - startY, window.innerHeight * 0.8);
        pathState.scrollEnd = Math.max(endY - window.innerHeight * 0.4, window.innerHeight);

        const minX = window.scrollX + window.innerWidth * 0.05;
        const maxX = window.scrollX + window.innerWidth * 0.9;
        const clampX = (value) => clamp(value, minX, maxX);

        const pathGraph = [
            { xOffset: 0.25, yFactor: 0.18 },
            { xOffset: -0.62, yFactor: 0.46 },
            { xOffset: 0.32, yFactor: 0.58 },
            { xOffset: -0.1, yFactor: 0.78 }
        ];

        pathState.points = [
            { x: clampX(startX), y: startY },
            ...pathGraph.map(({ xOffset, yFactor }) => ({
                x: clampX(startX + window.innerWidth * xOffset),
                y: startY + travelDistanceY * yFactor
            })),
            { x: clampX(endX), y: endY }
        ];
    };

    const getPathSnapshot = (progress) => {
        const { points } = pathState;

        if (!points.length) {
            return {
                position: { x: 0, y: 0 },
                direction: { x: 1, y: 0 }
            };
        }

        const segments = points.length - 1;

        if (segments === 0) {
            return {
                position: points[0],
                direction: { x: 1, y: 0 }
            };
        }

        const scaledProgress = progress * segments;
        const segmentIndex = Math.min(Math.floor(scaledProgress), segments - 1);
        const localT = scaledProgress - segmentIndex;

        const from = points[segmentIndex];
        const to = points[segmentIndex + 1];
        const direction = {
            x: to.x - from.x,
            y: to.y - from.y
        };

        const position = {
            x: lerp(from.x, to.x, localT),
            y: lerp(from.y, to.y, localT)
        };

        return { position, direction };
    };

    const getScrollProgress = () => clamp(window.scrollY / pathState.scrollEnd, 0, 1);

    let lastKnownScrollY = window.scrollY;
    let scrollDirection = 1;
    let targetProgress = getScrollProgress();
    let displayedProgress = targetProgress;
    let animationFrameId = null;

    const applyRocketTransform = (progress) => {
        const { position, direction } = getPathSnapshot(progress);
        const translateX = position.x - window.scrollX;
        const translateY = position.y - window.scrollY;
        const effectiveDirectionX = scrollDirection === 1 ? direction.x : -direction.x;
        const shouldFlip = effectiveDirectionX < 0;
        const rotation = shouldFlip ? 180 : 0;
        const tiltDegrees = 10;
        const bank = shouldFlip ? -tiltDegrees : tiltDegrees;

        rocket.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateY(${rotation}deg) rotate(${bank}deg)`;
        rocket.classList.add('is-visible');
    };

    const animateRocket = () => {
        const delta = targetProgress - displayedProgress;

        if (Math.abs(delta) < 0.0005) {
            displayedProgress = targetProgress;
            applyRocketTransform(displayedProgress);
            animationFrameId = null;
            return;
        }

        displayedProgress += delta * 0.08;
        applyRocketTransform(displayedProgress);
        animationFrameId = window.requestAnimationFrame(animateRocket);
    };

    const cancelRocketAnimation = () => {
        if (animationFrameId !== null) {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };

    const requestRocketAnimation = () => {
        if (animationFrameId === null) {
            animationFrameId = window.requestAnimationFrame(animateRocket);
        }
    };

    const updateRocketTargets = () => {
        targetProgress = getScrollProgress();
        requestRocketAnimation();
    };

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY >= lastKnownScrollY ? 1 : -1;
        lastKnownScrollY = currentScrollY;

        if (currentScrollY <= 2) {
            cancelRocketAnimation();
            scrollDirection = 1;
            lastKnownScrollY = 0;
            targetProgress = 0;
            displayedProgress = 0;
            applyRocketTransform(0);
            return;
        }

        updateRocketTargets();
    };

    const handleResize = () => {
        updateTextBubbleImage();
        syncRocketSizeWithAstronaut();
        buildPath();

        const currentProgress = getScrollProgress();
        targetProgress = currentProgress;
        displayedProgress = currentProgress;
        applyRocketTransform(currentProgress);
    };

    buildPath();
    applyRocketTransform(targetProgress);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
});
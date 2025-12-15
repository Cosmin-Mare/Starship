document.addEventListener('DOMContentLoaded', function() {
    //change image to the one for mobile if the screen is less than 500px
    if (window.innerWidth < 700) {
        document.querySelector('#text-bubble').src = 'images/4Text Bubble Astronaut Mobile.png';
    } else {
        document.querySelector('#text-bubble').src = 'images/4Text Bubble Astronaut.png';
    }

    // Add click animation for call-to-action button (Înscrie-te)
    const callToActionButton = document.querySelector('.call-to-action-button');
    if (callToActionButton) {
        callToActionButton.addEventListener('click', function(e) {
            this.classList.add('pressed');
            parent.window.location.href = 'https://forms.fillout.com/t/ip9tKH51Gous';
            setTimeout(() => {
                this.classList.remove('pressed');
            }, 200);
        });
    }

    // Add click animation and popup functionality for program button
    const programButton = document.querySelector('#program-button');
    const scheduleModal = document.querySelector('#schedule-modal');
    const scheduleClose = document.querySelector('#schedule-close');
    
    if (programButton) {
        programButton.addEventListener('click', function(e) {
            this.classList.add('pressed');
            setTimeout(() => {
                this.classList.remove('pressed');
                if (scheduleModal) {
                    scheduleModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            }, 200);
        });
    }

    // Close modal when clicking the X button
    if (scheduleClose) {
        scheduleClose.addEventListener('click', function() {
            if (scheduleModal) {
                scheduleModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }

    // Close modal when clicking outside the content
    if (scheduleModal) {
        scheduleModal.addEventListener('click', function(e) {
            if (e.target === scheduleModal) {
                scheduleModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && scheduleModal && scheduleModal.style.display === 'flex') {
            scheduleModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Astronaut image scroll animation
    const astronautImage = document.querySelector('#astronaut-image');
    if (astronautImage) {
        // Keyframes per breakpoint to keep path on screen
        function buildAstronautKeyframes(windowWidth) {
            // Base/original path (desktop)
            const base = [
                { scrollPosition: 0, left: '61vw', top: '0vw' },
                { scrollPosition: 50, left: '0vw', top: '60vw' },
                { scrollPosition: 100, left: '5vw', top: '74vw' },
                { scrollPosition: 150, left: '5vw', top: '74vw' },
                { scrollPosition: 200, left: '70vw', top: '120vw' },
                { scrollPosition: 280, left: '20vw', top: '155vw' },
                { scrollPosition: 360, left: '70vw', top: '200vw' },
                { scrollPosition: 550, left: '10vw', top: '300vw' },
                { scrollPosition: 600, left: '60vw', top: '300vw' },
                { scrollPosition: 650, left: '80vw', top: '350vw' },
                { scrollPosition: 850, left: '20vw', top: '438vw' },
                { scrollPosition: 880, left: '50vw', top: '460vw' },
                { scrollPosition: 900, left: '30vw', top: '480vw' },
                { scrollPosition: 920, left: '50vw', top: '500vw' },
                { scrollPosition: 950, left: '30vw', top: '520vw' },
                { scrollPosition: 980, left: '50vw', top: '540vw' },
                { scrollPosition: 1080, left: '120vw', top: '560vw' },
            ];

            // 900px and below: compress vertical range and lateral extremes a bit
            const upTo900 = [
                { scrollPosition: 0, left: '61vw', top: '0vw' },
                { scrollPosition: 50, left: '4vw', top: '55vw' },
                { scrollPosition: 100, left: '6vw', top: '72vw' },
                { scrollPosition: 150, left: '6vw', top: '78vw' },
                { scrollPosition: 200, left: '68vw', top: '115vw' },
                { scrollPosition: 280, left: '22vw', top: '150vw' },
                { scrollPosition: 360, left: '68vw', top: '190vw' },
                { scrollPosition: 550, left: '14vw', top: '260vw' },
                { scrollPosition: 600, left: '56vw', top: '270vw' },
                { scrollPosition: 650, left: '76vw', top: '310vw' },
                { scrollPosition: 850, left: '24vw', top: '360vw' },
                { scrollPosition: 880, left: '50vw', top: '380vw' },
                { scrollPosition: 900, left: '32vw', top: '395vw' },
                { scrollPosition: 920, left: '50vw', top: '410vw' },
                { scrollPosition: 950, left: '32vw', top: '425vw' },
                { scrollPosition: 980, left: '50vw', top: '440vw' },
                { scrollPosition: 1080, left: '100vw', top: '450vw' },
            ];

            // 830px and below: further compress vertical span and rightmost travel
            const upTo830 = [
                { scrollPosition: 0, left: '58vw', top: '0vw' },
                { scrollPosition: 50, left: '6vw', top: '52vw' },
                { scrollPosition: 100, left: '8vw', top: '68vw' },
                { scrollPosition: 150, left: '8vw', top: '74vw' },
                { scrollPosition: 200, left: '64vw', top: '105vw' },
                { scrollPosition: 280, left: '22vw', top: '140vw' },
                { scrollPosition: 360, left: '64vw', top: '180vw' },
                { scrollPosition: 550, left: '16vw', top: '240vw' },
                { scrollPosition: 600, left: '52vw', top: '255vw' },
                { scrollPosition: 650, left: '72vw', top: '290vw' },
                { scrollPosition: 850, left: '24vw', top: '330vw' },
                { scrollPosition: 880, left: '48vw', top: '350vw' },
                { scrollPosition: 900, left: '32vw', top: '365vw' },
                { scrollPosition: 920, left: '48vw', top: '380vw' },
                { scrollPosition: 950, left: '32vw', top: '395vw' },
                { scrollPosition: 980, left: '48vw', top: '410vw' },
                { scrollPosition: 1080, left: '92vw', top: '420vw' },
            ];

            // 780px and below: keep path tighter to avoid leaving view
            const upTo780 = [
                { scrollPosition: 0, left: '56vw', top: '0vw' },
                { scrollPosition: 50, left: '8vw', top: '48vw' },
                { scrollPosition: 100, left: '10vw', top: '62vw' },
                { scrollPosition: 150, left: '10vw', top: '68vw' },
                { scrollPosition: 200, left: '60vw', top: '95vw' },
                { scrollPosition: 280, left: '24vw', top: '125vw' },
                { scrollPosition: 360, left: '60vw', top: '165vw' },
                { scrollPosition: 550, left: '18vw', top: '220vw' },
                { scrollPosition: 600, left: '50vw', top: '235vw' },
                { scrollPosition: 650, left: '70vw', top: '265vw' },
                { scrollPosition: 850, left: '26vw', top: '305vw' },
                { scrollPosition: 880, left: '46vw', top: '320vw' },
                { scrollPosition: 900, left: '34vw', top: '332vw' },
                { scrollPosition: 920, left: '46vw', top: '344vw' },
                { scrollPosition: 950, left: '34vw', top: '356vw' },
                { scrollPosition: 980, left: '46vw', top: '368vw' },
                { scrollPosition: 1080, left: '84vw', top: '376vw' },
            ];

            // 700px and below (mobile): start from the "i" in Starship like desktop
            const mobile = [
                { scrollPosition: 0, left: '65vw', top: '15vw' },
                { scrollPosition: 50, left: '1vw', top: '111vw' },
                { scrollPosition: 100, left: '2vw', top: '180vw' },

                { scrollPosition: 150, left: '60vw', top: '230vw' },
                { scrollPosition: 200, left: '30vw', top: '325vw' },
                { scrollPosition: 280, left: '0vw', top: '410vw' },
                { scrollPosition: 360, left: '120vw', top: '425vw' }
            ];

            if (windowWidth <= 700) return mobile;
            if (windowWidth <= 780) return upTo780;
            if (windowWidth <= 830) return upTo830;
            if (windowWidth <= 900) return upTo900;
            return base;
        }

        let astronautKeyframes = buildAstronautKeyframes(window.innerWidth);

        // Helper function to convert any position value to pixels from left edge
        function getPositionFromLeft(pos, isRight, windowWidth) {
            if (!pos) return null;
            const value = parseFloat(pos);
            const unit = pos.replace(/[0-9.-]/g, '');
            
            let pixels;
            if (unit === 'vw') {
                pixels = (value / 100) * windowWidth;
            } else if (unit === 'vh') {
                pixels = (value / 100) * window.innerHeight;
            } else if (unit === 'px') {
                pixels = value;
            } else if (unit === '%') {
                pixels = (value / 100) * windowWidth;
            } else {
                pixels = value; // Assume pixels if no unit
            }
            
            if (isRight) {
                return windowWidth - pixels;
            }
            return pixels;
        }

        // Helper function to convert pixels to vw for setting position
        function pixelsToVw(pixels) {
            return (pixels / window.innerWidth) * 100;
        }

        // Track previous position for rotation calculation
        let previousX = null;
        let previousY = null;

        function updateAstronautPosition() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            const scrollPosition = (scrollTop / windowHeight) * 100; // Convert to viewport height units

            // Find the two keyframes to interpolate between
            let prevKeyframe = astronautKeyframes[0];
            let nextKeyframe = astronautKeyframes[astronautKeyframes.length - 1];

            for (let i = 0; i < astronautKeyframes.length - 1; i++) {
                if (scrollPosition >= astronautKeyframes[i].scrollPosition && 
                    scrollPosition <= astronautKeyframes[i + 1].scrollPosition) {
                    prevKeyframe = astronautKeyframes[i];
                    nextKeyframe = astronautKeyframes[i + 1];
                    break;
                }
            }

            // If before first keyframe, use first keyframe
            if (scrollPosition < astronautKeyframes[0].scrollPosition) {
                prevKeyframe = nextKeyframe = astronautKeyframes[0];
            }
            // If after last keyframe, use last keyframe
            if (scrollPosition > astronautKeyframes[astronautKeyframes.length - 1].scrollPosition) {
                prevKeyframe = nextKeyframe = astronautKeyframes[astronautKeyframes.length - 1];
            }

            // Calculate interpolation factor
            const range = nextKeyframe.scrollPosition - prevKeyframe.scrollPosition;
            const factor = range > 0 
                ? (scrollPosition - prevKeyframe.scrollPosition) / range 
                : 0;

            // Interpolate horizontal position (convert to pixels from left for smooth transition)
            // All keyframes now use 'left' for consistent positioning
            const prevPos = prevKeyframe.left || prevKeyframe.right;
            const nextPos = nextKeyframe.left || nextKeyframe.right;
            const prevIsRight = !!prevKeyframe.right;
            const nextIsRight = !!nextKeyframe.right;

            const prevPixels = getPositionFromLeft(prevPos, prevIsRight, windowWidth);
            const nextPixels = getPositionFromLeft(nextPos, nextIsRight, windowWidth);

            let currentX = null;
            let currentY = null;

            if (prevPixels !== null && nextPixels !== null) {
                const interpolatedPixels = prevPixels + (nextPixels - prevPixels) * factor;
                const interpolatedVw = pixelsToVw(interpolatedPixels);
                currentX = interpolatedPixels;
                
                // Always use 'left' for consistent positioning to avoid teleporting
                // This ensures smooth transitions when crossing the screen
                astronautImage.style.left = interpolatedVw + 'vw';
                astronautImage.style.right = 'auto';
            }

            // Interpolate vertical position (top)
            if (prevKeyframe.top !== undefined && nextKeyframe.top !== undefined) {
                const prevTop = prevKeyframe.top;
                const nextTop = nextKeyframe.top;
                const prevTopValue = parseFloat(prevTop);
                const nextTopValue = parseFloat(nextTop);
                const prevTopUnit = prevTop.replace(/[0-9.-]/g, '');
                const nextTopUnit = nextTop.replace(/[0-9.-]/g, '');

                // If same unit, interpolate directly
                if (prevTopUnit === nextTopUnit) {
                    const interpolatedTop = prevTopValue + (nextTopValue - prevTopValue) * factor;
                    astronautImage.style.top = interpolatedTop + prevTopUnit;
                    
                    // Convert to pixels for rotation calculation
                    if (prevTopUnit === 'vw') currentY = (interpolatedTop / 100) * windowWidth;
                    else if (prevTopUnit === 'vh') currentY = (interpolatedTop / 100) * windowHeight;
                    else if (prevTopUnit === 'px') currentY = interpolatedTop;
                    else currentY = (interpolatedTop / 100) * windowHeight;
                } else {
                    // Convert both to pixels, interpolate, then convert back
                    let prevTopPx, nextTopPx;
                    
                    if (prevTopUnit === 'vw') prevTopPx = (prevTopValue / 100) * windowWidth;
                    else if (prevTopUnit === 'vh') prevTopPx = (prevTopValue / 100) * windowHeight;
                    else if (prevTopUnit === 'px') prevTopPx = prevTopValue;
                    else prevTopPx = (prevTopValue / 100) * windowHeight; // Default to vh
                    
                    if (nextTopUnit === 'vw') nextTopPx = (nextTopValue / 100) * windowWidth;
                    else if (nextTopUnit === 'vh') nextTopPx = (nextTopValue / 100) * windowHeight;
                    else if (nextTopUnit === 'px') nextTopPx = nextTopValue;
                    else nextTopPx = (nextTopValue / 100) * windowHeight; // Default to vh
                    
                    const interpolatedTopPx = prevTopPx + (nextTopPx - prevTopPx) * factor;
                    astronautImage.style.top = interpolatedTopPx + 'px';
                    currentY = interpolatedTopPx;
                }
            } else {
                // If top not specified, follow scroll
                astronautImage.style.top = scrollTop + 'px';
                currentY = scrollTop;
            }

            // Calculate transform based on movement direction
            // Flip horizontally for left/right, rotate for up/down
            // Reset to default when at starting scroll position or between 100-150
            const startScrollPosition = astronautKeyframes[0].scrollPosition;
            const isAtStart = Math.abs(scrollPosition - startScrollPosition) < 0.1; // Small threshold for "at start"
            const isBetween100And150 = scrollPosition >= 100 && scrollPosition <= 150;
            
            if (isAtStart || isBetween100And150) {
                // At starting position or between 100-150 - reset to default (no rotation, no flip)
                astronautImage.style.transform = 'rotate(0deg) scaleX(1)';
            } else if (previousX !== null && previousY !== null && currentX !== null && currentY !== null) {
                // Calculate movement direction
                const deltaX = currentX - previousX;
                const deltaY = currentY - previousY;
                
                // Only apply transforms if there's actual movement (avoid jitter from tiny movements)
                if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
                    // Horizontal flip: flip when moving left (deltaX < 0), normal when moving right (deltaX > 0)
                    const scaleX = deltaX < 0 ? -1 : 1;
                    
                    // Vertical rotation: rotate based on vertical movement
                    // Calculate angle based on vertical movement only (up/down)
                    // Positive deltaY = moving down = rotate up (positive angle)
                    // Negative deltaY = moving up = rotate down (negative angle)
                    // When flipped (scaleX = -1), invert the rotation direction
                    // Limit rotation to reasonable angles (e.g., -45 to 45 degrees)
                    const maxRotation = 45; // Maximum rotation angle in degrees
                    const rotationFactor = Math.min(Math.abs(deltaY) / 10, 1); // Normalize based on vertical movement
                    let baseAngle = deltaY > 0 ? maxRotation : -maxRotation;
                    // Invert rotation when flipped horizontally
                    if (scaleX === -1) {
                        baseAngle = -baseAngle;
                    }
                    const angle = baseAngle * rotationFactor;
                    
                    // Apply both transforms: rotation for up/down, scaleX for left/right flip
                    astronautImage.style.transform = `rotate(${angle}deg) scaleX(${scaleX})`;
                }
            } else if (previousX === null || previousY === null) {
                // First frame - set to default at start
                if (scrollPosition <= startScrollPosition) {
                    astronautImage.style.transform = 'rotate(0deg) scaleX(1)';
                } else {
                    // Calculate initial direction from first two keyframes if not at start
                    if (astronautKeyframes.length > 1) {
                        const firstKeyframe = astronautKeyframes[0];
                        const secondKeyframe = astronautKeyframes[1];
                        
                        const firstX = getPositionFromLeft(
                            firstKeyframe.left || firstKeyframe.right, 
                            !!firstKeyframe.right, 
                            windowWidth
                        );
                        const secondX = getPositionFromLeft(
                            secondKeyframe.left || secondKeyframe.right, 
                            !!secondKeyframe.right, 
                            windowWidth
                        );
                        
                        if (firstX !== null && secondX !== null) {
                            const deltaX = secondX - firstX;
                            const deltaY = (secondKeyframe.scrollPosition - firstKeyframe.scrollPosition) * windowHeight / 100;
                            
                            const scaleX = deltaX < 0 ? -1 : 1;
                            const maxRotation = 45;
                            const rotationFactor = Math.min(Math.abs(deltaY) / 10, 1);
                            let baseAngle = deltaY > 0 ? maxRotation : -maxRotation;
                            // Invert rotation when flipped horizontally
                            if (scaleX === -1) {
                                baseAngle = -baseAngle;
                            }
                            const angle = baseAngle * rotationFactor;
                            
                            astronautImage.style.transform = `rotate(${angle}deg) scaleX(${scaleX})`;
                        }
                    }
                }
            }

            // Update previous position for next frame
            previousX = currentX;
            previousY = currentY;
        }

        // Update on scroll
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateAstronautPosition();
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll);

        // Rebuild keyframes on resize to match breakpoints
        let resizeTimeout = null;
        window.addEventListener('resize', () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                astronautKeyframes = buildAstronautKeyframes(window.innerWidth);
                updateAstronautPosition();
            }, 100);
        });

        updateAstronautPosition(); // Initial position
    }
});
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
        // Configuration: Define scroll positions (in viewport height units) and corresponding positions
        // Format: { scrollPosition: value in vh, left: value in vw or %, top: value in vw, vh, or px }
        // Always use 'left' for horizontal positioning (converted from previous right values)
        // 'top' is optional - if not specified, it will follow scroll position
        const astronautKeyframes = [
            { scrollPosition: 0, left: '61vw', top: '0vw' },      // Start position (was right: 18vw)
            { scrollPosition: 50, left: '0vw', top: '60vw' },     // Move left a bit (was right: 10vw)
            { scrollPosition: 100, left: '5vw', top: '74vw' },     // Move to left side
            { scrollPosition: 150, left: '5vw', top: '74vw' },    // Move right a bit
            { scrollPosition: 200, left: '70vw', top: '120vw' },   // Move back to right (was right: 10vw)
            { scrollPosition: 280, left: '20vw', top: '155vw' },    // Move to left again
            { scrollPosition: 360, left: '70vw', top: '200vw' },    // Move to far right (was right: 5vw)
            { scrollPosition: 550, left: '10vw', top: '300vw' },   // Final position on left
            { scrollPosition: 600, left: '60vw', top: '300vw' },   // Final position on left
            { scrollPosition: 650, left: '80vw', top: '350vw' },   // Final position on left
            { scrollPosition: 850, left: '20vw', top: '438vw' },
            { scrollPosition: 880, left: '50vw', top: '460vw' },
            { scrollPosition: 900, left: '30vw', top: '480vw' },
            { scrollPosition: 920, left: '50vw', top: '500vw' },
            { scrollPosition: 950, left: '30vw', top: '520vw' },
            { scrollPosition: 980, left: '50vw', top: '540vw' },
            {scrollPosition: 1080, left: '120vw', top: '560vw' },
        ];

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
        updateAstronautPosition(); // Initial position
    }
});
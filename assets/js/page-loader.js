// Page Loader Plugin - Shows loading screen while images are loading
class PageLoader {
    constructor(options = {}) {
        this.options = {
            minLoadTime: options.minLoadTime || 500, // Minimum time to show loader (ms)
            fadeOutDuration: options.fadeOutDuration || 500, // Fade out animation duration (ms)
            ...options
        };
        
        this.loaderElement = null;
        this.startTime = Date.now();
        this.imagesLoaded = 0;
        this.totalImages = 0;
        this.isComplete = false;
    }

    init() {
        // Create loader HTML if not already in DOM
        if (!document.querySelector('.page-loader')) {
            this.createLoaderHTML();
        }
        
        this.loaderElement = document.querySelector('.page-loader');
        this.startLoader();
    }

    createLoaderHTML() {
        const loaderHTML = `
            <div class="page-loader">
                <div class="loader-container">
                    <div class="loader-spinner">
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                    </div>
                    <p class="loader-text">Nag-load...</p>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    }

    startLoader() {
        // Count all images on the page
        const images = document.querySelectorAll('img');
        this.totalImages = images.length;
        
        if (this.totalImages === 0) {
            // No images to load, hide loader after minLoadTime
            setTimeout(() => this.hideLoader(), this.options.minLoadTime);
            return;
        }

        let loadedCount = 0;

        // Track image loading
        images.forEach((img, index) => {
            const trackLoad = () => {
                loadedCount++;
                this.imagesLoaded = loadedCount;
                this.updateProgress();

                if (loadedCount === this.totalImages) {
                    this.isComplete = true;
                    this.hideLoader();
                }
            };

            if (img.complete) {
                // Image already cached/loaded
                trackLoad();
            } else {
                // Wait for load or error
                img.addEventListener('load', trackLoad, { once: true });
                img.addEventListener('error', trackLoad, { once: true });
            }
        });

        // Window load as backup - hide loader when window fully loads
        window.addEventListener('load', () => {
            this.isComplete = true;
            this.hideLoader();
        }, { once: true });

        // Fallback timeout - hide loader after max time
        setTimeout(() => {
            if (!this.isComplete) {
                this.isComplete = true;
                this.hideLoader();
            }
        }, 2000);
    }

    updateProgress() {
        if (this.totalImages === 0) return;
        
        const progress = (this.imagesLoaded / this.totalImages) * 100;
        const progressBar = document.querySelector('.progress-fill');
        
        if (progressBar) {
            progressBar.style.width = Math.min(progress, 95) + '%';
        }
    }

    hideLoader() {
        if (this.isComplete) {
            const elapsed = Date.now() - this.startTime;
            const remainingTime = Math.max(0, this.options.minLoadTime - elapsed);

            setTimeout(() => {
                if (this.loaderElement) {
                    this.loaderElement.classList.add('fade-out');
                    
                    setTimeout(() => {
                        if (this.loaderElement) {
                            this.loaderElement.style.display = 'none';
                        }
                    }, this.options.fadeOutDuration);
                }
            }, remainingTime);
        }
    }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new PageLoader();
        loader.init();
    });
} else {
    // DOM already loaded
    const loader = new PageLoader();
    loader.init();
}


/**
 * Manages the appearance of animated circles that follow the cursor.
 * @author Kizito S.M.
 * @version 1.0.0
 */
class MouseFollower {
  /**
   * Initializes a new MouseFollower instance.
   * @param {HTMLElement} hoverAreaElement - The element where the circles will be displayed.
   * @param {number} interval - The interval in milliseconds between each circle appearance.
   * @param {number} animationDuration - The duration in milliseconds for the circle animation.
   */
  constructor(hoverAreaElement, interval = 5, animationDuration = 1000) {
    this.hoverArea = hoverAreaElement;
    this.interval = interval;
    this.animationDuration = animationDuration;
    this.lastMoveTime = 0;

    this.init();
  }

  /**
   * Initializes the mousemove event listener on the hover area.
   */
  init() {
    this.hoverArea.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  /**
   * Handles the mousemove event and creates an animated circle at the cursor position.
   * @param {MouseEvent} event - The mousemove event.
   */
  handleMouseMove(event) {
    const currentTime = Date.now();

    if (currentTime - this.lastMoveTime >= this.interval) {
      this.lastMoveTime = currentTime;

      const circleObject = this.createCircle();
      const rect = this.hoverArea.getBoundingClientRect();

      circleObject.style.left = `${event.clientX - rect.left - 2}px`;
      circleObject.style.top = `${event.clientY - rect.top - 1}px`;

      this.hoverArea.appendChild(circleObject);
      this.animateCircle(circleObject);
    }
  }

  /**
   * Creates a new circle element.
   * @returns {HTMLElement} The newly created circle element.
   */
  createCircle() {
    const circle = document.createElement("span");
    circle.className = "circle-shape";
    return circle;
  }

  /**
   * Animates the circle element by scaling it up, applying a blur effect, and then removing it.
   * @param {HTMLElement} circle - The circle element to animate.
   */
  animateCircle(circle) {
    setTimeout(() => {
      circle.style.transform = "scale(30)";
      circle.style.filter = "blur(0.1px)";
      circle.style.opacity = "0.10";
    }, 10);

    setTimeout(() => {
      circle.remove();
    }, this.animationDuration);
  }
}

// Initialize the MouseFollower for the hover area.
document.addEventListener("DOMContentLoaded", () => {
  const hoverArea = document.getElementById("hover-area");
  new MouseFollower(hoverArea);
});

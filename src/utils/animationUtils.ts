
/**
 * Defines animation variants for Framer Motion
 */
export const fadeIn = (delay: number = 0, duration: number = 0.5) => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration,
      ease: "easeInOut",
    },
  },
});

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const slideIn = (direction: "left" | "right" | "up" | "down", delay: number = 0, duration: number = 0.5) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay: number = 0, duration: number = 0.5) => ({
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const textVariant = (delay: number = 0) => ({
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeInOut",
    },
  },
});

export const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

export const hoverEffect = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.3 }
  },
  whileTap: { 
    scale: 0.95 
  }
};

export const scaleOnHover = {
  whileHover: { 
    scale: 1.02,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.25 }
  },
  whileTap: { 
    scale: 0.98 
  }
};

export const buttonClickEffect = {
  whileHover: { 
    scale: 1.05,
    backgroundColor: "#3A70DE",
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.95 
  }
};

/**
 * Scroll animation for elements
 */
export function scrollAnimation(element: HTMLElement | null, duration: number = 1000): void {
  if (!element) return;
  
  const startPosition = window.pageYOffset;
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number): void {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeInOutCubic = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    window.scrollTo(0, startPosition + distance * easeInOutCubic);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Animate number counting
 */
export function animateValue(
  element: HTMLElement | null,
  start: number,
  end: number,
  duration: number = 1000,
  formatter: (value: number) => string = (value) => value.toString()
): void {
  if (!element) return;
  
  let startTimestamp: number | null = null;
  
  function step(timestamp: number): void {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
    const currentValue = Math.floor(progress * (end - start) + start);
    element.textContent = formatter(currentValue);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = formatter(end);
    }
  }

  window.requestAnimationFrame(step);
}

/**
 * Typing animation effect
 */
export class TypeWriter {
  private element: HTMLElement;
  private text: string;
  private speed: number;
  private index: number;
  private waitBeforeStart: number;
  private callback: (() => void) | null;
  private isDeleting: boolean;
  private timeoutId: number | null;

  constructor(
    element: HTMLElement, 
    text: string, 
    speed: number = 50, 
    waitBeforeStart: number = 0,
    callback: (() => void) | null = null
  ) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
    this.waitBeforeStart = waitBeforeStart;
    this.callback = callback;
    this.isDeleting = false;
    this.timeoutId = null;
  }

  start(): void {
    if (this.waitBeforeStart > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.type();
      }, this.waitBeforeStart);
    } else {
      this.type();
    }
  }

  type(): void {
    const current = this.index < 0 ? 0 : this.index;
    const fullText = this.text;
    
    this.element.textContent = fullText.substring(0, current);

    if (!this.isDeleting && this.index < fullText.length) {
      this.index++;
      this.timeoutId = window.setTimeout(() => this.type(), this.speed);
    } else if (this.isDeleting && this.index > 0) {
      this.index--;
      this.timeoutId = window.setTimeout(() => this.type(), this.speed / 2);
    } else if (this.callback) {
      this.callback();
    }
  }

  delete(callback?: () => void): void {
    this.isDeleting = true;
    this.callback = callback || null;
    this.type();
  }

  stop(): void {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

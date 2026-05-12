export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #131313;
    color: #e5e2e1;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
  }

  ::selection { background: #94da32; color: black; }

  @keyframes scanline {
    0% {
        top: 0;
    }
    100% {
        top: 100%;
    }
}
  @keyframes scanline {
  0% {
    transform: translateY(-10%);
  }

  100% {
    transform: translateY(110vh);
  }
}

@keyframes recordingPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.4;
    transform: scale(0.85);
  }
}

.scanline-effect {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}

.scanline-effect::before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 6px;

  background: linear-gradient(
    to right,
    transparent,
    rgba(181, 231, 93, 0.9),
    transparent
  );

  box-shadow:
    0 0 10px rgba(181, 231, 93, 0.5),
    0 0 20px rgba(181, 231, 93, 0.2);

  animation: scanline 5s linear infinite;
}

/* Recording HUD Frame */
.recording-frame {
  position: absolute;
  inset: 20px;
  border: 1px solid rgba(181, 231, 93, 0.25);
  pointer-events: none;
  z-index: 3;
}

/* Corner borders */
.recording-frame .corner {
  position: absolute;
  width: 40px;
  height: 40px;
  border-color: #B5E75D;
  border-style: solid;
}

.recording-frame .top-left {
  top: 0;
  left: 0;
  border-width: 3px 0 0 3px;
}

.recording-frame .top-right {
  top: 0;
  right: 0;
  border-width: 3px 3px 0 0;
}

.recording-frame .bottom-left {
  bottom: 0;
  left: 0;
  border-width: 0 0 3px 3px;
}

.recording-frame .bottom-right {
  bottom: 0;
  right: 0;
  border-width: 0 3px 3px 0;
}

/* REC Indicator */
.recording-indicator {
  position: absolute;
  top: 16px;
  left: 16px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 6px 12px;

  background: rgba(0,0,0,0.7);
  border: 1px solid rgba(181,231,93,0.3);

  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  font-family: 'Inter', sans-serif;
}

.recording-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: #ff2d2d;

  animation: recordingPulse 1s infinite;
}
  .grid-overlay {
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, rgba(181,231,93,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(181,231,93,0.04) 1px, transparent 1px);
  }
  .luminous-glow {
    box-shadow: 0 0 15px rgba(181,231,93,0.2);
  }
  .text-glow {
    text-shadow: 0 0 10px rgba(181,231,93,0.5);
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 30s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  .spin-slow { animation: spin 10s linear infinite; }
  .spin-reverse { animation: spin-reverse 15s linear infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    user-select: none;
  }
  .fill-icon { font-variation-settings: 'FILL' 1; }
`;

export const colors = {
  background: "#131313",
  secondary: "#94da32",
  primaryContainer: "#b5e75d",
  onPrimaryContainer: "#466700",
  onSecondaryContainer: "#284300",
  surfaceContainer: "#20201f",
  surfaceContainerHigh: "#2a2a2a",
  surfaceContainerLow: "#1b1b1b",
  surfaceContainerLowest: "#0e0e0e",
  outlineVariant: "#434938",
  onSurfaceVariant: "#c3c9b3",
  onSurface: "#e5e2e1",
};

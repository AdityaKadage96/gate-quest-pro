import {  useCallback, useEffect, useRef, useState } from "react";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Wind,
  Headphones,
  Volume2,
} from "lucide-react";

function FocusRoom({ onStudyComplete }) {
  const [timerSeconds, setTimerSeconds] =
    useState(25 * 60);

  const [isTimerRunning, setIsTimerRunning] =
    useState(false);

  const [audioMode, setAudioMode] =
    useState("none");

  const [volume, setVolume] = useState(0.05);

  const audioCtxRef = useRef(null);
  const audioSourceRef = useRef(null);
  const audioGainRef = useRef(null);

  const stopAudio = useCallback(() => {
  try {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }
  } catch {
    // Audio source may already be stopped.
  }

  audioSourceRef.current = null;

  if (audioCtxRef.current) {
    audioCtxRef.current.close();
  }

  audioCtxRef.current = null;
  audioGainRef.current = null;

  setAudioMode("none");
}, []);
  

  /*
   * -----------------------------------------
   * TIMER
   * -----------------------------------------
   */
useEffect(() => {
  if (!isTimerRunning || timerSeconds <= 0) {
    return undefined;
  }

  const timer = setTimeout(() => {
    if (timerSeconds === 1) {
      setTimerSeconds(0);
      setIsTimerRunning(false);

      stopAudio();

      alert(
        "🎯 Pomodoro Focus Session Complete!"
      );

      if (onStudyComplete) {
        onStudyComplete(0.42);
      }

      return;
    }

    setTimerSeconds((previous) => previous - 1);
  }, 1000);

  return () => {
    clearTimeout(timer);
  };
}, [
  isTimerRunning,
  timerSeconds,
  stopAudio,
  onStudyComplete,
]);

  /*
   * -----------------------------------------
   * AUDIO CLEANUP
   * -----------------------------------------
   */

  // const stopAudio = () => {
  //   try {
  //     if (audioSourceRef.current) {
  //       audioSourceRef.current.stop();
  //     }
  //   } catch {
  //     // Audio source may already be stopped.
  //   }

  //   audioSourceRef.current = null;

  //   if (audioCtxRef.current) {
  //     audioCtxRef.current.close();
  //   }

  //   audioCtxRef.current = null;
  //   audioGainRef.current = null;

  //   setAudioMode("none");
  // };

  /*
   * -----------------------------------------
   * WHITE NOISE
   * -----------------------------------------
   */

  const startWhiteNoise = (ctx) => {
    const bufferSize =
      ctx.sampleRate * 2;

    const noiseBuffer =
      ctx.createBuffer(
        1,
        bufferSize,
        ctx.sampleRate
      );

    const output =
      noiseBuffer.getChannelData(0);

    for (
      let i = 0;
      i < bufferSize;
      i++
    ) {
      output[i] =
        Math.random() * 2 - 1;
    }

    const whiteNoise =
      ctx.createBufferSource();

    whiteNoise.buffer =
      noiseBuffer;

    whiteNoise.loop = true;

    const gainNode =
      ctx.createGain();

    gainNode.gain.value =
      volume;

    whiteNoise.connect(
      gainNode
    );

    gainNode.connect(
      ctx.destination
    );

    whiteNoise.start();

    audioSourceRef.current =
      whiteNoise;

    audioGainRef.current =
      gainNode;
  };

  /*
   * -----------------------------------------
   * BINAURAL / ALPHA BEATS
   * -----------------------------------------
   */

  const startBinaural = (ctx) => {
    const merger =
      ctx.createChannelMerger(2);

    const leftOscillator =
      ctx.createOscillator();

    const rightOscillator =
      ctx.createOscillator();

    leftOscillator.frequency.value =
      200;

    rightOscillator.frequency.value =
      210;

    const gainNode =
      ctx.createGain();

    gainNode.gain.value =
      volume;

    leftOscillator.connect(
      merger,
      0,
      0
    );

    rightOscillator.connect(
      merger,
      0,
      1
    );

    merger.connect(gainNode);

    gainNode.connect(
      ctx.destination
    );

    leftOscillator.start();
    rightOscillator.start();

    audioSourceRef.current = {
      stop: () => {
        leftOscillator.stop();
        rightOscillator.stop();
      },
    };

    audioGainRef.current =
      gainNode;
  };

  /*
   * -----------------------------------------
   * AUDIO TOGGLE
   * -----------------------------------------
   */

  const toggleAudio = async (mode) => {
    if (audioMode === mode) {
      stopAudio();
      return;
    }

    stopAudio();

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext) {
      alert(
        "Web Audio API is not supported in this browser."
      );
      return;
    }

    const ctx =
      new AudioContext();

    audioCtxRef.current =
      ctx;

    if (
      ctx.state === "suspended"
    ) {
      await ctx.resume();
    }

    setAudioMode(mode);

    if (mode === "white") {
      startWhiteNoise(ctx);
    }

    if (mode === "binaural") {
      startBinaural(ctx);
    }
  };

  /*
   * -----------------------------------------
   * VOLUME
   * -----------------------------------------
   */

  const handleVolumeChange = (
    event
  ) => {
    const newVolume =
      Number(event.target.value);

    setVolume(newVolume);

    if (audioGainRef.current) {
      audioGainRef.current.gain.value =
        newVolume;
    }
  };

  /*
   * -----------------------------------------
   * TIMER CONTROLS
   * -----------------------------------------
   */

  const resetTimer = () => {
    setIsTimerRunning(false);

    setTimerSeconds(
      25 * 60
    );
  };

  const setTimerPreset = (
    minutes
  ) => {
    setIsTimerRunning(false);

    setTimerSeconds(
      minutes * 60
    );
  };

  /*
   * -----------------------------------------
   * FORMAT TIME
   * -----------------------------------------
   */

  const minutes =
    Math.floor(
      timerSeconds / 60
    )
      .toString()
      .padStart(2, "0");

  const seconds =
    (timerSeconds % 60)
      .toString()
      .padStart(2, "0");

  return (
    <section className="focus-page">

      {/* =====================================
          TIMER
          ===================================== */}

      <div className="focus-grid">

        <div className="glass-card focus-timer-card">

          <div className="focus-header">
            <div className="focus-icon">
              <Timer size={22} />
            </div>

            <div>
              <h2>
                Deep Work Focus Room
              </h2>

              <p>
                Stay focused with a
                distraction-free study timer.
              </p>
            </div>
          </div>

          <div className="timer-display">
            {minutes}:{seconds}
          </div>

          <div className="timer-status">
            {isTimerRunning
              ? "Focus session running..."
              : "Ready to focus"}
          </div>

          <div className="timer-controls">

            <button
              className="timer-start-btn"
              onClick={() =>
                setIsTimerRunning(
                  (previous) =>
                    !previous
                )
              }
            >
              {isTimerRunning ? (
                <>
                  <Pause size={16} />
                  Pause Timer
                </>
              ) : (
                <>
                  <Play size={16} />
                  Start Pomodoro
                </>
              )}
            </button>

            <button
              className="timer-reset-btn"
              onClick={resetTimer}
            >
              <RotateCcw size={16} />
              Reset
            </button>

          </div>

          <div className="timer-presets">

            <button
              onClick={() =>
                setTimerPreset(25)
              }
            >
              25m Focus
            </button>

            <button
              onClick={() =>
                setTimerPreset(50)
              }
            >
              50m Focus
            </button>

            <button
              onClick={() =>
                setTimerPreset(5)
              }
            >
              5m Break
            </button>

          </div>

        </div>

        {/* =====================================
            SOUND ENGINE
            ===================================== */}

        <div className="glass-card sound-card">

          <div className="sound-header">

            <div className="sound-icon">
              <Volume2 size={21} />
            </div>

            <div>
              <h2>
                Ambient Focus Sound Generator
              </h2>

              <p>
                Synthesized directly in your
                browser using the Web Audio API.
              </p>
            </div>

          </div>

          {/* White Noise */}

          <div className="sound-control">

            <div className="sound-control-top">

              <div className="sound-name">

                <Wind size={18} />

                <span>
                  White Noise Generator
                </span>

              </div>

              <button
                className={
                  audioMode === "white"
                    ? "sound-toggle active"
                    : "sound-toggle"
                }
                onClick={() =>
                  toggleAudio("white")
                }
              >
                {audioMode === "white"
                  ? "Disable"
                  : "Enable"}
              </button>

            </div>

            <div className="volume-control">

              <Volume2 size={15} />

              <span>
                Volume
              </span>

              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={volume}
                onChange={
                  handleVolumeChange
                }
              />

              <span className="volume-value">
                {Math.round(
                  volume * 500
                )}
                %
              </span>

            </div>

          </div>

          {/* Alpha Beats */}

          <div className="sound-control">

            <div className="sound-control-top">

              <div className="sound-name">

                <Headphones size={18} />

                <span>
                  10Hz Alpha Beats
                </span>

              </div>

              <button
                className={
                  audioMode ===
                  "binaural"
                    ? "sound-toggle active purple"
                    : "sound-toggle purple"
                }
                onClick={() =>
                  toggleAudio(
                    "binaural"
                  )
                }
              >
                {audioMode ===
                "binaural"
                  ? "Disable"
                  : "Enable"}
              </button>

            </div>

            <p className="sound-description">
              Stereo tones using 200Hz and
              210Hz frequencies.
            </p>

          </div>

          <div className="audio-note">
            <span>●</span>

            {audioMode === "none"
              ? "No ambient sound playing"
              : audioMode === "white"
              ? "White noise is playing"
              : "10Hz Alpha Beats are playing"}
          </div>

        </div>

      </div>

    </section>
  );
}

export default FocusRoom;
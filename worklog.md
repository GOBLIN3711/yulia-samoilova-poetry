---
Task ID: 1
Agent: main
Task: Fix mobile hero image and music player reliability on yulia-samoilova.vercel.app

Work Log:
- Read current page.tsx, MusicPlayer.tsx, tracks.json to understand current state
- Checked hero image dimensions: v2_hero.png (1440x900), v2_hero_mobile.png (1440x585)
- Fixed Hero component: added <picture> element to serve v2_hero_mobile.png on mobile (max-width: 767px), set object-position to "center top" on mobile, changed min-h-screen to min-h-[100svh] for proper mobile viewport
- Rewrote MusicPlayer component with robust audio handling:
  - Changed preload="metadata" to preload="auto" for full audio preloading
  - Added pendingPlay ref + canplaythrough/canplay event listeners to handle race condition between track load and play
  - Added retry logic (up to 3 attempts with increasing delay) when play() fails
  - Added error event handler to reset state on audio errors
  - Added stalled/waiting event logging for debugging
  - Added 'playing' event listener to verify audio is actually producing sound (fixes "no sound" issue)
  - Explicit volume reset on play to prevent "no sound" state
  - Added cleanup for retry timers on unmount
- Built successfully and deployed to https://yulia-samoilova.vercel.app

Stage Summary:
- Mobile hero: uses v2_hero_mobile.png on mobile screens, proper object-positioning to show "Юлия Самойлова" text
- Music player: robust play with retry, proper preload, error recovery, and volume verification
- Deployed to production: https://yulia-samoilova.vercel.app

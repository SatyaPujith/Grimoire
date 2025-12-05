# 🎃 Setup Real Ghost Sounds & Video

## Required Assets

You need to download these assets from YouTube and add them to your project:

### 1. Ghost Jump Scare Video
**Source:** https://www.youtube.com/watch?v=q1FablBtiho&t=30s
- Download the video (around 30 second mark with the scary ghost)
- Convert to MP4 or WebM format
- Save as: `public/videos/ghost-jumpscare.mp4`

### 2. Ambient Scary Background Music
**Source:** https://youtu.be/XVxE2vs9skM
- Download the audio
- Convert to MP3 format
- Save as: `public/sounds/ambient-scary.mp3`

### 3. Ghost Scream Sound
**Source:** https://youtube.com/shorts/WwvCfCDIn3M
- Download the audio
- Convert to MP3 format
- Save as: `public/sounds/ghost-scream.mp3`

## Folder Structure

Create this structure in your project:

```
public/
├── sounds/
│   ├── ambient-scary.mp3
│   └── ghost-scream.mp3
└── videos/
    ├── ghost-jumpscare.mp4
    └── ghost-jumpscare.webm (optional, for better browser support)
```

## How to Download from YouTube

### Option 1: Online Downloaders
- Use sites like: y2mate.com, savefrom.net, or yt1s.com
- Paste the YouTube URL
- Select MP3 for audio or MP4 for video
- Download and rename the files

### Option 2: Using yt-dlp (Command Line)
```bash
# Install yt-dlp
pip install yt-dlp

# Download video
yt-dlp -f "best[ext=mp4]" "https://www.youtube.com/watch?v=q1FablBtiho" -o "public/videos/ghost-jumpscare.mp4"

# Download audio as MP3
yt-dlp -x --audio-format mp3 "https://youtu.be/XVxE2vs9skM" -o "public/sounds/ambient-scary.mp3"
yt-dlp -x --audio-format mp3 "https://youtube.com/shorts/WwvCfCDIn3M" -o "public/sounds/ghost-scream.mp3"
```

## After Adding Files

1. Make sure the files are in the correct folders
2. Restart your development server: `npm run dev`
3. The sounds and video will now work automatically!

## Features

- **Ambient Music:** Plays continuously in background during gameplay
- **Jump Scare:** Random scary ghost video with scream sound every 5-13 seconds
- **Real Horror:** Uses actual scary content for maximum fear factor

## Troubleshooting

If sounds don't play:
1. Check browser console for errors
2. Make sure files are in `public/` folder (not `src/`)
3. Check file names match exactly
4. Try clicking on the page first (browsers require user interaction for audio)

## Legal Note

Make sure you have the right to use these assets. For personal/educational projects, this is usually fine. For commercial use, you may need permission from the content creators.

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  youtubeId?: string;
  vimeoId?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
  title?: string;
}

/**
 * VideoPlayer Component
 * 
 * Supports:
 * - Self-hosted MP4 videos (src prop)
 * - YouTube embeds (youtubeId prop)
 * - Vimeo embeds (vimeoId prop)
 * - Auto-play (muted)
 * - Custom controls
 * - Responsive aspect ratios
 * - Accessibility features
 */
const VideoPlayer = ({
  src,
  poster,
  youtubeId,
  vimeoId,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  className = '',
  aspectRatio = '16/9',
  title = 'Video player'
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, likely due to browser policy
        setIsPlaying(false);
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // YouTube embed
  if (youtubeId) {
    return (
      <div className={`relative w-full ${className}`} style={{ aspectRatio }}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${controls ? 1 : 0}&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>
    );
  }

  // Vimeo embed
  if (vimeoId) {
    return (
      <div className={`relative w-full ${className}`} style={{ aspectRatio }}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoPlay ? 1 : 0}&muted=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${controls ? 1 : 0}`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>
    );
  }

  // Self-hosted video
  if (src) {
    return (
      <div className={`relative w-full group ${className}`} style={{ aspectRatio }}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          playsInline
          className="w-full h-full object-cover rounded-lg"
          aria-label={title}
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls */}
        {controls && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              onClick={togglePlay}
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleMute}
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Fallback: Show poster image if no video source provided
  return poster ? (
    <div className={`relative w-full ${className}`} style={{ aspectRatio }}>
      <img src={poster} alt={title} className="w-full h-full object-cover rounded-lg" />
    </div>
  ) : null;
};

export default VideoPlayer;


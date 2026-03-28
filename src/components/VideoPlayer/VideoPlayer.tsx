'use client';

import { useEffect, useRef, type CSSProperties, type ComponentProps } from 'react';
import MuxVideo from '@mux/mux-video-react';

export const DEFAULT_MUX_PLAYBACK_ID =
  'SaFb9Ic00OouhgxEfxw7eAq8xiY9psEIkearPAu6xJc00';

type VideoFillMode = 'contain' | 'cover';

type VideoPlayerProps = Omit<
  ComponentProps<typeof MuxVideo>,
  'playbackId' | 'autoPlay' | 'muted' | 'loop' | 'controls' | 'style'
> & {
  autoplay?: boolean;
  fill?: VideoFillMode;
  loop?: boolean;
  muted?: boolean;
  playbackId?: string;
  playbackRate?: number;
  style?: CSSProperties;
};

export default function VideoPlayer({
  autoplay = true,
  fill = 'cover',
  loop = true,
  muted = true,
  playbackId = DEFAULT_MUX_PLAYBACK_ID,
  playbackRate = 0.66,
  style,
  ...props
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.defaultPlaybackRate = playbackRate;
    videoRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  return (
    <MuxVideo
      {...props}
      ref={videoRef}
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      playsInline
      controls={false}
      preload="auto"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: fill,
        ...style,
      }}
    />
  );
}

'use client';

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ComponentProps,
} from 'react';
import MuxVideo from '@mux/mux-video-react';

export const DEFAULT_MUX_PLAYBACK_ID =
  'SaFb9Ic00OouhgxEfxw7eAq8xiY9psEIkearPAu6xJc00';

type VideoFillMode = 'contain' | 'cover';

const getMuxPosterUrl = (playbackId: string, posterTime?: number) => {
  const posterUrl = new URL(
    `https://image.mux.com/${encodeURIComponent(playbackId)}/thumbnail.jpg`
  );

  if (typeof posterTime === 'number') {
    posterUrl.searchParams.set('time', posterTime.toString());
  }

  return posterUrl.toString();
};

type VideoPlayerProps = Omit<
  ComponentProps<typeof MuxVideo>,
  'playbackId' | 'autoPlay' | 'muted' | 'loop' | 'controls' | 'style'
> & {
  active?: boolean;
  autoplay?: boolean;
  fill?: VideoFillMode;
  loop?: boolean;
  muted?: boolean;
  playbackId?: string;
  playbackRate?: number;
  poster?: string;
  posterTime?: number;
  style?: CSSProperties;
};

export default function VideoPlayer({
  active = true,
  autoplay = true,
  fill = 'cover',
  loop = true,
  muted = true,
  playbackId = DEFAULT_MUX_PLAYBACK_ID,
  playbackRate = 0.66,
  poster,
  posterTime,
  style,
  ...props
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedPoster = poster ?? getMuxPosterUrl(playbackId, posterTime);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.defaultMuted = muted;
    videoRef.current.muted = muted;
    videoRef.current.playsInline = true;
    videoRef.current.setAttribute('muted', '');
    videoRef.current.setAttribute('playsinline', '');
    videoRef.current.setAttribute('webkit-playsinline', '');
    videoRef.current.defaultPlaybackRate = playbackRate;
    videoRef.current.playbackRate = playbackRate;
  }, [muted, playbackRate]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !autoplay || !active) {
      return;
    }

    const playbackAttempt = videoElement.play();

    if (!playbackAttempt || typeof playbackAttempt.catch !== 'function') {
      return;
    }

    playbackAttempt.catch(() => {
      // Safari/iPhone can reject autoplay even when markup is correct.
      // Leave the poster in place rather than surfacing an unhandled promise.
    });
  }, [active, autoplay, playbackId]);

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
      poster={resolvedPoster}
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

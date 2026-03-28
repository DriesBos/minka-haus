'use client';

import type { CSSProperties, ComponentProps } from 'react';
import MuxVideo from '@mux/mux-video-react';

export const DEFAULT_MUX_PLAYBACK_ID =
  'SaFb9Ic00OouhgxEfxw7eAq8xiY9psEIkearPAu6xJc00';

type VideoPlayerProps = Omit<
  ComponentProps<typeof MuxVideo>,
  'playbackId' | 'autoPlay' | 'muted' | 'controls' | 'style'
> & {
  playbackId?: string;
  style?: CSSProperties;
};

export default function VideoPlayer({
  playbackId = DEFAULT_MUX_PLAYBACK_ID,
  style,
  ...props
}: VideoPlayerProps) {
  return (
    <MuxVideo
      {...props}
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay
      muted
      playsInline
      controls={false}
      preload="auto"
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        ...style,
      }}
    />
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Taahirah Denmark — Tech Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const { width, height } = size;
  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0b0b0f',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 32,
            borderRadius: 24,
            border: '2px solid',
            borderImage: 'linear-gradient(135deg,#8a2be2,#00e5ff) 1',
          }}
        />
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            color: 'white',
            textAlign: 'center',
            letterSpacing: -1,
            lineHeight: 1.1,
          }}
        >
          Taahirah Denmark
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 34,
            fontWeight: 500,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            background: 'linear-gradient(135deg,#8a2be2,#00e5ff)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Tech Portfolio
        </div>
      </div>
    ),
    { ...size }
  );
}

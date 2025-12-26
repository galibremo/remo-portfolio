import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = "Galib's Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>Galib&apos;s Portfolio</div>
        <div style={{ fontSize: 40, fontWeight: 'normal', opacity: 0.9 }}>
          Full Stack Developer & UI/UX Designer
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

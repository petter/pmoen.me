import { GrainOverlay } from './grain-overlay';

export function AmbientBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px] max-h-full"
        style={{
          background:
            'radial-gradient(65% 75% at 24% 0%, rgba(245, 184, 46, 0.045), transparent 72%)',
        }}
      />
      <GrainOverlay />
    </>
  );
}

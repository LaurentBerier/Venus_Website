export default function AmbientEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <div className="ambient-orb ambient-orb-cyan" />
      <div className="ambient-orb ambient-orb-orange" />
      <div className="ambient-orb ambient-orb-cyan-2" />
      <div className="scan-line" />
    </div>
  );
}

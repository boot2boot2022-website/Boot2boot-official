import FloatingCard from "./FloatingCard";

const FloatingScene = () => {
  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-[#08080a] flex items-center justify-center"
      style={{
        perspective: "1200px",
      }}
    >
      <div
        className="relative w-0 h-0"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <FloatingCard x={-320} y={-160} z={0} delay={0}>
          <div className="w-full h-full bg-[#18181b] border border-white/10 rounded-2xl flex flex-col justify-between p-3.5 shadow-2xl">
            <span className="text-[10px] font-mono text-gray-500">01</span>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs font-semibold text-gray-200">Strength</span>
          </div>
        </FloatingCard>

        <FloatingCard x={-110} y={-220} z={200} delay={0.7}>
          <div className="w-full h-full bg-[#18181b] border border-white/10 rounded-2xl flex flex-col justify-between p-3.5 shadow-2xl">
            <span className="text-[10px] font-mono text-gray-500">02</span>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs font-semibold text-gray-200">Intellect</span>
          </div>
        </FloatingCard>

        <FloatingCard x={140} y={-160} z={100} delay={1.4}>
          <div className="w-full h-full bg-[#18181b] border border-white/10 rounded-2xl flex flex-col justify-between p-3.5 shadow-2xl">
            <span className="text-[10px] font-mono text-gray-500">03</span>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs font-semibold text-gray-200">Wisdom</span>
          </div>
        </FloatingCard>

        <FloatingCard x={320} y={-60} z={-100} delay={2.1}>
          <div className="w-full h-full bg-[#18181b] border border-white/10 rounded-2xl flex flex-col justify-between p-3.5 shadow-2xl">
            <span className="text-[10px] font-mono text-gray-500">04</span>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs font-semibold text-gray-200">Charisma</span>
          </div>
        </FloatingCard>

        <FloatingCard x={-290} y={130} z={-100} delay={2.8}>
          <div className="w-full h-full bg-[#18181b] border border-white/10 rounded-2xl flex flex-col justify-between p-3.5 shadow-2xl">
            <span className="text-[10px] font-mono text-gray-500">05</span>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs font-semibold text-gray-200">Focus</span>
          </div>
        </FloatingCard>

        <FloatingCard x={-60} y={160} z={150} delay={3.5}>
          <div className="w-full h-full bg-[#18181b] border border-white/10 rounded-2xl flex flex-col justify-between p-3.5 shadow-2xl">
            <span className="text-[10px] font-mono text-gray-500">06</span>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs font-semibold text-gray-200">Courage</span>
          </div>
        </FloatingCard>

        <FloatingCard x={190} y={150} z={250} delay={4.2}>
          <div className="w-full h-full bg-[#18181b] border border-white/10 rounded-2xl flex flex-col justify-between p-3.5 shadow-2xl">
            <span className="text-[10px] font-mono text-gray-500">07</span>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs font-semibold text-gray-200">Spirit</span>
          </div>
        </FloatingCard>

        <FloatingCard x={360} y={110} z={-150} delay={4.9}>
          <div className="w-full h-full bg-[#18181b] border border-white/10 rounded-2xl flex flex-col justify-between p-3.5 shadow-2xl">
            <span className="text-[10px] font-mono text-gray-500">08</span>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
            <span className="text-xs font-semibold text-gray-200">Discipline</span>
          </div>
        </FloatingCard>
      </div>
    </section>
  );
};

export default FloatingScene;

function StatCard({ icon, label, value, color }) {
    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300">
            <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} mb-3`}
            >
                <div className="text-white">{icon}</div>
            </div>
            <p className="text-white/70 text-sm mb-1">{label}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
    )
}
export default StatCard

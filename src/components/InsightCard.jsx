function InsightCard({ title, value, description }) {
    return (
        <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
            <h4 className="text-white font-semibold mb-1">{title}</h4>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className="text-white/60 text-sm">{description}</p>
        </div>
    )
}
export default InsightCard

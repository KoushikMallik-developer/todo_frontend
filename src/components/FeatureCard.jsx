function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:scale-105 transition-all duration-300">
            <div className="text-white/90 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-white/60 text-sm">{description}</p>
        </div>
    )
}

export default FeatureCard

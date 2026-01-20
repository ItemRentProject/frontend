import Features from '../components/home/features';
import Hero from '../components/home/hero';
import TrendingItems from '../components/home/trending-items';
import Header from '../components/layout/header';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Header />
            <Hero />
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🔥 Популярное рядом с вами
            </h2>
            <TrendingItems />
        </div>
        <Features />
        <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-4">ДавайБери</h3>
            <p className="text-gray-400">Арендуй вещи у соседей • Экономь деньги и пространство</p>
        </div>
        </footer>
    </div>
    );
}
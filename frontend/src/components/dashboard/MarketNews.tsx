import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const MarketNews = () => {

    interface NewsItem {
        title: string;
        source_name: string;
        description?: string;
        link?: string;
    }

    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchNews() {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/api/marketNew', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setNews(data.results || []);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className='w-full'>
            {/* Section Header */}
            <div className="mb-6">
                <h2 className="font-bold text-2xl text-gray-900">Market News</h2>
                <p className="text-gray-500 mt-1">Latest updates from the market</p>
            </div>

            {/* News Grid */}
            <div className='grid grid-cols-1 gap-4'>
                {isLoading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="p-5 bg-white border border-gray-100 rounded-xl animate-pulse">
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                        </div>
                    ))
                ) : news.length > 0 ? (
                    news.slice(0, 10).map((article, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className='p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer'
                        >
                            <div className='flex justify-between items-start gap-4 mb-2'>
                                <h3 className='text-base font-semibold text-gray-900 leading-snug flex-1'>
                                    {article.title}
                                </h3>
                                <span className='text-xs font-medium text-gray-400 whitespace-nowrap px-2 py-1 bg-gray-50 rounded'>
                                    {article.source_name}
                                </span>
                            </div>
                            {article.description && (
                                <p className='text-sm text-gray-500 leading-relaxed line-clamp-2'>
                                    {article.description}
                                </p>
                            )}
                        </motion.article>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        <p className='font-medium'>No news available</p>
                        <p className='text-sm mt-1'>Check back later for updates</p>
                    </div>
                )}
            </div>
        </div>
    )
}
import {motion} from 'motion/react';
import { useEffect, useState } from 'react';
import { set } from 'zod';

export const MarketNews =  () => {

    interface NewsItem {
    title: string;
    source_name: string;
    description?: string;
    link?: string;
    }


    const [news, setNews] = useState<NewsItem[]>([]);

    async function fetchNews() {
        try {
            const response = await fetch('http://localhost:3000/api/marketNew',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const data = await response.json();

            setNews(data.results);

        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    useEffect(()=>{
        fetchNews();
    },[]);

    return (
        <div className='w-[75vw] max-h-[80vh] overflow-y-auto max-w-[75vw] pt-10'>
            <div >
                <div className='grid grid-cols-1 justify-between'>
                    {news.length > 0 ? (
                        news.slice(0, 10).map((article, index) => (
                            <motion.div key={index} initial={{ opacity: 0 , x:-50 }} animate={{ opacity: 1 , x:0 }} transition={{ duration: 1, when: 'beforeChildren', staggerChildren: 0.25 }} className='mb-6 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 scrollbar-hide flex flex-col justify-between scrollbar-hide'>
                                <motion.div className='flex justify-between'>
                                <h2 className='text-lg font-semibold mb-2'>{article.title}</h2>
                                <p className='text-[#999999] font-semibold'>{article.source_name}</p>
                                </motion.div>
                                <motion.div>
                                    <p className='text-[#999999] font-semibold'>{article.description}</p>
                                </motion.div>
                            </motion.div>
                        ))
                    ) : (
                        <p className='text-[#999999] font-semibold'>No news available</p>
                    )}
                </div>
                
            </div>
        </div>
    )
}
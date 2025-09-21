import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    { name: "Frontend Developer", icon: "💻", color: "from-blue-500 to-blue-600" },
    { name: "Backend Developer", icon: "⚙️", color: "from-green-500 to-green-600" },
    { name: "Data Science", icon: "📊", color: "from-purple-500 to-purple-600" },
    { name: "Graphic Designer", icon: "🎨", color: "from-pink-500 to-pink-600" },
    { name: "FullStack Developer", icon: "🚀", color: "from-orange-500 to-orange-600" },
    { name: "DevOps Engineer", icon: "🔧", color: "from-indigo-500 to-indigo-600" },
    { name: "UI/UX Designer", icon: "✨", color: "from-teal-500 to-teal-600" },
    { name: "Mobile Developer", icon: "📱", color: "from-cyan-500 to-cyan-600" }
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='py-16 bg-gradient-light relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent'></div>
            <div className='max-w-7xl mx-auto px-4 relative'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                        Explore by <span className='text-gradient-primary'>Category</span>
                    </h2>
                    <p className='text-gray-700 text-lg'>
                        Discover opportunities in your field of expertise
                    </p>
                </div>
                
                <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {
                            category.map((cat, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                                    <div 
                                        onClick={()=>searchJobHandler(cat.name)} 
                                        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.color} p-6 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                                    >
                                        <div className='text-white'>
                                            <div className='text-4xl mb-3 group-hover:scale-110 transition-transform duration-300'>
                                                {cat.icon}
                                            </div>
                                            <h3 className='font-semibold text-lg mb-2 group-hover:text-white/90'>
                                                {cat.name}
                                            </h3>
                                            <p className='text-white/80 text-sm'>
                                                Find {cat.name.toLowerCase()} jobs
                                            </p>
                                        </div>
                                        
                                        {/* Hover effect overlay */}
                                        <div className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className='left-4 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg' />
                    <CarouselNext className='right-4 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg' />
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden bg-gradient-hero min-h-screen'>
            {/* Background decoration */}
            <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
            <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-blue-300/30 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-300/30 to-purple-300/30 rounded-full blur-3xl'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl'></div>
            
            <div className='relative text-center py-20 px-4'>
                <div className='flex flex-col gap-8 max-w-4xl mx-auto'>
                    <div className='inline-flex items-center gap-2 mx-auto px-6 py-3 rounded-full bg-gradient-card backdrop-blur-sm border border-white/20 text-white font-semibold text-sm shadow-lg'>
                        <div className='w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse'></div>
                        No. 1 Job Hunt Website
                    </div>
                    
                    <h1 className='text-6xl md:text-7xl font-bold leading-tight text-white'>
                        Search, Apply & <br /> 
                        <span className='text-gradient-secondary'>
                            Get Your Dream Jobs
                        </span>
                    </h1>
                    
                    <p className='text-xl text-white/90 max-w-2xl mx-auto leading-relaxed'>
                        Connect with top companies and find your perfect career match. 
                        Join thousands of professionals who found their dream jobs with us.
                    </p>
                    
                    <div className='flex w-full max-w-2xl shadow-2xl border border-white/20 bg-gradient-card backdrop-blur-sm pl-6 rounded-full items-center gap-4 mx-auto hover:shadow-3xl transition-all duration-300'>
                        <Search className='h-6 w-6 text-gray-600' />
                        <input
                            type="text"
                            placeholder='Search for jobs, companies, or skills...'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full py-4 text-lg placeholder-gray-500 bg-transparent'
                            onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-r-full bg-gradient-primary hover:opacity-90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                        >
                            Search Jobs
                        </Button>
                    </div>
                    
                    {/* Stats */}
                    <div className='flex justify-center gap-12 mt-8'>
                        <div className='text-center bg-gradient-card backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg'>
                            <div className='text-3xl font-bold text-gradient-primary'>10K+</div>
                            <div className='text-sm text-white/80'>Active Jobs</div>
                        </div>
                        <div className='text-center bg-gradient-card backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg'>
                            <div className='text-3xl font-bold text-gradient-secondary'>500+</div>
                            <div className='text-sm text-white/80'>Companies</div>
                        </div>
                        <div className='text-center bg-gradient-card backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg'>
                            <div className='text-3xl font-bold text-gradient-success'>50K+</div>
                            <div className='text-sm text-white/80'>Success Stories</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
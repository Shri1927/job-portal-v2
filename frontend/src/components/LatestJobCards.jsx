import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='group p-6 rounded-xl shadow-lg bg-gradient-card backdrop-blur-sm border border-white/20 cursor-pointer hover:shadow-2xl hover:border-gradient-primary transition-all duration-300 hover:-translate-y-1'
        >
            {/* Company Header */}
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md'>
                        <span className='text-white font-bold text-lg'>
                            {job?.company?.name?.charAt(0) || 'C'}
                        </span>
                    </div>
                    <div>
                        <h1 className='font-semibold text-lg text-gray-900 group-hover:text-[#6A38C2] transition-colors duration-200'>
                            {job?.company?.name}
                        </h1>
                        <p className='text-sm text-gray-500 flex items-center gap-1'>
                            <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                            {job?.location || 'India'}
                        </p>
                    </div>
                </div>
                <div className='text-right'>
                    <div className='text-2xl font-bold text-gradient-primary'>{job?.salary}LPA</div>
                    <div className='text-xs text-gray-600'>Annual</div>
                </div>
            </div>
            
            {/* Job Title & Description */}
            <div className='mb-4'>
                <h1 className='font-bold text-xl text-gray-900 group-hover:text-gradient-primary transition-colors duration-200 mb-2'>
                    {job?.title}
                </h1>
                <p className='text-sm text-gray-700 line-clamp-2 leading-relaxed'>
                    {job?.description}
                </p>
            </div>
            
            {/* Badges */}
            <div className='flex items-center gap-2 flex-wrap'>
                <Badge className='bg-gradient-success text-white border-0 hover:opacity-80 transition-all duration-200'>
                    {job?.position} Position{job?.position > 1 ? 's' : ''}
                </Badge>
                <Badge className='bg-gradient-secondary text-white border-0 hover:opacity-80 transition-all duration-200'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-gradient-warning text-white border-0 hover:opacity-80 transition-all duration-200'>
                    {job?.experience} yrs exp
                </Badge>
            </div>
            
            {/* Footer */}
            <div className='mt-4 pt-4 border-t border-white/20 flex items-center justify-between'>
                <div className='text-xs text-gray-600'>
                    Posted {new Date(job?.createdAt).toLocaleDateString()}
                </div>
                <div className='text-sm text-gradient-primary font-medium group-hover:opacity-80 transition-all duration-200'>
                    View Details →
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards
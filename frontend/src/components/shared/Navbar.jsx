import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout as logoutAPI } from '@/api/api'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await logoutAPI();
            if (res.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }
    return (
        <div className='bg-gradient-card backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md'>
                        <span className='text-white font-bold text-sm'>JP</span>
                    </div>
                    <h1 className='text-2xl font-bold text-gradient-primary'>
                        Job<span className='text-gradient-secondary'>Portal</span>
                    </h1>
                </div>
                
                <div className='flex items-center gap-8'>
                    <ul className='hidden md:flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link 
                                            to="/admin/companies" 
                                            className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium'
                                        >
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/admin/jobs" 
                                            className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium'
                                        >
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link 
                                            to="/" 
                                            className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium'
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/jobs" 
                                            className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium'
                                        >
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/browse" 
                                            className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium'
                                        >
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button 
                                        variant="outline" 
                                        className='border-gray-300 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all duration-200'
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className='flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200'>
                                        <Avatar className="cursor-pointer ring-2 ring-gray-200 hover:ring-[#6A38C2] transition-all duration-200">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div className='hidden md:block text-left'>
                                            <div className='font-medium text-sm text-gray-900'>{user?.fullname}</div>
                                            <div className='text-xs text-gray-500'>{user?.role}</div>
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-6 shadow-xl border-0 bg-white/95 backdrop-blur-md">
                                    <div className='space-y-4'>
                                        <div className='flex gap-4 items-center pb-4 border-b border-gray-100'>
                                            <Avatar className="cursor-pointer ring-2 ring-gray-200">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-gray-900'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio || 'Welcome to JobPortal!'}</p>
                                                <div className='text-xs text-[#6A38C2] font-medium mt-1'>{user?.role}</div>
                                            </div>
                                        </div>
                                        
                                        <div className='space-y-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile">
                                                        <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer'>
                                                            <User2 className='h-5 w-5 text-gray-600' />
                                                            <span className='text-gray-700 font-medium'>View Profile</span>
                                                        </div>
                                                    </Link>
                                                )
                                            }

                                            <div 
                                                onClick={logoutHandler}
                                                className='flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 cursor-pointer'
                                            >
                                                <LogOut className='h-5 w-5 text-red-500' />
                                                <span className='text-red-600 font-medium'>Logout</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
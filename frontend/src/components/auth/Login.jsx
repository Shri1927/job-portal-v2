import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginAPI } from '@/api/api'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await loginAPI(input);
            if (res.success) {
                dispatch(setUser(res.user));
                navigate("/");
                toast.success(res.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='min-h-screen bg-gradient-auth relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent'></div>
            <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-purple-300/20 rounded-full blur-3xl'></div>
            
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-64px)] px-4 relative'>
                <div className='w-full max-w-md'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
                            <span className='text-white font-bold text-xl'>JP</span>
                        </div>
                        <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
                        <p className='text-white/90'>Sign in to your account to continue</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} className='bg-gradient-card backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl'>
                        <div className='space-y-6'>
                            <div>
                                <Label className='text-sm font-semibold text-gray-700 mb-2 block'>Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your email"
                                    className='h-12 border-gray-300 focus:border-[#6A38C2] focus:ring-[#6A38C2] rounded-xl'
                                />
                            </div>

                            <div>
                                <Label className='text-sm font-semibold text-gray-700 mb-2 block'>Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your password"
                                    className='h-12 border-gray-300 focus:border-[#6A38C2] focus:ring-[#6A38C2] rounded-xl'
                                />
                            </div>

                            <div>
                                <Label className='text-sm font-semibold text-gray-700 mb-3 block'>I am a</Label>
                                <RadioGroup className="flex gap-6">
                                    <div className="flex items-center space-x-3">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-5 h-5 text-[#6A38C2]"
                                        />
                                        <Label htmlFor="r1" className='cursor-pointer text-gray-700 font-medium'>Job Seeker</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-5 h-5 text-[#6A38C2]"
                                        />
                                        <Label htmlFor="r2" className='cursor-pointer text-gray-700 font-medium'>Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-gradient-primary hover:opacity-90 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                            <div className='text-center'>
                                <span className='text-gray-700'>Don't have an account? </span>
                                <Link to="/signup" className='text-gradient-primary font-semibold transition-colors duration-200'>
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
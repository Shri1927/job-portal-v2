import { setAllAdminJobs } from '@/redux/jobSlice'
import { getAdminJobs } from '@/api/api'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await getAdminJobs();
                if(res.success){
                    dispatch(setAllAdminJobs(res.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs
import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { getCompanyById, getAllJobs } from '@/api/api'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                const res = await getCompanyById(companyId);
                console.log(res.company);
                if(res.success){
                    dispatch(setSingleCompany(res.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetCompanyById
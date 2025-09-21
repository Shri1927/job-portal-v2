import { setCompanies} from '@/redux/companySlice'
import { getCompany } from '@/api/api'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await getCompany();
                console.log('called');
                if(res.success){
                    dispatch(setCompanies(res.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies
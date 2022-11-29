import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { selectAllDataQuotation, getStatus, fetchQuotation } from "./exchangeSlice"

const ExchangeCheck = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectAllDataQuotation);
    const exchangeStatus = useSelector(getStatus);

    useEffect(() => {
        if (exchangeStatus === 'idle') {
            dispatch(fetchQuotation());
        }
    }, [exchangeStatus, dispatch]);
    let content;
    if (exchangeStatus === 'loading') {
        content = <p>CARGANDO</p>
    } else if (exchangeStatus === 'succeded') {
        console.log(data);
        content = <p>SE COMPLETO {data.compra}</p>
    } else if (exchangeStatus === 'failed') {
        content = <p>FALLó</p>
    }



    return (
        <>
        {content}
        </>
    
  )
}
export default ExchangeCheck
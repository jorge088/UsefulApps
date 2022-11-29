import { useSelector,useDispatch } from "react-redux"

import {  getAllSettings,startPomodoroCounter,changePomodoroCounterExecution } from "./pomodoroSlice"

const PomodoroCheck = () => {
    const dispatch = useDispatch()
    const settings = useSelector(getAllSettings);
    console.log(settings);

    const handlePomodoroStart =()=>{
        dispatch(startPomodoroCounter());
    }
    const handleChangeExecution = () =>{
        dispatch(changePomodoroCounterExecution())
    }
  return (
    <>
    <div>PomodoroCheck</div>
    <button
        type="button"
        value='Iniciar'
        onClick={handlePomodoroStart}
    >Iniciar</button>
    <button
        type="button"
        value='Iniciar'
        onClick={handleChangeExecution}
    >Cambiar modo</button>
    </>
    
  )
}
export default PomodoroCheck
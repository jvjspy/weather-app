import { useEffect, useState } from "react"

export default function useLocation() {
  const [pos, setPos] = useState<{lat:number,lon:number}>()
  const [err, setErr] = useState<string>()
  function handleSuccess({coords}:GeolocationPosition){
    setPos({lat:coords.latitude,lon:coords.longitude})
  }
  function handleError({message}:GeolocationPositionError){
    setErr(message)
  }
  useEffect(()=>{
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(handleSuccess,handleError)
    } else {
      setErr('This device does not support geolocation!')
    }
  },[])
  return {pos,err};
}

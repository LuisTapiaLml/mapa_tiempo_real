import React from 'react'
import { useMapbox } from '../hooks/useMapbox';


const puntoInicial = {
    lng : -99.20 ,
    lat: 19.42 ,
    zoom : 14
}

export const MapaPage = () => {

    const { coords , setRef } = useMapbox(puntoInicial);

    return (
        <>  
            <div className='info-mapa' >
                Lng : { coords.lng} | lat : { coords.lat } | zoom : { coords.zoom } 
            </div>
            <div
                ref={ setRef }
                className="mapContainer"
            />
        </>
    )
}

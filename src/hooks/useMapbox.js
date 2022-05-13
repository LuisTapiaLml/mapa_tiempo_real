import { useCallback, useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TKN;


export const useMapbox = (puntoInicial) => {

    const mapaDiv = useRef();

    const mapa = useRef();

    const setRef = useCallback((node) => {
        
        mapaDiv.current = node;

    }, []);


    //Referencia a los marcadores
    const marcadores = useRef({});

    const [coords, setCoords] = useState(puntoInicial);

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });

        mapa.current = map;

    }, [puntoInicial]);

    // listener map movement
    useEffect(() => {

        mapa.current?.on('move', (e) => {

            const { lng, lat } = mapa.current.getCenter();

            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2),
            });

        });

    }, []);


    // agregar marcadores al click
    useEffect(() => {

        mapa.current?.on('click', (e) => {

            const { lng, lat } = e.lngLat;

            const maker = new mapboxgl.Marker();

            maker.id = v4();

            maker.setLngLat([lng, lat]).
                addTo(mapa.current).
                setDraggable(true);

            marcadores.current[ maker.id ] = maker ; 

        });

    }, [])


    return {
        coords,
        marcadores,
        setRef
    }

}

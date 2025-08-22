// Read The Type in Vite Client (already it has types for env or things like that) 
/// <reference types="vite/client" />

type Config = {
    COOKIE_NAME : string,
    API_URL : string,
}

export const APP_CONFIG : Config = {
    COOKIE_NAME : import.meta.env.VITE_COOKIE_NAME,
    API_URL : import.meta.env.VITE_API_URL
}
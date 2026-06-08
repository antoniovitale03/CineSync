import axios from "axios";

// Usa sempre la variabile d'ambiente come baseURL per evitare problemi tra fisso, portatile e cloud!
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER || "http://localhost:5000",
    withCredentials: true
});

// Intercettore di risposta
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // CASO CRITICO: Se a fallire con 401 è la chiamata stessa di REFRESH, fermati subito!
        if (originalRequest.url.includes("/api/auth/refresh")) {
            window.dispatchEvent(new CustomEvent('logout-event'));
            return Promise.reject(error);
        }

        // Se l'errore è 401 ed è una richiesta normale che non abbiamo ancora ritentato
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // NOTA: Usiamo "axios" nativo, NON l'istanza "api", per non triggerare altri intercettori
                const response = await axios.post(
                    `${process.env.REACT_APP_SERVER}/api/auth/refresh`,
                    {},
                    { withCredentials: true } // Fondamentale per i cookie
                );

                const accessToken = response.data;

                // Aggiorno l'accessToken nel localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                    user.accessToken = accessToken;
                    localStorage.setItem('user', JSON.stringify(user));
                }

                // Aggiorna i token per le prossime chiamate
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // Ritenta la richiesta originale
                return api(originalRequest);
            } catch (refreshError) {
                // Se il refresh fallisce (es. cookie scaduto), forziamo il logout
                window.dispatchEvent(new CustomEvent('logout-event'));
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Interceptor di richiesta (aggiunge il token se esiste)
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user?.accessToken;

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
import rateLimit from 'express-rate-limit';


export const votarLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutos (en milisegundos)
  max: 10, // Límite de 20 peticiones
  message: {
    status: 429,
    message: "Has alcanzado el límite de votos permitidos. Intenta de nuevo en 20 minutos o invita a otro usuario a participar."
  },
  standardHeaders: true, // Devuelve información del límite en los encabezados 'RateLimit-*'
  legacyHeaders: false, // Desactiva los encabezados 'X-RateLimit-*'
});
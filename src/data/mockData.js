// En src/data/mockData.js

// En src/data/mockData.js

// En src/data/mockData.js

export const initialRetos = [
  {
    id: 1,
    titulo: "Reto 1: El Primer Acercamiento",
    desc: "Pequeños gestos para romper el hielo.",
    color: "bg-blue-100",
    locked: false,
    pasos: [
      { id: 1, texto: "Salúdalo/a con una sonrisa cada mañana, sin esperar nada a cambio.", completado: false },
      { id: 2, texto: "Pregúntale por su día y escucha su respuesta con atención durante al menos 2 minutos.", completado: false },
      { id: 3, texto: "Encuentra algo genuino para elogiarle (su ropa, un dibujo, cómo ayudó en algo).", completado: false },
    ]
  },
  {
    id: 2,
    titulo: "Reto 2: Conectando a Través de la Comida",
    desc: "La cocina es un lugar perfecto para crear vínculos.",
    color: "bg-green-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Pregúntale cuál es su comida favorita que cocinas en casa.", completado: false },
      { id: 2, texto: "Invítalo/a a cocinar juntos esa comida favorita esta semana.", completado: false },
      { id: 3, texto: "Durante la comida, apaga el móvil y la TV y conversen.", completado: false },
    ]
  },
  {
    id: 3,
    titulo: "Reto 3: 30 Minutos de Tiempo de Calidad",
    desc: "Dedicar tiempo exclusivo, sin distracciones.",
    color: "bg-pink-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Pregúntale qué actividad le gustaría hacer contigo durante 30 minutos.", completado: false },
      { id: 2, texto: "Agenda ese tiempo en el calendario como si fuera una cita importante.", completado: false },
      { id: 3, texto: "Durante esos 30 minutos, dedícale tu atención total (sin móvil).", completado: false },
    ]
  },
  {
    id: 4,
    titulo: "Reto 4: El Poder de un Regalo Simple",
    desc: "Un detalle que diga 'pensé en ti'.",
    color: "bg-purple-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Presta atención a algo que menciona necesitar o desear (un lápiz, un cómic, etc.).", completado: false },
      { id: 2, texto: "En la próxima semana, regálale ese pequeño detalle sin un motivo especial.", completado: false },
      { id: 3, texto: "Al dárselo, solo di 'esto me hizo pensar en ti', sin esperar nada más.", completado: false },
    ]
  },
  {
    id: 5,
    titulo: "Reto 5: Explorando Su Mundo",
    desc: "Interésate genuinamente por sus pasiones.",
    color: "bg-yellow-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Pídele que te enseñe su videojuego, hobby o pasatiempo favorito.", completado: false },
      { id: 2, texto: "Déjale que te explique las reglas o cómo funciona.", completado: false },
      { id: 3, texto: "Juega o participa con él/ella durante al menos 20 minutos.", completado: false },
    ]
  },
  {
    id: 6,
    titulo: "Reto 6: Una Noche de Cine en Casa",
    desc: "Crear una experiencia especial y compartida.",
    color: "bg-indigo-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Elige juntos una película o serie que a los dos os guste.", completado: false },
      { id: 2, texto: "Prepara palomitas o su snack favorito.", completado: false },
      { id: 3, texto: "Apaga las luces y disfruten del 'cine' como si fuera un evento real.", completado: false },
    ]
  },
  {
    id: 7,
    titulo: "Reto 7: El Diario de Conversación",
    desc: "Crear un espacio seguro para la comunicación.",
    color: "bg-red-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Compra un cuaderno bonito y explícale que es un 'diario secreto' para ustedes dos.", completado: false },
      { id: 2, texto: "Escribe la primera entrada sobre un buen momento que pasaron juntos.", completado: false },
      { id: 3, texto: "Déjalo en su cuarto para que lo lea y pueda responder cuando quiera.", completado: false },
    ]
  },
  {
    id: 8,
    titulo: "Reto 8: Aprender Algo Nuevo Juntos",
    desc: "Un reto compartido fortalece la complicidad.",
    color: "bg-teal-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Busquen un tutorial en YouTube de algo que a los dos les interese (un truco de magia, una receta fácil, etc.).", completado: false },
      { id: 2, texto: "Dediquen tiempo a practicarlo juntos, riéndose de los errores.", completado: false },
      { id: 3, texto: "Muestren el resultado a la familia o simplemente disfruten del logro para ustedes.", completado: false },
    ]
  },
  {
    id: 9,
    titulo: "Reto 9: El Elogio Específico",
    desc: "Más allá del 'buen trabajo'.",
    color: "bg-orange-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Durante un día, observa algo que haga bien (hacer la tarea, ayudar a un hermano).", completado: false },
      { id: 2, texto: "En lugar de 'bien hecho', dile algo específico: 'Admiro cómo te concentraste en ese problema de matemáticas'.", completado: false },
      { id: 3, texto: "Observa su reacción a recibir un elogio tan concreto.", completado: false },
    ]
  },
  {
    id: 10,
    titulo: "Reto 10: Una Tarjeta de 'Gracias por Estar Ahí'",
    desc: "Reconocer su presencia en tu vida.",
    color: "bg-cyan-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Compra una tarjeta postal o haz una tú mismo.", completado: false },
      { id: 2, texto: "Escribe un mensaje sincero sobre lo feliz que te hace que forme parte de la familia.", completado: false },
      { id: 3, texto: "Déjasela en su almohada o en su mochila para que la encuentre.", completado: false },
    ]
  },
  {
    id: 11,
    titulo: "Reto 11: Planificar una Pequeña Aventura",
    desc: "Crear un recuerdo inolvidable.",
    color: "bg-lime-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Investiguen un lugar cercano que ninguno de los dos haya visitado (un parque, un museo pequeño, una cafetería).", completado: false },
      { id: 2, texto: "Planifiquen juntos el 'viaje': cómo llegar, qué van a hacer allí.", completado: false },
      { id: 3, texto: "¡Vivan la aventura! Tomen fotos para recordar el día.", completado: false },
    ]
  },
  {
    id: 12,
    titulo: "Reto 12: La Hora de los Deportes",
    desc: "Compartir la pasión por el deporte.",
    color: "bg-emerald-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Invítale a jugar o a practicar su deporte favorito (incluso si es solo lanzar una pelota en el parque).", completado: false },
      { id: 2, texto: "Anímale y celebre sus logros, por pequeños que sean.", completado: false },
      { id: 3, texto: "Si no te gusta el deporte, propón salir a caminar o a correr juntos mientras escuchan música.", completado: false },
    ]
  },
  {
    id: 13,
    titulo: "Reto 13: Noche de Construcción con Bloques",
    desc: "Fomentar la creatividad y el trabajo en equipo.",
    color: "bg-fuchsia-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Saquen LEGOs, bloques de construcción o incluso cartón y cinta adhesiva.", completado: false },
      { id: 2, texto: "Propón un desafío: 'construyamos la casa más alta' o 'un castillo para sus muñecos'.", completado: false },
      { id: 3, texto: "Trabajen juntos en el proyecto, sin importar el resultado final.", completado: false },
    ]
  },
  {
    id: 14,
    titulo: "Reto 14: Leer un Capítulo Juntos",
    desc: "El poder de compartir una historia.",
    color: "bg-rose-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Dejen que él/ella elija un libro que le guste (incluso si es un cómic).", completado: false },
      { id: 2, texto: "Siéguense en un lugar cómodo y lee un capítulo en voz alta, turnándose las páginas.", completado: false },
      { id: 3, texto: "Al final, comenten qué les pareció la historia o qué creen que pasará después.", completado: false },
    ]
  },
  {
    id: 15,
    titulo: "Reto 15: Crear una Playlist Conjunta",
    desc: "La banda sonora de su relación.",
    color: "bg-violet-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Cada uno elija 3 canciones que le gusten o que le recuerden buenos momentos.", completado: false },
      { id: 2, texto: "Unan todas las canciones en una sola playlist en Spotify o YouTube.", completado: false },
      { id: 3, texto: "Pongan la playlist en el coche o en casa mientras hacen otra actividad.", completado: false },
    ]
  },
  {
    id: 16,
    titulo: "Reto 16: Hablar de Sentimientos (Versión Ligera)",
    desc: "Practicar la vulnerabilidad de forma segura.",
    color: "bg-sky-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Inicia una conversación con: 'A veces yo me siento un poco [triste/nervioso] cuando...', compartiendo algo tuyo.", completado: false },
      { id: 2, texto: "Pregúntale si a él/ella alguna vez se ha sentido así.", completado: false },
      { id: 3, texto: "Escucha su respuesta sin juzgar y solo valida su sentimiento: 'entiendo que te sientas así'.", completado: false },
    ]
  },
  {
    id: 17,
    titulo: "Reto 17: El Día 'Sí'",
    desc: "Un día para decir 'sí' a todo (dentro de lo razonable).",
    color: "bg-amber-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Anuncia que durante un día, intentarás decir 'sí' a sus propuestas (dentro de límites seguros y razonables).", completado: false },
      { id: 2, texto: "Cuando te pida algo (jugar un juego, comer un helado), di '¡sí!' con entusiasmo.", completado: false },
      { id: 3, texto: "Al final del día, comenten lo divertido que fue tener un día de 'sí'.", completado: false },
    ]
  },
  {
    id: 18,
    titulo: "Reto 18: Crear un Código Secreto",
    desc: "Fortalecer la complicidad con un lenguaje propio.",
    color: "bg-stone-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Inventa una palabra o señal secreta que solo ustedes dos conozcan (ej: 'pistacho' significa 'estoy aburrido').", completado: false },
      { id: 2, texto: "Usen el código secreto durante la semana en situaciones divertidas.", completado: false },
      { id: 3, texto: "Ríanse del hecho de tener un lenguaje que los demás no entienden.", completado: false },
    ]
  },
  {
    id: 19,
    titulo: "Reto 19: Visitar un Lugar de tu Infancia",
    desc: "Compartir una parte de tu historia.",
    color: "bg-neutral-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Llévale a un lugar que fuera importante para ti de niño (tu colegio, un parque donde jugabas).", completado: false },
      { id: 2, texto: "Cuéntale una anécdota personal de lo que hacías en ese lugar.", completado: false },
      { id: 3, texto: "Pregúntale si hay algún lugar que sea importante para él/ella y que te gustaría conocer.", completado: false },
    ]
  },
  {
    id: 20,
    titulo: "Reto 20: Escribir una Carta de Futuro",
    desc: "Soñar juntos y fortalecer el vínculo a largo plazo.",
    color: "bg-zinc-100",
    locked: true,
    pasos: [
      { id: 1, texto: "Siéntense juntos y escriban una carta a su 'yo' de dentro de un año.", completado: false },
      { id: 2, texto: "Cada uno debe escribir sobre lo que espera que haya pasado en ese año (un viaje, un logro, etc.).", completado: false },
      { id: 3, texto: "Guarden las cartas en un sobre y prométann abrirlas juntas en esa fecha del próximo año.", completado: false },
    ]
  },
];

export const initialLogEntries = [
  // Puedes empezar con una entrada de ejemplo o dejarlo vacío
  // {
  //   id: 1,
  //   date: new Date().toISOString(), // Guardamos la fecha en formato ISO
  //   image: null, // null significa que no hay imagen
  //   icon: '🏆', // Un icono por defecto si no hay imagen
  //   text: "Hoy por fin me contó un chiste y nos reímos juntos. Un pequeño gran paso."
  // }
];

// --- NUEVO FORMATO DE INFORMACIÓN ---
// En src/data/mockData.js

export const initialInfo = [
  { id: 1, pregunta: "¿Cuál es su comida favorita?", respuesta: "" },
  { id: 2, pregunta: "¿Qué tipo de música o artista le pone la cara de felicidad?", respuesta: "" },
  { id: 3, pregunta: "Nombra su hobby o pasatiempo principal.", respuesta: "" },
  { id: 4, pregunta: "¿Cuál es su asignatura favorita (o la que menos le cuesta) en el colegio?", respuesta: "" },
  { id: 5, pregunta: "¿Quién es su mejor amigo/a?", respuesta: "" },
  { id: 6, pregunta: "¿Qué le hace reír a carcajadas?", respuesta: "" },
  { id: 7, pregunta: "¿Qué tema le pone nervioso o incómodo?", respuesta: "" },
  { id: 8, pregunta: "¿Cuál es su mayor miedo o fobia?", respuesta: "" },
  { id: 9, pregunta: "¿Qué le gustaría ser de mayor?", respuesta: "" },
  { id: 10, pregunta: "¿Cuál fue el mejor regalo que le has hecho?", respuesta: "" },
  { id: 11, pregunta: "¿Qué actividad haces juntos que más disfruta?", respuesta: "" },
  { id: 12, pregunta: "¿Cómo reacciona normalmente cuando está enfadado o frustrado?", respuesta: "" },
  { id: 13, pregunta: "¿Cuál es su película o serie animada favorita?", respuesta: "" },
  { id: 14, pregunta: "¿Qué le pides que haga cuando necesitas ayuda en casa?", respuesta: "" },
  { id: 15, pregunta: "Describe su personalidad en 3 palabras.", respuesta: "" },
];
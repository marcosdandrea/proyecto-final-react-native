# **Fitapp: Aplicación de Seguimiento de Entrenamiento en Gimnasio**

## Descripción
Fitapp es una potente aplicación móvil desarrollada con React Native que se enfoca en hacer seguimiento de entrenamiento en el gimnasio. Está diseñada para usuarios que desean llevar un registro detallado de sus rutinas de ejercicio, ya sea con pesas libres o asistidas. Fitapp proporciona una solución completa para planificar, ejecutar y rastrear el progreso de sus entrenamientos.

## Funcionalidades Clave
La aplicación consta de cinco secciones principales:

1. **Dashboard**: Proporciona una lista detallada de los entrenamientos realizados por el usuario, lo que facilita la revisión de su historial de ejercicios y progreso.

2. **Rutinas**: Permite al usuario crear y modificar rutinas de entrenamiento de manera intuitiva. Puede agrupar ejercicios, establecer parámetros como peso, repeticiones, descanso y notas personalizadas. Desde esta sección, el usuario puede ejecutar la rutina en tiempo real.

3. **Ejercicios**: Ofrece una vista de exploración y creación de ejercicios, donde se pueden configurar varios parámetros, como nombre, categoría y descripción. Esto facilita la personalización de los ejercicios según las preferencias del usuario.

4. **Workout**: Se activa al ejecutar una rutina, permitiendo al usuario registrar su entrenamiento en tiempo real. Fitapp controla automáticamente los tiempos de descanso para cada ejercicio y set, brindando una experiencia de entrenamiento eficiente.

5. **Tu Perfil**: Permite al usuario ingresar datos personales, como peso y altura, y mantener un registro de su progreso físico a lo largo del tiempo. Además, el usuario puede agregar fotos de frente, perfil y posterior para un seguimiento visual de su transformación física.

## Tecnologías Utilizadas
Fitapp se ha desarrollado utilizando una variedad de tecnologías para brindar una experiencia de usuario óptima:

- **React Native**: La aplicación se construyó utilizando el framework de desarrollo de aplicaciones móviles React Native, lo que garantiza una experiencia fluida en ambas plataformas: iOS y Android.

- **Expo**: Se utilizó Expo, una plataforma de desarrollo de React Native, para facilitar la creación y el despliegue de la aplicación en múltiples dispositivos sin la necesidad de configuraciones complejas.

- **Firebase Auth y Realtime Database**: Para gestionar la autenticación de usuarios y el almacenamiento de datos en tiempo real, Fitapp integra Firebase Authentication y Realtime Database. Esto permite a los usuarios registrarse, iniciar sesión y sincronizar sus datos de entrenamiento de manera segura en la nube.

- **MySQL**: Además de Firebase, Fitapp utiliza una base de datos MySQL local para el almacenamiento persistente de datos, lo que garantiza la disponibilidad de información incluso sin conexión.

## Compatibilidad con Dispositivos
Fitapp es compatible tanto con dispositivos iPhone como Android, lo que permite a los usuarios de ambas plataformas aprovechar sus funcionalidades y llevar un control detallado de su entrenamiento sin importar el dispositivo que utilicen.

## Happy Path del Usuario
El siguiente es el flujo principal del usuario, conocido como el "Happy Path":

1. **Iniciar Sesión**: El usuario inicia la aplicación y se autentica utilizando su cuenta de Fitapp o se registra si es un nuevo usuario.

2. **Crear Rutina**: El usuario navega a la sección "Rutinas" y selecciona "Crear Nueva Rutina". Le asigna un nombre a la rutina y comienza a agregar ejercicios.

3. **Agregar Ejercicios**: Para cada ejercicio, el usuario busca y selecciona el ejercicio deseado, establece los parámetros como peso, repeticiones y descanso, y guarda la configuración.

4. **Iniciar Entrenamiento**: Una vez configurada la rutina, el usuario presiona el icono de "play" en la vista de la rutina para iniciar el entrenamiento.

5. **Registro de Entrenamiento**: En la vista "Workout", el usuario realiza los ejercicios siguiendo las indicaciones de peso y repeticiones. Puede ajustar los valores de peso y descanso según sea necesario.

6. **Finalizar Entrenamiento**: Al finalizar cada set, el sistema inicia un contador de tiempo de descanso. El usuario puede ajustar el tiempo de descanso o finalizarlo manualmente. El proceso se repite hasta que se complete la rutina.

7. **Registro de Progreso**: Después de completar el entrenamiento, Fitapp ofrece al usuario la opción de guardar el registro de entrenamiento, lo que permite un seguimiento detallado de su progreso físico a lo largo del tiempo.

## Notas Académicas
Es importante destacar algunas decisiones tomadas durante el desarrollo de Fitapp:

- **Persistencia de Datos**: Se optó por combinar Firebase y MySQL para una gestión eficiente de datos, permitiendo a los usuarios sincronizar sus registros de entrenamiento en la nube o utilizar la aplicación sin conexión.

- **Privacidad de Datos**: En futuras versiones, se considera implementar una capa de autenticación y privacidad para garantizar la seguridad de los datos de los usuarios, evitando el intercambio de rutinas y ejecuciones entre todos los usuarios.

Este enfoque se ha adoptado en función de los requisitos de la evaluación y puede no ser la implementación óptima para una aplicación de este tipo en una versión de producción. Fitapp se presenta como una herramienta versátil y potente para el seguimiento de entrenamientos en el gimnasio, ofreciendo comodidad y funcionalidad a los usuarios en sus dispositivos móviles.

# Prueba Frontend Angular - PhantomX

Aplicación web desarrollada con Angular 9 para la gestión de módulos médicos del sistema Veris. El proyecto implementa autenticación, navegación entre módulos y gestión completa de transacciones de facturación con operaciones CRUD.

---


## Requisitos del Sistema

### Antes de continuar con la configuracion del front, primero asegurese de descargar el back, el back utilizado es de la prueba anterior por lo que al clonarlo se descargara una carpeta front la cual puede eliminarla.

```bash
git clone https://github.com/LeonardoFate/prueba-historia-clinica.git
cd prueba-historia-clinica
```

### Requisitos Obligatorios

- **Node.js**: v14.15.0
- **Angular CLI**: 9.1.0
- **npm**: 6.14.8 o superior

### Verificar versiones instaladas
```bash
node --version    # Debe mostrar v14.15.0
npm --version     # Debe mostrar 6.14.8+
ng version        # Debe mostrar Angular CLI 9.1.0
```

---

## Instalación

### 1. Clonar el repositorio
```bash
git clone 
cd frontend-prueba
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Editar `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### 4. Ejecutar el proyecto
```bash
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

---

## Estructura del Proyecto
```
frontend-prueba/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/                      # Componente de autenticación
│   │   │   ├── module-selection/           # Selección de módulos
│   │   │   ├── module-placeholder/         # Placeholder para módulos
│   │   │   ├── facturacion/
│   │   │   │   ├── facturacion-layout/    # Layout principal facturación
│   │   │   │   ├── transacciones-epago/   # CRUD transacciones Epago
│   │   │   │   ├── transacciones-emitidas/ # Listado con paginación
│   │   │   │   ├── flujo-menu-lateral/    # Interfaz con menú lateral
│   │   │   │   └── epago-modal/           # Modal para CRUD
│   │   │   └── shared/
│   │   │       └── header/                # Header compartido
│   │   ├── services/
│   │   │   ├── auth.service.ts            # Servicio de autenticación
│   │   │   └── epago.service.ts           # Servicio transacciones Epago
│   │   ├── app-routing.module.ts          # Configuración de rutas
│   │   ├── app.component.ts               # Componente raíz
│   │   └── app.module.ts                  # Módulo principal
│   ├── styles/
│   │   ├── _variables.scss                # Variables globales
│   │   ├── _mixins.scss                   # Mixins reutilizables
│   │   └── _components.scss               # Componentes compartidos
│   ├── assets/                            # Recursos estáticos
│   ├── environments/                      # Configuración de entornos
│   └── styles.scss                        # Estilos globales
├── angular.json                           # Configuración Angular
├── package.json                           # Dependencias del proyecto
└── README.md                              # Este archivo
```

---

## Tecnologías Utilizadas

### Framework y Lenguajes

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 9.1.0 | Framework principal frontend |
| **TypeScript** | 3.8.3 | Lenguaje de programación |
| **HTML5** | - | Marcado semántico |

### Librerías Frontend

| Librería | Versión | Uso |
|----------|---------|-----|
| **Bootstrap** | 4.6.2 | Framework CSS para layout y componentes |
| **Flatpickr** | 4.6.13 | Selector de fechas (filtros de búsqueda) |
| **Select2** | 4.1.0-rc.0 | Selectores avanzados con búsqueda |
| **Lodash** | 4.17.21 | Utilidades JavaScript (manipulación datos) |
| **Moment.js** | 2.30.1 | Manejo y formato de fechas |
| **jQuery** | 3.7.1 | Requerido por Bootstrap y Select2 |
| **Font Awesome** | 5.15.4 | Librería de iconos |

### Dependencias de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| **Angular CLI** | Herramientas de línea de comandos |
| **Karma** | Test runner para pruebas unitarias |
| **Jasmine** | Framework de testing |
| **TSLint** | Linter para TypeScript |
| **Codelyzer** | Reglas de linting específicas de Angular |

---

## Componentes de la Aplicación

### 1. **LoginComponent** (`src/app/components/login/`)

**Propósito**: Autenticación de usuarios en el sistema.

**Funcionalidad**:
- Formulario de login con validación de campos obligatorios
- Integración con `AuthService` para validación de credenciales
- Manejo de estados de carga (loading spinner)
- Redirección automática al módulo de selección tras login exitoso
- Gestión de mensajes de error (credenciales incorrectas, problemas de conexión)
- Diseño responsive con imagen decorativa lateral

**Dependencias**:
- `AuthService`: Comunicación con API de autenticación
- `Router`: Navegación programática
- `FormsModule`: Binding bidireccional [(ngModel)]

### 2. **ModuleSelectionComponent** (`src/app/components/module-selection/`)

**Propósito**: Dashboard principal con selección de módulos del sistema.

**Funcionalidad**:
- Grid de 8 módulos con iconos SVG personalizados
- Verificación de autenticación (guard implícito)
- Header con logo PhantomX, versión, y selector de sucursal
- Dropdown de usuario con opción de "Cerrar Sesión"
- Modal de confirmación para logout con diseño custom
- Navegación a módulos mediante routing
- Diseño responsive adaptable a móviles

**Dependencias**:
- `AuthService`: Verificación de sesión y logout
- `Router`: Navegación entre módulos
- jQuery/Bootstrap: Manejo de modal de confirmación

### 3. **ModulePlaceholderComponent** (`src/app/components/module-placeholder/`)

**Propósito**: Vista genérica para módulos no implementados.

**Funcionalidad**:
- Barra verde superior con navegación (consistente con otros módulos)
- Muestra nombre del módulo dinámicamente según la ruta
- Icono circular animado según tipo de módulo
- Mensaje "Módulo en desarrollo"
- Botón de regreso a selección de módulos
- Adaptación responsive completa

### 4. **FacturacionLayoutComponent** (`src/app/components/facturacion/facturacion-layout/`)

**Propósito**: Layout wrapper para todas las secciones de facturación.

**Funcionalidad**:
- Barra verde superior con menú horizontal estático
- Botón de regreso a module-selection
- Dropdown "Facturación" con 3 opciones de navegación
- Indicador visual de ruta activa
- Outlet para renderizar subcomponentes
- Botón de ayuda (placeholder)


### 5. **TransaccionesEpagoComponent** (`src/app/components/facturacion/transacciones-epago/`)

**Propósito**: CRUD completo de transacciones Epago con filtros avanzados.

**Funcionalidad**:
- **Filtros de búsqueda**:
  - Código Epago (input text)
  - Fecha Desde (flatpickr datepicker)
  - Fecha Hasta (flatpickr datepicker)
  - Botón limpiar filtros
- **Tabla de datos**:
  - Listado de transacciones desde API
  - Iconos de acciones (editar/eliminar) por fila
  - Badges visuales para estados (pagado/facturado)
  - Formato monetario en columnas de valores
- **Modal CRUD**:
  - Crear nueva transacción (botón "Ingresar")
  - Editar transacción existente (icono lápiz)
  - Formulario con validaciones
  - Campos: Código Epago, Botón Pago, Usuario, Valor, Checkboxes
- **Eliminación**:
  - Confirmación con window.confirm()
  - Llamada DELETE a API
 

### 6. **TransaccionesEmitidasComponent** (`src/app/components/facturacion/transacciones-emitidas/`)

**Propósito**: Listado de transacciones emitidas con paginación completa.

**Funcionalidad**:
- **Filtros de búsqueda**:
  - Paciente (input con búsqueda)
  - Fecha Desde (flatpickr)
  - Fecha Hasta (flatpickr)
  - Sucursal (select2)
- **Tabla de transacciones**:
  - Columnas: Acciones, Reenviar Info, Tirilla, RIDE, XML, Orden Médica, Fechas, Números, Beneficiario
  - Botones de descarga por documento
  - Iconos de acciones (expandir fila)
- **Paginación**:
  - Navegación por páginas numeradas
  - Botones Primera/Anterior/Siguiente/Última
  - 5 registros por página (configurable)
  - Indicador visual de página activa
  - Cálculo automático de total de páginas
 
### 7. **FlujoMenuLateralComponent** (`src/app/components/facturacion/flujo-menu-lateral/`)

**Propósito**: Interfaz compleja con menú lateral y contenido dinámico.

**Funcionalidad**:
- **Sidebar izquierdo**:
  - Card de información del paciente (avatar, nombre, edad)
  - Botones de acción (Visión 360, Actualizar Datos)
  - Menú numerado con 6 opciones
  - Indicación visual de sección activa
  - Navegación por clicks
- **Contenido principal**:
  - Header con breadcrumb (Historia Clínica > Atención)
  - Tabs de acciones (Enviar Correo, Ver Historial, etc.)
  - Contenido dinámico según sección seleccionada
- **Secciones implementadas**:
  1. **Ordenes para factura manual**:
     - Formulario con múltiples campos
     - Búsqueda de orden/paciente
     - Selectores de tipo orden, atención preferencial
     - Radio buttons Médico Interno/Externo
     - 3 campos de diagnósticos con búsqueda
     - Botones Nueva Orden, Crear Orden, Anular Orden
  2. **Cierre de caja**:
     - Grid de entrada de billetes (7 denominaciones)
     - Grid de entrada de monedas (6 denominaciones)
     - Cálculo automático de totales
     - Total efectivo destacado
     - Botones Cerrar Caja e Imprimir
  3. **Registros Facturas**:
     - Formulario de papeleta de depósito
     - Selectores de banco y cuenta bancaria
     - Registro de facturas manuales (bloques)
     - Registro de notas de crédito
     - 
### 8. **EpagoModalComponent** (`src/app/components/facturacion/epago-modal/`)

**Propósito**: Modal reutilizable para operaciones CRUD de Epago.

**Funcionalidad**:
- Placeholder para modal (funcionalidad integrada en TransaccionesEpagoComponent)
- Arquitectura preparada para extracción futura de lógica

**Estado**: Componente generado pero no utilizado actualmente (lógica en componente padre)

---

### 9. **HeaderComponent** (`src/app/components/shared/header/`)

**Propósito**: Header compartido para futuras implementaciones.

**Funcionalidad**:
- Header genérico con logo PhantomX
- Información de usuario
- Botón de logout






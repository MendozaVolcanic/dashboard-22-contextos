# Traspaso — Dashboard 22 Contextos Geológicos

**De:** Nicolás Mendoza · **A:** Felipe Fuentes Carrasco · **Fecha:** 2026-08-24

Documento de entrega. Léelo antes de tocar nada: hay un problema de datos conocido
que condiciona todo lo que se puede hacer con este repo.

---

## 1. Qué es

Dashboard estático de gestión de los **22 Contextos Geológicos de Chile** de Mourgues,
Schilling & Castro (2012) en su versión operacional Mourgues et al. (2016). Cuatro
pestañas: Inventario (tabla), Cobertura (gráficos), Mapa (Leaflet) y Acerca.

🌐 https://mendozavolcanic.github.io/dashboard-22-contextos/

Es el módulo de **gestión** de la Suite Geopatrimonio. El visor cartográfico de verdad
—con los polígonos sobre el Mapa Geológico al Millón— vive en
[contextos-geologicos](https://github.com/MendozaVolcanic/contextos-geologicos),
que es el repo maestro.

## 2. ⚠️ Estado de los datos — LEER ANTES DE USAR

`data/contextos.json` tiene **dos clases de campos** y la diferencia importa:

| Campo | Estado | Fuente |
|---|---|---|
| `codigo`, `nombre`, `ejemplos`, `fuente` | ✅ **Verificado** | Mourgues 2012/2016, Anexo I de Gálvez 2024 |
| `region_estimada`, `geositios_estimados`, `estado_estimado`, `lat`, `lng` | ❌ **Sin fuente** | Estimaciones heredadas de la v1.0.0 |

**Historia:** hasta la v1.0.0 (2026-04-27 → 2026-08-24) los **22 nombres estaban
equivocados**. Eran expansiones adivinadas de las siglas, no los nombres reales. Ejemplos
de lo que decía: `MgPz` → *"Magallanes Paleozoico"* (real: **Magmatismo** Paleozoico),
`PGGl` → *"Plataforma Glaciada Groenlandesa"* (real: **Procesos, geoformas y depósitos
glaciales**), `DA` → *"Depósitos de Arco"* (real: **Desierto de Atacama**). Dos códigos
también estaban mal (`KsMC` → correcto `SMKs`; `As` → correcto `Lss`) y las entradas
#17 y #18 estaban intercambiadas.

Corregido en la v2.0.0 contra la lista verificada en el repo maestro:
`contextos-geologicos/docs/notas/contextos_chilenos_22_mourgues.md`.

**Lo que sigue sin resolverse:** los conteos de geositios, los estados de documentación,
las regiones y las coordenadas del mapa **nunca tuvieron fuente**. Los gráficos de la
pestaña Cobertura se calculan sobre esos números, así que **los gráficos no significan
nada todavía**. Hay un banner en la UI advirtiéndolo. No lo saques hasta que los datos
estén respaldados.

**Además:** la propia lista de 22 no está refrendada por la comunidad geológica nacional
—"questioned, since it has not been validated" (Benado et al. 2019, Tabla 1)—. Es la
lista en uso, no una norma oficial. Tú mismo se lo hiciste notar a Nicolás; quedó anotado
en la nota del repo maestro.

## 3. Cómo levantarlo

No hay build ni dependencias. HTML + CSS + JS vanilla, Leaflet y Chart.js por CDN.

```bash
python -m http.server 8080
```

Y abrir http://localhost:8080. Cada push a `main` redespliega solo vía
`.github/workflows/pages.yml`.

## 4. Estructura

```
dashboard-22-contextos/
├── index.html    # 4 pestañas + banner de aviso de datos
├── styles.css    # dark theme con variables CSS
├── app.js        # tabla + filtros + Chart.js + Leaflet
└── data/
    └── contextos.json   # {_meta, contextos[22]} — ver _meta.ADVERTENCIA
```

`app.js` normaliza los campos `*_estimado` a sus nombres antiguos al cargar, para que
tabla, gráficos y mapa sigan funcionando sin reescribirlos. Si cambias el esquema del
JSON, el punto único a tocar es `cargarDatos()`.

## 5. Próximos pasos sugeridos

1. **Dar fuente o eliminar los campos estimados.** Es lo que desbloquea todo lo demás.
   El inventario oficial de 49 geositios SERNAGEOMIN 2024 está en el repo hermano
   `apadrina-geositio-chile/data/geositios.json`: cruzarlo contra los 22 contextos daría
   `geositios` reales.
2. **Coordenadas reales.** Hoy son puntos inventados. Lo correcto no es un punto sino el
   polígono: el repo maestro ya tiene `app/data/chile_contextos.geojson` con los contextos
   asignados sobre el Mapa al Millón. Consumir eso.
3. **Conseguir Mourgues et al. 2012 original.** Sigue pendiente, bloqueado por el SSL
   caducado del catálogo SERNAGEOMIN. Ver `contextos-geologicos/docs/bibliografia/PENDIENTES_DESCARGA.md`.
4. **Unificar con el repo maestro.** Hoy los 22 contextos están definidos en dos lugares
   distintos. Debería haber una sola fuente de verdad.

## 6. Contacto

Dudas de contexto o de dónde salió cada decisión: revisar el historial de commits y las
notas en `contextos-geologicos/docs/notas/`. Es el repo donde está todo el razonamiento.

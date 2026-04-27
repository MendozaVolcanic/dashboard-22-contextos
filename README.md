# Dashboard — 22 Contextos Geológicos de Chile

Dashboard de gestión y visualización de los **22 Contextos Geológicos de Chile** definidos por Mourgues (2012, 2016) según el listado Gálvez (2024). Forma parte de la **Suite Geopatrimonio**.

## Módulos

| Tab | Descripción |
|-----|-------------|
| **Inventario** | Tabla filtrable/ordenable con los 22 contextos, estado de documentación y geositios vinculados |
| **Cobertura** | Gráfico de barras horizontal (geositios por contexto) + gráfico de dona (distribución de estados) + estadísticas globales |
| **Mapa** | Mapa Leaflet de Chile con marcadores coloreados por estado; popup con info completa al hacer clic |
| **Acerca** | Descripción del proyecto, referencias bibliográficas y enlaces a la Suite |

## Stack

- HTML5 + CSS3 vanilla (variables custom, dark theme)
- JavaScript ES2022 sin frameworks
- [Chart.js 4](https://www.chartjs.org/) — gráficos (CDN)
- [Leaflet 1.9](https://leafletjs.com/) — mapa (CDN)
- CartoDB Dark basemap
- GitHub Pages — despliegue estático

## Los 22 contextos

| # | Código | Nombre |
|---|--------|--------|
| 1 | MgPz | Magallanes Paleozoico |
| 2 | MgMz | Magallanes Mesozoico |
| 3 | MgVCz | Magallanes Vulcano-Cenozoico |
| 4 | AcMz | Aysén-Chiloé Mesozoico |
| 5 | VNgsQ | Volcanismo Neógeno y Sedimentos Cuaternarios |
| 6 | IO | Intrusivos Oligocenos |
| 7 | TCA | Terrenos de Corteza Antigua |
| 8 | SSPz | Sistema de Sedimentación Paleozoica |
| 9 | SCMz | Sedimentario Cretácico Mesozoico |
| 10 | SMTrJ | Sedimentario-Metamórfico Triásico-Jurásico |
| 11 | SMKi | Sedimentario-Metamórfico Kirugi |
| 12 | KsMC | Klippe Sedimentario Monte Castillo |
| 13 | SCCz | Sedimentario-Carbonático Cenozoico |
| 14 | SMCz | Sedimentario-Metamórfico Cenozoico |
| 15 | AFNgQ | Arc Front Neógeno-Cuaternario |
| 16 | BC | Batolito Costero |
| 17 | DA | Depósitos de Arco |
| 18 | PGGl | Plataforma Glaciada Groenlandesa (Antártica) |
| 19 | ACQ | Arco Cenozoico-Cuaternario |
| 20 | CHA | Cordillera Horizonte de Arco |
| 21 | TEC | Terrenos de Corteza Ecuatorial |
| 22 | As | Astenósfera aflorante |

## Fuentes

- Mourgues, F.A. (2012). *Marco de referencia para el Inventario Nacional del Patrimonio Geológico de Chile.* SERNAGEOMIN.
- Mourgues, F.A. (2016). *Actualización de contextos geológicos.* SERNAGEOMIN.
- Gálvez, N. (2024). *Lista revisada de contextos geológicos.* SERNAGEOMIN.

## Suite Geopatrimonio

- [contextos-geologicos](../contextos-geologicos/) — Explorador 3D/globo
- [georrutas-chile](../georrutas-chile/) — Rutas geoturísticas
- [apadrina-geositio-chile](../apadrina-geositio-chile/) — Adopción ciudadana

## Despliegue

El workflow `.github/workflows/pages.yml` despliega automáticamente en GitHub Pages al hacer push a `main`.

Para desarrollo local basta con un servidor estático:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

# Dashboard — 22 Contextos Geológicos de Chile

Dashboard de gestión y visualización de los **22 Contextos Geológicos de Chile** definidos por Mourgues (2012, 2016) según el listado Gálvez (2024). Forma parte de la **Suite Geopatrimonio**.

> ⚠️ **Estado de los datos.** Los **códigos y nombres** de los 22 contextos están
> verificados contra la fuente. Los campos `region_estimada`, `geositios_estimados`,
> `estado_estimado`, `lat` y `lng` **no tienen fuente documentada** — son estimaciones
> heredadas de la v1.0.0, no cifras oficiales SERNAGEOMIN, y los gráficos de la pestaña
> Cobertura se calculan sobre ellas. No citar. Ver [`TRASPASO.md`](TRASPASO.md).
>
> En la v1.0.0 los 22 nombres estaban equivocados (expansiones adivinadas de las siglas);
> corregidos en la v2.0.0 el 2026-08-24.

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

Nombres y códigos verificados contra Mourgues et al. (2012/2016), Anexo I de Gálvez (2024).

| # | Código | Nombre | Ejemplos |
|---|--------|--------|----------|
| 1 | `MgPz` | Magmatismo Paleozoico | Plutonismo paleozoico |
| 2 | `MgMz` | Magmatismo Mesozoico | Plutonismo mesozoico |
| 3 | `MgVCz` | Magmatismo y vulcanismo Cenozoico | Plutones y volcanismo cenozoico |
| 4 | `AcMz` | Arco volcánico del Mesozoico | Fm. La Negra, Punta del Cobre |
| 5 | `VNgsQ` | Volcanismo Neógeno superior – Cuaternario y campos geotermales | ZVN, ZVC, ZVS, ZVA y geotermia |
| 6 | `IO` | Islas y piso oceánicos | Juan Fernández, Pascua, Salas y Gómez, ofiolitas |
| 7 | `TCA` | Terrenos exóticos y complejos de acreción | Chonos, Madre de Dios, Cordillera Darwin |
| 8 | `SSPz` | Series sedimentarias del Paleozoico | Cuencas paleozoicas marinas y continentales |
| 9 | `SCMz` | Series continentales mesozoicas y sus fósiles | Triásico–Cretácico continental |
| 10 | `SMTrJ` | Cuencas marinas del Triásico, Jurásico y Cretácico basal | Cuencas Aconcagua, Mendoza, Aysén |
| 11 | `SMKi` | Cuencas marinas del Cretácico Inferior | Grupo Coyhaique (Aysén), Lo Valle |
| 12 | `SMKs` | El Cretácico Superior marino de Magallanes y Chile central | El Anexo de Gálvez 2024 repite SMKi por errata; el código correcto es SMKs |
| 13 | `SCCz` | Series continentales cenozoicas y sus fósiles | Fm. Río Frías, Santa Cruz |
| 14 | `SMCz` | Series marinas cenozoicas y sus fósiles | Fm. Bahía Inglesa, Navidad, Coquimbo |
| 15 | `AFNgQ` | Ambientes fluvioaluviales del Neógeno-Cuaternario | Depósitos del Valle Central, abanicos aluviales |
| 16 | `BC` | Borde costero | Plataformas marinas, terrazas, dunas |
| 17 | `PGGl` | Procesos, geoformas y depósitos glaciales del centro y sur | Drift Llanquihue, morrenas, ELA |
| 18 | `DA` | Desierto de Atacama | Salares, costras, ambiente hiperárido |
| 19 | `ACQ` | Ambientes continentales del Cuaternario, megafauna y primeros habitantes de América | Pleistoceno–Holoceno cultural |
| 20 | `CHA` | Campos de hielo e inlandsis antártico | Campo de Hielo Norte, Campo de Hielo Sur, hielo antártico |
| 21 | `TEC` | Mega estructuras, tectónica andina y neotectónica | Falla de Atacama, Liquiñe-Ofqui, fallas activas |
| 22 | `Lss` | Geoformas por impactos y materiales del sistema solar incorporados a la Tierra | Cráteres, meteoritos, tectitas |


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

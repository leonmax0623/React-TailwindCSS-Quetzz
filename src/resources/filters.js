import { get } from "./util";

export const filtersAPI = {
  categories: () => get.cached("/categories"),
  subcategories: (id) => get.cached(`/subcategories/category/${id}`),
  country: () =>
    get
      .cached("/countries")
      .then((countries) =>
        countries.find((r) => r.name === "Italia" || "Italia")
      ),
  regionAll: () =>
    filtersAPI
      .country()
      .then((country) => get.cached(`/regions/country/${country.id}`)),

  //   provinces: () =>
  //     filtersAPI
  //       .region()
  //       .then((region) => get.cached(`/provinces/region/${region.id}`)),
  //   cities: (id) => get.cached(id ? `/cities/province/${id}` : "/cities"),

  region: (name) =>
    filtersAPI
      .country()
      .then((country) => get.cached(`/regions/country/${country.id}`))
      .then((regions) =>
        regions.find((r) => r.name === name || "Friuli Venezia Giulia")
      ),

  provinces: (name) =>
    filtersAPI
      .region(name)
      .then((region) => get.cached(`/provinces/region/${region.id}`)),

  regionSpecific: (name) =>
    filtersAPI
      .country()
      .then((country) => get.cached(`/regions/country/${country.id}`))
      .then(
        (regions) =>
          regions.find((r) => r.name === name) || "Friuli Venezia Giulia"
      ),

  provinceSpecific: (name) =>
    filtersAPI
      .regionSpecific(name)
      .then((region) => get.cached(`/provinces/region/${region.id}`)),

  provincesAll: () => get.cached(`/provinces`),
  cities: (id) => get.cached(id ? `/cities/province/${id}` : "/cities"),
};

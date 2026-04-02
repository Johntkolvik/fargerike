import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Fargerike")
    .items([
      S.listItem()
        .title("Produkter")
        .child(
          S.list()
            .title("Produkter")
            .items([
              S.documentTypeListItem("product").title("Alle produkter"),
              S.documentTypeListItem("productFamily").title("Produktfamilier"),
              S.documentTypeListItem("productAttribute").title("Produktattributter"),
              S.documentTypeListItem("productCategory").title("Kategorier"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("color").title("Farger"),
      S.documentTypeListItem("colorCollection").title("Fargekart"),
      S.divider(),
      S.documentTypeListItem("service").title("Tjenester"),
      S.divider(),
      S.listItem()
        .title("Innhold")
        .child(
          S.list()
            .title("Innhold")
            .items([
              S.documentTypeListItem("article").title("Artikler"),
              S.documentTypeListItem("contentCluster").title("Innholdsklynger"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("store").title("Butikker"),
    ]);

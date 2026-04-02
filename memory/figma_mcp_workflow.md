---
name: Figma MCP workflow guide
description: Referanse for ideell Figma MCP-prosess — styrker og svakheter ved ulike retninger
type: reference
---

Ideell Figma MCP-prosess (anbefaling diskutert 2026-03-26):

**Retninger og styrker:**
- **Figma → Kode** er mest modent og pålitelig (`get_design_context`)
- **Kode → Figma** for sider/layouts er tregt og feilutsatt — hver node er et separat plugin API-kall
- **Variabler/tokens → Figma** fungerer OK (strukturert data)
- **Code Connect** gir verdi først når det finnes modne komponenter på begge sider

**Anbefalt rekkefølge (hvis man bygger uten designer):**
1. Kode først basert på specs
2. Design system tokens/variabler til Figma
3. Code Connect når komponenter er modne
4. Figma → Kode når designer leverer mockups

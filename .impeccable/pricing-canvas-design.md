# Standalone pricing canvas

Scope: `model/precios-canvas.html`, `.css`, and `.js` only; this record does not establish a global application design system.

The supplied Dify reference informs a calm teal surface, generous headline spacing, white plan cards, and a pale blue middle plan with a strong blue action.
Three equal desktop columns make plan comparison direct; compact service chips keep attention on prices and inclusions.

Typography: locally hosted Figtree, variable weights 300–900; body 15px/1.55, headline weight 650 with tight tracking.
Content width: 1248px maximum, with 48px desktop side padding.

Actual CSS tokens:
- `--bg: #eef4f2`
- `--ink: #172b35`
- `--muted: #4c606b`
- `--line: #cedbdf`
- `--accent: #1747e8`
- `--accent-hover: #1237b8`
- `--radius: 14px`

Surface gradient: `#cee2e0` → `#e1edeb` → `var(--bg)`; standard cards `#fff`; middle card `#e2e8ff`.
Breakpoints: 1050px tightens spacing; 760px stacks plans and the custom offer; 480px reduces gutters and preserves 44px billing controls.

Maintain JavaScript pricing data, CRC/USD selection and persistence, country detection, monthly/annual controls, annual billing math, and first-plan currency conversion states.
Keep semantic headings, visible keyboard focus, pressed control states, live announcements, and reduced-motion support.

Prices remain illustrative. Only the standalone canvas is updated; global application styling and product definitions are outside this refinement.

# Sell My House in France

An editorial-style property website concept for presenting distinctive homes in France. The first property site is built with Rails and uses YAML content files with shared page templates.

## Future idea: spreadsheet-to-property-site publishing

Reduce the time it takes to prepare listings by importing an estate agent's completed property spreadsheet and media folder into a ready-to-review website package.

### Possible workflow

1. Give the agent a standard spreadsheet and instructions for supplying photographs, video, and certificates.
2. Organize the spreadsheet around a property record and a separate media list. Each media entry should identify its property, category, filename, caption, and alt text.
3. Run a Ruby/Rails importer that validates required information, checks media references, and reports missing or invalid data.
4. Generate the site's YAML content files and copy media into the expected asset structure.
5. Build a separate output package for each property, using the existing shared Rails templates.
6. Review and preview each generated site, then manually publish it to its own subdomain on the VPS, potentially using Kamal.

### Design principles

- Keep property content separate from reusable page templates.
- Never overwrite the live site's content during an import; generate each listing into an isolated output directory or package.
- Keep publishing under the site operator's control, with validation and a human review before deployment.
- Start with spreadsheet/CSV intake and generated YAML. A private admin interface can be considered later if manual imports become a bottleneck.
- Preserve the single-operator workflow initially; agent accounts, multi-tenancy, and billing are not required for the first version.
- Plan for reliable backups of both listing data and uploaded media.

### Initial spreadsheet shape

- **Properties:** one row per property, with a unique slug and fields such as headline, price, location, description, specifications, contact details, and approximate map information.
- **Media:** one row per photo, video, or certificate, with the property slug, media type/category, filename, caption, alt text, and display order.

This is a direction to explore, not a commitment to a specific spreadsheet format or publishing implementation.

import { expect, test } from "bun:test";

// Test basic coordinate calculation
test("NAView layout produces coordinates", () => {
    const Layout = require("../src/layouts/layout");

    // Simple RNA structure: a hairpin loop
    const nodes = [
        { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 },
        { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }
    ];

    // Links representing structure: (((..)))
    const links = [
        { source: 0, target: 7, type: "basepair" },
        { source: 1, target: 6, type: "basepair" },
        { source: 2, target: 5, type: "basepair" }
    ];

    const layout = new Layout("naview", nodes, links);
    const coords = layout.getCoords();

    expect(coords).toBeDefined();
    expect(coords.length).toBe(8);
    expect(coords[0]).toHaveProperty("x");
    expect(coords[0]).toHaveProperty("y");

    // Check that y-coordinates are flipped (negative)
    const hasNegativeY = coords.some(coord => coord.y < 0);
    expect(hasNegativeY).toBe(true);
});

test("parsedbr utility works", () => {
    const parsedbr = require("../src/utils/parsedbr");

    const sequence = "GGGGAAACCCC";
    const dotbracket = "((((....))))";

    const result = parsedbr.parseDbr(sequence, dotbracket);

    expect(result.nodes).toBeDefined();
    expect(result.links).toBeDefined();
    expect(result.nodes.length).toBe(sequence.length);
});
describe("Map Size", function () {
    let map = new HexMap(null, 12, 15, 10);
    it("should have proper size", function () {
        expect(map.map.length).toBe(12);
        expect(map.map[0].length).toBe(15);
    });
});
//# sourceMappingURL=test.js.map
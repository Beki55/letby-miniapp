export const asRouteParam = (value) => {
    if (Array.isArray(value)) {
        return value[0] ?? "";
    }
    return value ?? "";
};
//# sourceMappingURL=params.js.map
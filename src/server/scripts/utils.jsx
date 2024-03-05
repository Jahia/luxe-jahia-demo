export const getAlignCSS = (align) => {
    switch (align) {
        case "left":
            return "align-items-start";
        case "center":
            return "align-items-center";
        case "right":
            return "align-items-end";
        default:
            return "";
    }
};

export const getGutterCSS = (gutter) => {
    switch (gutter) {
        case "none":
            return "g-0";
        case "nano":
            return "g-1";
        case "small":
            return "g-2";
        case "medium":
            return "g-3";
        case "large":
            return "g-4";
        case "huge":
            return "g-5";
        default:
            return "";
    }
};

export const getGridCSS = (grid) => {
    switch (grid) {
        case "1":
            return "row-cols-1";
        case "2":
            return "row-cols-2";
        case "3":
            return "row-cols-3";
        case "4":
            return "row-cols-4";
        default:
            return "row-cols-auto";
    }
};

export const sup = (value) => (
    <>
        {value}m<sup>2</sup>
    </>
);

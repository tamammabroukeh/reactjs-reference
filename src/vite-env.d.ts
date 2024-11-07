/// <reference types="vite/client" />
import { NavigateOptions, To } from "react-router-dom";

// export interface NavigateFunction {
//     (to: To, options?: NavigateOptions): void;
//     (delta: number): void;
// }
// declare function useNavigate(): NavigateFunction;
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
    (to: To | number, options?: NavigateOptions): void;
    (delta: number): void;
}
declare module "@mui/material/styles" {
    interface TypographyVariants {
        poster: React.CSSProperties;
    }
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        poster?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        poster: true;
        // h3: false;
    }
}

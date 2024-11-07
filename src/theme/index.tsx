import { createTheme, lighten } from "@mui/material";
import { forwardRef } from "react";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";

const LinkBehavior = forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
    const { href, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
});

// theme?.components?.MuiListItemButton?.styleOverrides?.root = {
//     "&.Mui-selected": {
//         backgroundColor: alpha(
//             theme.palette.secondary.main,
//             theme.palette.action.selectedOpacity
//         ),
//     },
// };
export const theme = createTheme({
    palette: {
        mode: "light",
        text: {
            // primary: "#707070",
            // secondary: "#707070",
            // disabled: "",
        },
        // black: "#707070",
        primary: {
            main: "#128093",
            contrastText: "#fff",
            100: lighten("#128093", 0.9), // 100: alpha("#128093", 0.1),
            200: lighten("#128093", 0.8),
        },
        secondary: {
            main: "#7B65D3",
            contrastText: "#fff",
        },
        error: {
            main: "#EF3A4B",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: [
            "Almarai",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        poster: {
            fontSize: "4rem",
            color: "red",
        },
        // Disable h3 variant
        h3: undefined,
    },
    components: {
        MuiPagination: {
            styleOverrides: {
                root: { display: "flex", justifyContent: "center" },
            },
            defaultProps: { variant: "outlined", color: "primary" },
        },
        MuiPaginationItem: {
            defaultProps: {
                slotProps: {
                    previous: {
                        style: { transform: "scaleX(-1)" },
                    },
                    next: {
                        style: { transform: "scaleX(-1)" },
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                fullWidth: true,
            },
        },
        MuiLink: {
            defaultProps: {
                underline: "none",
                color: "text.secondary",
                component: LinkBehavior,
            } as LinkProps,
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
        MuiListItemButton: {
            // styleOverrides: {
            //     root: {
            //         "&.Mui-selected": {
            //             backgroundColor: (theme) =>
            //                 alpha(
            //                     theme.palette.secondary.main,
            //                     theme.palette.action.selectedOpacity
            //                 ),
            //         },
            //     },
            // },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    start: 0,
                    left: "unset",
                    transform: "translate(0, 0px)",
                    marginBottom: 1,
                    // styles
                    "& +.MuiInputBase-root": {
                        marginTop: "2.1em",
                    },
                },
            },
            defaultProps: { shrink: true, variant: "standard" },
        },
        MuiTextField: {
            styleOverrides: { root: {} },
            defaultProps: { variant: "standard" },
        },
        MuiSelect: {
            styleOverrides: {
                root: {},
                select: {
                    paddingRight: 0,
                },
                nativeInput: {
                    paddingRight: 0,
                },
                icon: {
                    left: 0,
                    right: "unset",
                },
            },
            defaultProps: {
                variant: "standard",
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    textAlign: "start",
                },
            },
        },
        MuiDrawer: {
            defaultProps: {
                anchor: "right",
            },
        },
    },
    // components: {
    //     MuiCssBaseline: {
    //         styleOverrides: (themeParam) => `
    //             h1 {color: ${themeParam.palette.primary.main};}`,
    //     },
    // },
});

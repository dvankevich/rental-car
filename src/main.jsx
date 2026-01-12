// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import App from "./App";
import "./index.css";

const theme = createTheme({
    fontFamily: "var(--font-family)", // Manrope
    headings: { fontFamily: "var(--second-family)" }, // Inter
    colors: {
        main: [
            getComputedStyle(document.documentElement)
                .getPropertyValue("--main")
                .trim(),
        ], // #101828
        gray: [
            getComputedStyle(document.documentElement)
                .getPropertyValue("--gray")
                .trim(),
            getComputedStyle(document.documentElement)
                .getPropertyValue("--gray-light")
                .trim(),
            getComputedStyle(document.documentElement)
                .getPropertyValue("--badges")
                .trim(),
            getComputedStyle(document.documentElement)
                .getPropertyValue("--inputs")
                .trim(),
        ],
        button: [
            getComputedStyle(document.documentElement)
                .getPropertyValue("--button")
                .trim(), // #3470ff
            getComputedStyle(document.documentElement)
                .getPropertyValue("--button-hover")
                .trim(), // #0b44cd
        ],
        white: [
            getComputedStyle(document.documentElement)
                .getPropertyValue("--white")
                .trim(),
        ],
    },
    primaryColor: "button",
    primaryShade: 0, // #3470ff
    components: {
        Button: {
            styles: (theme) => ({
                root: {
                    borderRadius: "8px",
                    backgroundColor: theme.colors.button[0],
                    "&:hover": { backgroundColor: theme.colors.button[1] },
                },
            }),
        },
        Card: {
            styles: (theme) => ({
                root: {
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    backgroundColor: theme.colors.white[0],
                },
            }),
        },
        TextInput: {
            styles: (theme) => ({
                input: { backgroundColor: theme.colors.gray[3] }, // --inputs
            }),
        },
        // ... інші компоненти за потребою
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider theme={theme}>
                <App />
            </MantineProvider>
        </Provider>
    </React.StrictMode>
);

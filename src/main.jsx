// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { MantineProvider, createTheme } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import App from "./App";
import "./index.css";

// Обчислюємо значення змінних з :root
const rootStyle = getComputedStyle(document.documentElement);
const mainColor = rootStyle.getPropertyValue("--main").trim();
const grayColor = rootStyle.getPropertyValue("--gray").trim();
const grayLightColor = rootStyle.getPropertyValue("--gray-light").trim();
const badgesColor = rootStyle.getPropertyValue("--badges").trim();
const inputsColor = rootStyle.getPropertyValue("--inputs").trim();
const whiteColor = rootStyle.getPropertyValue("--white").trim();
const buttonColor = rootStyle.getPropertyValue("--button").trim();
const buttonHoverColor = rootStyle.getPropertyValue("--button-hover").trim();

const theme = createTheme({
  fontFamily: "var(--font-family)", // Manrope
  headings: { fontFamily: "var(--second-family)" }, // Inter
  colors: {
    main: generateColors(mainColor), // Генеруємо 10 shades на базі #101828
    gray: generateColors(grayColor), // На базі #8d929a
    button: generateColors(buttonColor), // На базі #3470ff
    // Якщо потрібно, додати інші
  },
  primaryColor: "button",
  primaryShade: 0, // Основний колір #3470ff
  components: {
    Button: {
      styles: (theme) => ({
        root: {
          borderRadius: "8px",
          backgroundColor: theme.colors.button[5], // Середній shade для кнопки
          "&:hover": { backgroundColor: theme.colors.button[7] }, // Темніший для hover
        },
      }),
    },
    Card: {
      styles: (theme) => ({
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: whiteColor, // #fff
        },
      }),
    },
    TextInput: {
      styles: (theme) => ({
        input: { backgroundColor: inputsColor }, // #f7f7f7
      }),
    },
    // ... інші компоненти за потребою
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

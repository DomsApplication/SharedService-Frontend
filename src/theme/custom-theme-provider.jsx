import PropTypes from "prop-types";
import { useMemo } from "react";

// material-ui
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// project import
import Palette from "./theme-components/palettes";
import Typography from "./theme-components/typography";
import CustomShadows from "./theme-components/shadows";
import componentsOverride from "./overrides/componentsOverride";

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function CustomThemeProvider({ children }) {
  const theme = Palette("light", "default");

   
  const themeTypography = Typography(`'Public Sans', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
    breakpoints: {
    values: {
      xs: 0,    // Default, you often don't need to specify this one, same as Tailwind's 'xs'
      sm: 640,  // Same as default TailwindCSS 'sm' breakpoint
      md: 768,  // Overriden to match your specified 'sm' breakpoint
      lg: 1024, // Same as default TailwindCSS 'lg' breakpoint
      xl: 1280, // Default, you can adjust if you want it to match your 'lg' or other
    }
  },
      direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

CustomThemeProvider.propTypes = {
  children: PropTypes.node,
};

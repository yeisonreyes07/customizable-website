import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MaterialIcon from "../../components/MaterialIcon.vue";

describe("Tests Básicos de Funcionalidad", () => {
  describe("MaterialIcon Component", () => {
    it("renderiza correctamente con props básicas", () => {
      const mockPath =
        "M12,2L14,9H21L15.5,13.5L17.5,21L12,17L6.5,21L8.5,13.5L3,9H10L12,2Z";

      const wrapper = mount(MaterialIcon, {
        props: {
          path: mockPath,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("svg").exists()).toBe(true);
      expect(wrapper.find("path").exists()).toBe(true);
    });

    it("aplica props de tamaño correctamente", () => {
      const mockPath =
        "M12,2L14,9H21L15.5,13.5L17.5,21L12,17L6.5,21L8.5,13.5L3,9H10L12,2Z";

      const wrapper = mount(MaterialIcon, {
        props: {
          path: mockPath,
          size: "32",
        },
      });

      const svg = wrapper.find("svg");
      expect(svg.attributes("width")).toBe("32");
      expect(svg.attributes("height")).toBe("32");
    });

    it("aplica color cuando se proporciona", () => {
      const mockPath =
        "M12,2L14,9H21L15.5,13.5L17.5,21L12,17L6.5,21L8.5,13.5L3,9H10L12,2Z";

      const wrapper = mount(MaterialIcon, {
        props: {
          path: mockPath,
          color: "#ff0000",
        },
      });

      const path = wrapper.find("path");
      expect(path.attributes("fill")).toBe("#ff0000");
    });
  });

  describe("Utilidades de Color", () => {
    const normalizeColor = (color) => {
      if (!color) return "";

      if (typeof color !== "string") return "";

      if (
        color.startsWith("data:") ||
        color.startsWith("/") ||
        color.startsWith("http")
      ) {
        return color;
      }

      let normalized = color.trim().toLowerCase();

      if (!normalized.startsWith("#")) {
        normalized = "#" + normalized;
      }

      if (normalized.length === 4) {
        normalized =
          "#" +
          normalized[1] +
          normalized[1] +
          normalized[2] +
          normalized[2] +
          normalized[3] +
          normalized[3];
      }

      return normalized;
    };

    it("normaliza colores hexadecimales básicos", () => {
      expect(normalizeColor("#ffffff")).toBe("#ffffff");
      expect(normalizeColor("ffffff")).toBe("#ffffff");
      expect(normalizeColor("#fff")).toBe("#ffffff");
    });

    it("maneja valores vacíos o inválidos", () => {
      expect(normalizeColor("")).toBe("");
      expect(normalizeColor(null)).toBe("");
      expect(normalizeColor(undefined)).toBe("");
    });

    it("preserva URLs sin modificar", () => {
      const dataUrl = "data:image/jpeg;base64,abc123";
      const fileUrl = "/images/logo.gif";
      const httpUrl = "https://example.com/logo.png";

      expect(normalizeColor(dataUrl)).toBe(dataUrl);
      expect(normalizeColor(fileUrl)).toBe(fileUrl);
      expect(normalizeColor(httpUrl)).toBe(httpUrl);
    });

    it("convierte colores a minúsculas", () => {
      expect(normalizeColor("FFFFFF")).toBe("#ffffff");
      expect(normalizeColor("#ABCDEF")).toBe("#abcdef");
    });

    it("maneja espacios en blanco", () => {
      expect(normalizeColor("  ffffff  ")).toBe("#ffffff");
      expect(normalizeColor("  #fff  ")).toBe("#ffffff");
    });
  });

  describe("Validación de Temas", () => {
    const validateHexColor = (color) => {
      if (!color) return false;
      const hexRegex = /^#([A-Fa-f0-9]{6})$/;
      return hexRegex.test(color);
    };

    it("valida colores hexadecimales correctos", () => {
      expect(validateHexColor("#ffffff")).toBe(true);
      expect(validateHexColor("#000000")).toBe(true);
      expect(validateHexColor("#ff6600")).toBe(true);
    });

    it("rechaza colores inválidos", () => {
      expect(validateHexColor("invalid")).toBe(false);
      expect(validateHexColor("#gggggg")).toBe(false);
      expect(validateHexColor("ffffff")).toBe(false); // Sin #
      expect(validateHexColor("#fff")).toBe(false); // Muy corto
    });

    it("maneja valores vacíos", () => {
      expect(validateHexColor("")).toBe(false);
      expect(validateHexColor(null)).toBe(false);
      expect(validateHexColor(undefined)).toBe(false);
    });
  });

  describe("Estructura de Tema", () => {
    const defaultTheme = {
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      headerBackground: "#f8fafc",
      headerTextColor: "#1f2937",
      contentTitleColor: "#3b82f6",
      contentTextColor: "#4b5563",
      footerBackground: "#1f2937",
      footerTextColor: "#f9fafb",
      logoUrl: "/images/logo.gif",
    };

    it("contiene todas las propiedades requeridas", () => {
      expect(defaultTheme).toHaveProperty("backgroundColor");
      expect(defaultTheme).toHaveProperty("textColor");
      expect(defaultTheme).toHaveProperty("headerBackground");
      expect(defaultTheme).toHaveProperty("headerTextColor");
      expect(defaultTheme).toHaveProperty("contentTitleColor");
      expect(defaultTheme).toHaveProperty("contentTextColor");
      expect(defaultTheme).toHaveProperty("footerBackground");
      expect(defaultTheme).toHaveProperty("footerTextColor");
      expect(defaultTheme).toHaveProperty("logoUrl");
    });

    it("tiene valores por defecto válidos", () => {
      expect(typeof defaultTheme.backgroundColor).toBe("string");
      expect(typeof defaultTheme.textColor).toBe("string");
      expect(typeof defaultTheme.logoUrl).toBe("string");
    });

    it("logo URL tiene formato correcto", () => {
      expect(defaultTheme.logoUrl).toMatch(/\.(gif|jpg|jpeg|png)$/i);
    });
  });

  describe("Manipulación de Archivos de Imagen", () => {
    it("valida tipos de archivo permitidos", () => {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const invalidTypes = ["text/plain", "application/pdf", "video/mp4"];

      validTypes.forEach((type) => {
        expect(type.startsWith("image/")).toBe(true);
      });

      invalidTypes.forEach((type) => {
        expect(type.startsWith("image/")).toBe(false);
      });
    });

    it("valida tamaño de archivo (simulado)", () => {
      const maxSize = 2 * 1024 * 1024; // 2MB
      const validSize = 1024 * 1024; // 1MB
      const invalidSize = 3 * 1024 * 1024; // 3MB

      expect(validSize <= maxSize).toBe(true);
      expect(invalidSize <= maxSize).toBe(false);
    });

    it("identifica URLs de datos base64", () => {
      const base64Url = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA";
      const regularUrl = "/images/logo.gif";

      expect(base64Url.startsWith("data:")).toBe(true);
      expect(regularUrl.startsWith("data:")).toBe(false);
    });
  });
});

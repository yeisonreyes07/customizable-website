import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../../App.vue";
import ThemePanel from "../../components/ThemePanel.vue";

describe("Utilidades de Color", () => {
  describe("normalizeColor", () => {
    let normalizeColor;

    beforeEach(() => {
      const wrapper = mount(App, {
        global: {
          stubs: {
            ThemePanel: true,
            MainLayout: true,
            MaterialIcon: true,
          },
        },
      });
      normalizeColor = wrapper.vm.normalizeColor;
    });

    it("mantiene colores hexadecimales válidos", () => {
      expect(normalizeColor("#ffffff")).toBe("#ffffff");
      expect(normalizeColor("#000000")).toBe("#000000");
      expect(normalizeColor("#ff6600")).toBe("#ff6600");
    });

    it("agrega # a colores sin prefijo", () => {
      expect(normalizeColor("ffffff")).toBe("#ffffff");
      expect(normalizeColor("000000")).toBe("#000000");
      expect(normalizeColor("ff6600")).toBe("#ff6600");
    });

    it("expande colores de 3 dígitos a 6 dígitos", () => {
      expect(normalizeColor("#fff")).toBe("#ffffff");
      expect(normalizeColor("#000")).toBe("#000000");
      expect(normalizeColor("#f60")).toBe("#ff6600");
    });

    it("maneja strings vacíos", () => {
      expect(normalizeColor("")).toBe("");
      expect(normalizeColor(null)).toBe("");
      expect(normalizeColor(undefined)).toBe("");
    });

    it("preserva URLs de datos sin modificar", () => {
      const dataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA";
      expect(normalizeColor(dataUrl)).toBe(dataUrl);
    });

    it("preserva URLs de archivos sin modificar", () => {
      const fileUrl = "/images/logo.gif";
      expect(normalizeColor(fileUrl)).toBe(fileUrl);

      const httpUrl = "https://example.com/logo.png";
      expect(normalizeColor(httpUrl)).toBe(httpUrl);
    });

    it("maneja colores en mayúsculas", () => {
      expect(normalizeColor("FFFFFF")).toBe("#ffffff");
      expect(normalizeColor("#ABCDEF")).toBe("#abcdef");
    });

    it("maneja espacios en blanco", () => {
      expect(normalizeColor("  ffffff  ")).toBe("#ffffff");
      expect(normalizeColor("  #fff  ")).toBe("#ffffff");
    });
  });

  describe("validateColor", () => {
    let validateColor;

    beforeEach(() => {
      const wrapper = mount(ThemePanel, {
        props: {
          theme: {
            backgroundColor: "#ffffff",
            textColor: "#000000",
            logoUrl: "/images/logo.gif",
          },
        },
        global: {
          stubs: {
            MaterialIcon: true,
          },
        },
      });
      validateColor = wrapper.vm.validateColor;
    });

    it("valida colores hexadecimales correctos", () => {
      wrapper.vm.localTheme.backgroundColor = "#ffffff";
      expect(validateColor("backgroundColor")).toBe(true);

      wrapper.vm.localTheme.backgroundColor = "#000000";
      expect(validateColor("backgroundColor")).toBe(true);
    });

    it("rechaza colores inválidos", () => {
      wrapper.vm.localTheme.backgroundColor = "invalid-color";
      expect(validateColor("backgroundColor")).toBe(false);

      wrapper.vm.localTheme.backgroundColor = "#gggggg";
      expect(validateColor("backgroundColor")).toBe(false);
    });

    it("siempre valida logoUrl", () => {
      expect(validateColor("logoUrl")).toBe(true);
    });

    it("valida colores normalizados automáticamente", () => {
      wrapper.vm.localTheme.backgroundColor = "ffffff";
      expect(validateColor("backgroundColor")).toBe(true);

      wrapper.vm.localTheme.backgroundColor = "fff";
      expect(validateColor("backgroundColor")).toBe(true);
    });
  });
});

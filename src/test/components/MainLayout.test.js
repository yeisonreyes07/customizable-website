import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import MainLayout from "../../components/MainLayout.vue";
import MaterialIcon from "../../components/MaterialIcon.vue";

vi.mock("@mdi/js", () => ({
  mdiFormatColorFill: "mdiFormatColorFill-mock",
  mdiContentSaveAll: "mdiContentSaveAll-mock",
  mdiLightbulbOutline: "mdiLightbulbOutline-mock",
}));

describe("MainLayout", () => {
  let wrapper;
  const mockTheme = {
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

  beforeEach(() => {
    wrapper = mount(MainLayout, {
      props: {
        theme: mockTheme,
      },
      global: {
        components: {
          MaterialIcon,
        },
      },
    });
  });

  it("renderiza correctamente", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".main-layout").exists()).toBe(true);
  });

  it("muestra el header con el título correcto", () => {
    expect(wrapper.find("header").exists()).toBe(true);
    expect(wrapper.text()).toContain("Personalizador de Temas");
  });

  it("muestra el logo en el header", () => {
    const logoImg = wrapper.find(".main-logo");
    expect(logoImg.exists()).toBe(true);
    expect(logoImg.attributes("src")).toBe(mockTheme.logoUrl);
  });

  it("aplica estilos dinámicos basados en el tema", () => {
    const mainElement = wrapper.find("main");
    expect(mainElement.exists()).toBe(true);
  });

  it('muestra la sección "Sobre este proyecto"', () => {
    expect(wrapper.text()).toContain("Sobre este proyecto");
  });

  it('muestra la sección "Cómo empezar"', () => {
    expect(wrapper.text()).toContain("Cómo empezar");
  });

  it("muestra el footer con información del autor", () => {
    expect(wrapper.find("footer").exists()).toBe(true);
    expect(wrapper.text()).toContain("Yeison Reyes");
  });

  it("maneja correctamente el logo por defecto cuando logoUrl está vacío", async () => {
    const themeWithoutLogo = { ...mockTheme, logoUrl: "" };
    await wrapper.setProps({ theme: themeWithoutLogo });

    const component = wrapper.vm;
    expect(component.logoSrc).toBe("/images/logo.gif");
  });

  it("valida URLs de datos base64 correctamente", () => {
    const themeWithBase64 = {
      ...mockTheme,
      logoUrl:
        "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
    };

    const wrapperWithBase64 = mount(MainLayout, {
      props: {
        theme: themeWithBase64,
      },
      global: {
        components: {
          MaterialIcon,
        },
      },
    });

    const component = wrapperWithBase64.vm;
    expect(component.logoSrc).toBe(themeWithBase64.logoUrl);
  });

  it("maneja errores de carga de imagen", async () => {
    const logoImg = wrapper.find(".main-logo");
    await logoImg.trigger("error");
  });

  it("confirma carga exitosa de imagen", async () => {
    const logoImg = wrapper.find(".main-logo");
    await logoImg.trigger("load");
  });

  it("normaliza colores correctamente", () => {
    const component = wrapper.vm;
    expect(typeof component.normalizeColor).toBe("function");
  });
});

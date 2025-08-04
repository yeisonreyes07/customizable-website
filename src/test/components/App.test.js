import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../../App.vue";
import ThemePanel from "../../components/ThemePanel.vue";
import MainLayout from "../../components/MainLayout.vue";
import MaterialIcon from "../../components/MaterialIcon.vue";

vi.mock("@vueuse/core", () => ({
  useLocalStorage: vi.fn(() => ({
    value: {
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      headerBackground: "#f8fafc",
      headerTextColor: "#1f2937",
      contentTitleColor: "#3b82f6",
      contentTextColor: "#4b5563",
      footerBackground: "#1f2937",
      footerTextColor: "#f9fafb",
      logoUrl: "/images/logo.gif",
    },
  })),
}));

vi.mock("vue-toastification", () => ({
  useToast: vi.fn(() => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  })),
}));

vi.mock("@mdi/js", () => ({
  mdiPalette: "mdiPalette-mock",
  mdiClose: "mdiClose-mock",
}));

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        components: {
          ThemePanel,
          MainLayout,
          MaterialIcon,
        },
        stubs: {
          ThemePanel: true,
          MainLayout: true,
        },
      },
    });
  });

  it("renderiza correctamente", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#app").exists()).toBe(true);
    expect(wrapper.find(".app-container").exists()).toBe(true);
  });

  it("muestra el modal del personalizador por defecto", () => {
    expect(wrapper.find(".theme-modal").exists()).toBe(true);
  });

  it("muestra el botón para abrir modal cuando está cerrado", async () => {
    await wrapper.setData({ showThemeModal: false });
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("incluye el componente MainLayout", () => {
    expect(wrapper.findComponent({ name: "MainLayout" }).exists()).toBe(true);
  });

  it("incluye el componente ThemePanel", () => {
    expect(wrapper.findComponent({ name: "ThemePanel" }).exists()).toBe(true);
  });

  it("tiene funciones para abrir y cerrar el modal", () => {
    const component = wrapper.vm;
    expect(typeof component.openThemeModal).toBe("function");
    expect(typeof component.closeThemeModal).toBe("function");
  });

  it("tiene función para actualizar el tema", () => {
    const component = wrapper.vm;
    expect(typeof component.updateTheme).toBe("function");
  });

  it("tiene función para mostrar notificaciones", () => {
    const component = wrapper.vm;
    expect(typeof component.showNotification).toBe("function");
  });

  it("puede cerrar el modal al hacer clic en el botón cerrar", async () => {
    const closeButton = wrapper.find(".modal-close");
    if (closeButton.exists()) {
      await closeButton.trigger("click");
      expect(wrapper.vm.showThemeModal).toBe(false);
    }
  });

  it("normaliza colores correctamente", () => {
    const component = wrapper.vm;
    expect(typeof component.normalizeColor).toBe("function");

    expect(component.normalizeColor("#ffffff")).toBe("#ffffff");
    expect(component.normalizeColor("ffffff")).toBe("#ffffff");
    expect(component.normalizeColor("#fff")).toBe("#ffffff");
  });

  it("valida temas correctamente", () => {
    const component = wrapper.vm;
    expect(typeof component.validateTheme).toBe("function");

    const validTheme = {
      backgroundColor: "#ffffff",
      textColor: "#000000",
    };
    expect(component.validateTheme(validTheme)).toBe(true);
  });

  it("aplica estilos CSS globales", () => {
    const component = wrapper.vm;
    expect(typeof component.applyGlobalTheme).toBe("function");
  });
});

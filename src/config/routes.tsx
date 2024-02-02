import { useRoutes } from "react-router-dom"
import { Content, NotFound } from "../pages"

export const useNav = () => {
  const menu = [
    {
      path: "/content-route",
      element: <Content />,
      name: "Content Page",
      isExternal: false,
    },
    {
      path: `https://terra.money`,
      name: "Terra",
      isExternal: true,
    },
  ]

  const routes = [
    ...menu,
    {
      path: "/",
      element: <Content />,
      name: "Gallery",
      isExternal: false,
      isDynamic: false,
    },
    { path: "*", element: <NotFound /> },
  ]

  return { menu, element: useRoutes(routes) }
}
